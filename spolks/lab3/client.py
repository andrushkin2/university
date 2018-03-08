import socket
import select
import string
import sys

def getSocket():
    ''' Cteate a socket

        Raise: IOError

        Returns: A socket instance
     '''
    try:
        socketObj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socketObj.settimeout(2)
    except socket.error as e:
        raise IOError(
            'Cannot create a socket({}, {}): {}'.format(ipAddress, port, e))

    return socketObj

def connectToServer(s, host, port):
    try:
        s.connect((host, port))
    except socket.error as e:
        print("Cannot connect to the server({}, {}): ".format(host, port, e))
        sys.exit()

def promt():
    sys.stdout.write("<You> ")
    sys.stdout.flush()

def runClient():
    if len(sys.argv) < 3:
        print("Usage: python client.py HOSTNAME PORT")
        sys.exit()

    host = sys.argv[1]
    port = int(sys.argv[2])

    socketObj = getSocket()

    connectToServer(socketObj, host, port)

    print("You've beeb connected to the host. Start messaging")
    promt()

    while 1:
        SOCKETS_LIST = [sys.stdin, socketObj]

        # Get the list sockets which are readable
        readSockets, write_sockets, error_sockets = select.select(SOCKETS_LIST, [], [])

        for sock in readSockets:
            if sock == socketObj:
                data = sock.recv(4096)
                if not data:
                    print("\nYou've been disconnected from chat server :(")
                    sys.exit()
                else:
                    sys.stdout.write(data)
                    promt()
            else:
                message = sys.stdin.readline()
                socketObj.send(message)
                promt()

    # close socket
    socketObj.close()

if __name__ == "__main__":
    runClient()