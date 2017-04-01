#!/usr/bin/env python3
import subprocess as process

process.Popen(["browserify", "./*.js > bundle.js"])
