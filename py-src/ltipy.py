import re
import os
import sys
import subprocess
import signal
import threading
import time
import ltmain
import pickle
import json

def noop():
  pass

ipy = None
respond = None
requests = {}
connected = noop
disconnected = noop

def km_from_string(s=''):
    """create kernel manager from IPKernelApp string
    such as '--shell=47378 --iopub=39859 --stdin=36778 --hb=52668' for IPython 0.11
    or just 'kernel-12345.json' for IPython 0.12
    """
    global km, kc, send

    from os.path import join as pjoin
    from IPython.config.loader import KeyValueConfigLoader

    try:
        from IPython.kernel import (
            KernelManager,
            find_connection_file,
        )
    except ImportError:
        from IPython.zmq.blockingkernelmanager import BlockingKernelManager as KernelManager
        from IPython.zmq.kernelapp import kernel_aliases
        from IPython.lib.kernel import find_connection_file

        s = s.replace('--existing', '')

        if '--profile' in s:
            k,p = s.split('--profile')
            k = k.lstrip().rstrip() # kernel part of the string
            p = p.lstrip().rstrip() # profile part of the string
            fullpath = find_connection_file(k,p)
        else:
            fullpath = find_connection_file(s.lstrip().rstrip())

        km = KernelManager(connection_file = fullpath)
        km.load_connection_file()
        km.start_channels()
        send = km.shell_channel.execute

        respond(None, "python.client.error.ipython-version", None)
        return


    s = s.replace('--existing', '')

    if '--profile' in s:
        k,p = s.split('--profile')
        k = k.lstrip().rstrip() # kernel part of the string
        p = p.lstrip().rstrip() # profile part of the string
        fullpath = find_connection_file(k,p)
    else:
        fullpath = find_connection_file(s.lstrip().rstrip())

    km = KernelManager(connection_file = fullpath)
    km.load_connection_file()
    kc = km.client()
    kc.start_channels()
    send = kc.shell_channel.execute
    return km

def _extract_traceback(traceback):
  # strip ANSI color controls
  strip = re.compile('\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]')
  return [strip.sub('',t) for t in traceback]

def msgId(m):
  if 'parent_header' in m and 'msg_id' in m['parent_header']:
    return m['parent_header']['msg_id']

def normalize(m):
  mid = msgId(m)
  content = m['content']

  data = {}
  if 'data' in content:
    data = m['content']['data']

  if 'image/png' in data:
    return {'mid': mid, 'type': 'image', 'data': data['image/png']}
  if 'text/plain' in data:
    return {'mid': mid, 'type': 'return', 'data': data['text/plain']}
  if 'traceback' in content:
    return {'mid': mid, 'type': 'ex', 'data': "\n".join(_extract_traceback(content['traceback']))}
  if 'name' in content and content['name'] == 'stdout':
    return {'mid': mid, 'type': 'out', 'data': data}
  if 'name' in content and content['name'] == 'stderr':
    return {'mid': mid, 'type': 'err', 'data': data}
  if 'execution_state' in content and content['execution_state'] == 'idle':
    return {'mid': mid, 'type':'done'}

  content['type'] = "unknown"
  content['mid'] = mid
  return content

def msgs():
  global kc
  msgs = kc.iopub_channel.get_msgs()
  return [normalize(i) for i in msgs]

def handleMsg(m):
  if not m['mid']:
    return

  try:
    orig = requests[m['mid']]
  except:
    return

  command = None
  ret = {'meta': orig['meta']}

  if m['type'] == 'return':
    orig['return'] = True
    command = 'editor.eval.python.result'
    ret['result'] = m['data']
  elif m['type'] == 'ex':
    orig['return'] = True
    command = 'editor.eval.python.exception'
    ret['ex'] = m['data']
  elif m['type'] == 'image':
    command = 'editor.eval.python.image'
    ret['image'] = m['data']
  elif m['type'] == 'out':
    if m['data'][0:7] == "__WATCH":
      command = None
      try:
        res = pickle.loads(m['data'][8:])
      except:
        pass
      respond(None, "clients.raise-on-object", [res["meta"]["obj"], "editor.eval.python.watch", res])
    else:
      command = 'editor.eval.python.print'
      ret['file'] = orig['path']
      ret['msg'] = m['data']
  elif m['type'] == 'done' and orig['evaltype'] == 'statement' and 'return' not in orig:
    orig['return'] = True
    command = 'editor.eval.python.success'
  elif m['type'] == 'done' and orig['evaltype'] == 'expression' and 'return' not in orig:
    orig['return'] = True
    command = 'editor.eval.python.result'
    ret['result'] = 'None'

  if command:
    respond(orig["client"], command, ret)

def msgloop():
  global ipy
  while not ipy.returncode and not ltmain.stopped():
    for m in msgs():
      handleMsg(m)
    time.sleep(0.01)

def initIPy(s):
  try:
    cur = km_from_string(s)

    if not cur:
      killIPy()
      disconnected()

    loc = os.path.dirname(__file__)
    send("import sys\nsys.path.append('" + loc.replace('\\','\\\\') + "')\nimport lttools")
    connected()
    msgloop()
    disconnected()
  except:
    disconnected()

def setNs(path):
  send("import lttools\nlttools.switch_ns('" + path.replace('\\', '\\\\') + "')")

def IPyOutput(l):
  m = re.search('--existing (.*\.json)', l)
  if m:
    initIPy(m.group(1))
  if re.search('ImportError: IPython.zmq', l):
    respond(None, "python.client.error.pyzmq", None)

def listenIPy():
  global ipy
  while True:
    #next_line = proc.communicate()[0]
    next_line = ipy.stdout.readline().decode('utf-8')
    if next_line == '' and ipy.poll() != None:
        disconnected()
        break
    IPyOutput(next_line)

def startIPy(opts):
  global ipy
  global respond
  global disconnected
  global connected
  global km
  respond = opts["respond"]
  connected = opts["connected"]
  disconnected = opts["disconnected"]

  try:
    if os.environ.get('LT_IPYTHON_PATH'):
      cmd = os.environ.get('LT_IPYTHON_PATH')
    elif os.path.isfile('bin/ipython'):
      cmd = 'bin/ipython'
    else:
      cmd = 'ipython'
    ipy = subprocess.Popen([cmd, 'kernel', '--pylab=inline'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, env=os.environ)
    #Start a thread listening to stdout
    t = threading.Thread(target=listenIPy)
    t.start()
    return True
  except:
    disconnected()
    return None

def killIPy():
  global ipy
  try:
    send('exit')
    os.kill(ipy.pid, signal.SIGTERM)
    ipy.terminate()
    ipy.returncode = True
  except:
    pass

def request(cur):
  id = send(cur["code"])
  requests[id] = cur
