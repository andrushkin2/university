import socket
import select
import string
import sys

LINE = "\n=================================================================="
CONNECTED_MESSAGE = "\nYou've been connected to the host. You can start messaging\n"


def getSocket():
    ''' Cteate a socket

        Raise: IOError

        Returns: A socket instance
     '''
    try:
        socketObj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socketObj.settimeout(2)
    except socket.error as e:
        print('Cannot create a socket: {}\n'.format(e))
        return None

    return socketObj


def connectToServer(s, host, port):
    try:
        s.connect((host, port))
    except socket.error as e:
        print("Cannot connect to the server({}, {}): {}\n".format(host, port, e))
        return False

    return True


def promt():
    sys.stdout.write("<You> ")
    sys.stdout.flush()


def runClient():
    if len(sys.argv) < 3:
        print("\nWrong execution of application!\n\tUsage: python client.py SERVER_IP SERVER_PORT")
        sys.exit()

    host = sys.argv[1]
    port = int(sys.argv[2])

    socketObj = getSocket()
    if socketObj == None:
        return

    if connectToServer(socketObj, host, port) == False:
        return

    print("{}{}\nCommands:\n\t/leave - leave the chat\n\t/kill userIP userPORT - kill user with the entered IP{}\n\n".format(LINE, CONNECTED_MESSAGE, LINE))
    promt()

    while 1:
        SOCKETS_LIST = [sys.stdin, socketObj]

        # Get the list sockets which are readable
        readSockets, write_sockets, error_sockets = select.select(
            SOCKETS_LIST, [], [])

        for sock in readSockets:
            if sock == socketObj:
                data = sock.recv(4096)
                if not data:
                    print("\n\nYou've been disconnected from chat server :(\n\n")
                    sock.close()
                    return
                else:
                    sys.stdout.write(data)
                    promt()
            else:
                message = sys.stdin.readline()
                command = parseMessage(message)
                if command == "leave":
                    socketObj.send(message)
                    socketObj.close()
                    return
                else:
                    socketObj.send(message)
                    promt()

    # close socket
    socketObj.close()


def parseMessage(message=""):
    newMessage = message.replace("\n", "").replace("\r", "")
    if newMessage.startswith("/leave"):
        return "leave", None
    elif newMessage.startswith("/kill"):
        splitted = newMessage.split(" ")
        if len(splitted) == 3:
            return "kill", [splitted[1], int(splitted[2])]

    return message, None


if __name__ == "__main__":
    while 1:
        print("Type:\n\t1) Connect to the chat\n\t2) Exit\n")
        code = sys.stdin.readline()
        if code.startswith("1"):
            runClient()
        elif code.startswith("2"):
            sys.exit()
