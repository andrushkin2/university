#!/usr/bin/env python3
"""Module for bundling JS-files"""
import subprocess as process

def bundle():
    """Fucntion run Browserify compiller for all JS-files > bundle.js
    """
    exec_process = process.Popen(["browserify", "./", ">", "bundle.js"], shell=True,
                                 stdout=process.PIPE)
    for line in exec_process.stdout:
        print(line)
    exec_process.wait()
    print("Broserify finished")

if __name__ == "__main__":
    bundle()
