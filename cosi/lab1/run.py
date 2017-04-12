#!/usr/bin/env python3.6
"""Module for compiling TS-files"""
import subprocess as process

def tsc():
    """Fucntion run TSC compiller using file tsconfig.json
    """
    errors = 0
    exec_process = process.Popen(["tsc", "-p", "tsconfig.json"], shell=True, stdout=process.PIPE)
    for line in exec_process.stdout:
        if "error" in str(line).lower():
            errors += 1
        print("\t", line)
    exec_process.wait()
    print("TSC is finished")
    return errors

if __name__ == "__main__":
    tsc()

