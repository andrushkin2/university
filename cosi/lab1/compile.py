#!/usr/bin/env python3
"""Compile TS to JS and bundle all into bundle.js"""

from bundle import bundle
from run import tsc

def compile_process():
    """Compile TS to JS and bundle all into bundle.js
    """
    errors = tsc()
    if errors > 0:
        print("Cannot browserify because of TS-errors :(")
    else:
        bundle()
        print("\nDone :)")

if __name__ == "__main__":
    compile_process()

