import sys
import threading
import os
import ast
import imp
import inspect
import ctypes
import socket
import json
import re
import traceback
import ltipy
import time
import asyncore
import signal
import lttools

oldout = sys.stdout
olderr = sys.stderr
stop = False
local = True
threads = []
currentClient = 0

class Printer():
  cur = ""

  def write(self, text):
    self.cur += text
    if text == "\n":
      self.flush()

  def flush(self):
    send(currentClient, "editor.eval.python.print", {"msg": self.cur, "file": name})
    self.cur = ""

  def readlines(self):
    return None

  def read(self):
    return None

def asUnicode(s):
  try:
    return unicode(s)
  except:
    return str(s)

def findLoc(body, line, total):
  for i in range(len(body)):
    if body[i].lineno == line:
      if i + 1 >= len(body):
        return {"start": body[i].lineno, "end":total}
      else:
        return {"start": body[i].lineno, "end":body[i+1].lineno - 1}
    elif body[i].lineno > line and line != 0:
      return {"start": body[i-1].lineno, "end":body[i].lineno - 1}
    elif body[i].lineno < line and i + 1 == len(body) and line <= total:
      return {"start": body[i].lineno, "end":total}
  return None

def toForm(lines, loc):
  if loc:
    end = loc["end"] - 1
    start = loc["start"] - 1
    if start == end:
      return [{"start":start, "end":end}, "\n"*start + lines[start]]
    else:
      while (not re.search("\S", lines[end]) or re.search("^\s*#.*$", lines[end])) and end > start:
        end -= 1
      if start == end:
        return [{"start":start, "end":end}, "\n"*(start) + lines[start]]
      else:
        return [{"start":start, "end":end}, "\n"*(start) + "\n".join(lines[start:end + 1])]
    return []

def toModuleNameByPath(path):
  cur = [os.path.splitext(os.path.basename(path))[0]]
  p = os.path.dirname(path);
  while os.path.exists(os.path.join(p, "__init__.py")):
    cur.insert(0, os.path.basename(p))
    p = os.path.dirname(p)
  return ".".join(cur)

def toModule(path):
  name = toModuleNameByPath(path)
  if name in sys.modules:
    exec("import sys", sys.modules[name].__dict__)
    return sys.modules[name]
  else:
    parts = name.split(".")
    for idx in range(len(parts)):
      mname = ".".join(parts[:idx+1])
      __import__(mname)
    exec("import sys", sys.modules[name].__dict__)
    return sys.modules[name]

def explodeCode(string):
    lines = string.splitlines()
    total = len(lines)
    if total == 0:
        return [None, None]
    a = ast.parse(string)
    forms = []
    totalForms = len(a.body)
    for i in range(totalForms):
        start = a.body[i].lineno
        if i >= totalForms - 1:
            end = total
        else:
            end = a.body[i+1].lineno - 1
        forms.append(toForm(lines, {"start": start, "end": end}))
    return forms

def handlePos(string, pos):
  lines = string.splitlines()
  if len(lines) == 0:
    return [None, None]
  a = ast.parse(string)
  loc = findLoc(a.body, pos["line"] + 1, len(lines))
  if loc:
    return toForm(lines, loc)
  return [None, None]

def cleanCode(c):
  return re.sub(r'(#.*coding.*)\n?', '\n', c)

def cleanTrace(t):
  return t

def chunks(lst, n):
  for i in range(0, len(lst), n):
    yield lst[i:i+n]

def send(client, command, info):
  tosend = (json.dumps([client, command, info]) + "\n").encode('utf-8')
  for chunk in chunks(tosend, 1024):
    s.send(chunk);

def stopped():
  global stop
  return stop

def handleEval(data):
  result = None
  code = cleanCode(data[2]["code"])
  if "meta" in data[2]:
    loc = data[2]["meta"]
  else:
    loc = {"start":1, "end":1}

  toExec = []

  if "pos" in data[2] and data[2]["pos"]:
      try:
          toExec.append(handlePos(code, data[2]["pos"]))
      except:
          e = traceback.format_exc()
          return send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta": {"start": data[2]["pos"]["line"], "end": data[2]["pos"]["line"]}})
  else:
      try:
          exp = code
          if "meta" in  data[2]:
              exp = "\n" * data[2]["meta"]["start"] + code
          toExec = explodeCode(exp)
      except:
          e = traceback.format_exc()
          return send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta": data[2]["meta"]})

  if not code or len(toExec) == 0:
    return send(data[0], "editor.eval.python.result", None)

  try:
    if not "path" in data[2]:
      module = sys.modules["__main__"]
    else:
      module = toModule(data[2]["path"])
  except:
    e = traceback.format_exc()
    return send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta":loc})

  for form in toExec:
      code = form[1]
      loc = form[0]
      isEval = False
      try:
        code= compile(code, data[2]["name"], 'eval')
        isEval = True
      except:
        try:
          code= compile(code, data[2]["name"], 'exec')
        except:
          e = traceback.format_exc()
          send(data[0], "editor.eval.python.exception", {"ex": cleanTrace(e), "meta": loc})
          continue

      try:
        if isEval:
          result = eval(code, module.__dict__)
          send(data[0], "editor.eval.python.result", {"meta": loc, "result": asUnicode(result)})
        else:
          exec(code, module.__dict__)
          send(data[0], "editor.eval.python.success", {"meta": loc})
      except Exception as exc:
        e = traceback.format_exc()
        try:
          send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta":loc})
          continue
        except:
          pass

