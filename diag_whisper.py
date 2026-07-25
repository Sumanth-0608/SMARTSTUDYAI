import sys, os, traceback
print('PYTHON EXECUTABLE:', sys.executable)
print('PYTHON VERSION:', sys.version)
print('sys.path first entries:', sys.path[:5])
print('PATH (truncated):', os.environ.get('PATH','')[:500])
print('\n--- pip packages (whisper / torch) ---')
try:
    import importlib, pkgutil
    w = importlib.import_module('whisper')
    print('whisper module file:', getattr(w, '__file__', 'n/a'))
except Exception:
    print('whisper import FAILED')
    traceback.print_exc()

try:
    import torch
    print('torch version:', getattr(torch, '__version__', 'n/a'))
    print('torch module file:', getattr(torch, '__file__', 'n/a'))
except Exception:
    print('torch import FAILED')
    traceback.print_exc()

print('\n--- end diagnostics ---')
