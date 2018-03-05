#!usr/bin/env python2

import sys
from ping import smurf


def run():
    if len(sys.argv) < 3:
        print("There is not argument with host name")
        return
    smurf(sys.argv[1], sys.argv[2])


if __name__ == "__main__":
    run()