def ipyEval(data):
  result = None
  code = cleanCode(data[2]["code"])
  if "meta" in data[2]:
    loc = data[2]["meta"]
  else:
    loc = {"start":1, "end":1}

  toExec = []

  if "pos" in data[2] and data[2]["pos"]:
      try:
          toExec.append(handlePos(code, data[2]["pos"]))
      except:
          e = traceback.format_exc()
          return send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta": {"start": data[2]["pos"]["line"], "end": data[2]["pos"]["line"]}})
  else:
      try:
          exp = code
          if "meta" in  data[2]:
              exp = "\n" * data[2]["meta"]["start"] + code
          toExec = explodeCode(exp)
      except:
          e = traceback.format_exc()
          return send(data[0], "editor.eval.python.exception", {"ex":cleanTrace(e), "meta": data[2]["meta"]})


  if not code:
    return send(data[0], "editor.eval.python.result", None)

  try:
    ltipy.setNs(data[2]['path'])
  except:
    pass

  if "path" in data[2]:
    path = data[2]["path"]
  else:
    path = "untitled"

  for form in toExec:
      code = form[1]
      loc = form[0]
      isEval = False
      try:
        compile(code, data[2]["name"], 'eval')
        isEval = True
      except:
        try:
          compile(code, data[2]["name"], 'exec')
        except:
          e = traceback.format_exc()
          send(data[0], "editor.eval.python.exception", {"ex": cleanTrace(e), "meta": loc})
          continue


      ltipy.request({"meta": loc, "name": data[2]["name"], "path": path, "code": code, "client": data[0], "evaltype": "expression" if isEval else "statement"})

def shutdown():
  global threads, oldout, s, stop
  stop = True
  killThreads(threads)
  s.close()
  sys.stdout = oldout
  ltipy.killIPy()
  safePrint("Disconnected")
  sys.exit()

def signal_handler(signal, frame):
  shutdown()

signal.signal(signal.SIGINT, signal_handler)

def handle(data, threads):
  global currentClient
  currentClient = data[0]
  if data[1] == 'client.close':
    shutdown()
  elif data[1] == 'client.cancel-all':
    killThreads(threads)
  elif data[1] == 'editor.eval.python':
    if local:
      t = ThreadWithExc(target=handleEval, args=(data,))
      t.start()
      return t
    else:
      ipyEval(data)

def _async_raise(tid, exctype):
    '''Raises an exception in the threads with id tid'''
    if not inspect.isclass(exctype):
        raise TypeError("Only types can be raised (not instances)")
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(tid),
                                                  ctypes.py_object(exctype))
    if res == 0:
        raise ValueError("invalid thread id")
    elif res != 1:
        ctypes.pythonapi.PyThreadState_SetAsyncExc(ctypes.c_long(tid), None)
        raise SystemError("PyThreadState_SetAsyncExc failed")

class ThreadWithExc(threading.Thread):
    '''A thread class that supports raising exception in the thread from
       another thread.
    '''
    def _get_my_tid(self):
        if not self.isAlive():
            raise threading.ThreadError("the thread is not active")

        if hasattr(self, "_thread_id"):
            return self._thread_id

        for tid, tobj in threading._active.items():
            if tobj is self:
                self._thread_id = tid
                return tid

        raise AssertionError("could not determine the thread's id")

    def raiseExc(self, exctype):
        _async_raise( self._get_my_tid(), exctype )

def killThreads(threads):
  for t in threads:
    if t.isAlive():
      t.raiseExc(Exception)

def removeFinished(threads):
  return [t for t in threads if t.isAlive()]

def safePrint(s):
  sys.stdout.write(s)
  sys.stdout.flush()

def start(type):
  sys.stdout.flush()
  info["type"] = type
  s.send((json.dumps(info)+ "\n").encode('utf-8'));

  sys.stdout = Printer()
  sys.stderr = Printer()

  asyncore.loop()

def connected():
  global local
  local = False
  t = threading.Thread(target=start, args=("ipython",))
  t.start()

def disconnected():
  global local
  if not local:
    return
  local = True
  start("python")

class Client(asyncore.dispatcher):

  def __init__(self, host, port):
    asyncore.dispatcher.__init__(self)
    self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
    self.connect( (host, port) )
    self.buffer = ""
    self.cur = ""

  def handle_connect(self):
    pass

  def handle_close(self):
    shutdown()

  def handle_read(self):
    self.cur += self.recv(1024).decode('utf-8')
    if self.cur[-1] == '\n':
      global threads
      t = handle(json.loads(self.cur[:-1]), threads)
      if t:
        threads.append(t)
      self.cur = ""

  def writable(self):
    return (len(self.buffer) > 0)

  def handle_write(self):
    sent = self.send(self.buffer.encode('utf-8'))
    self.buffer = self.buffer[sent:]

  def sendoff(self, msg):
    self.buffer += msg

if __name__ == "__main__":
  curDir = os.getcwd()
  sys.path.append(curDir)
  name = os.path.basename(curDir)

  try:
    cid = int(sys.argv[2])
  except:
    cid = None

  info = {'name':name, 'client-id':cid, 'dir':curDir, 'commands': ['editor.eval.python']}

  s = Client('127.0.0.1', int(sys.argv[1]))
  lttools.setRespond(send);
  safePrint("Connected")

  ltipy.startIPy({"respond": send,
                  "connected": connected,
                  "disconnected": disconnected})
  #disconnected()
