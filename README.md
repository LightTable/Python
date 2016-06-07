##Python for Light Table

The official Python language plugin for Light Table.

## Python 2 vs Python 3
### Linux

Light Table v0.8.1 is using your system default Python, which on most Linux distributions in time of writing this means Python 2.
If you want to check what is your system default Python, try ```ls -l /usr/bin/python``` you'll probably get something like this:

    lrwxrwxrwx 1 root root 16 Lip  1 21:41 /usr/bin/python -> /usr/bin/python2

If you want that Light Table for eval use some other version of Python, put in your ```user.behaviors``` following:

    [:app :lt.plugins.python/python-exe "/usr/bin/pythonX"]

where **X** is 3 or 3.5 or whatever Python version you have installed and you want to use with LightTable eval.

##Terminology used

For (maybe) unknown words like eval or REPL please check http://docs.lighttable.com/#what

If by chance you see somewhere LT, it stands for Light Table, of course.


##License

Copyright (C) 2013 Kodowa Inc.

Distributed under the MIT license, see license.md for the full text.
