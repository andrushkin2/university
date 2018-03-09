import socket
import select
from client import parseMessage


def getServerSocket(ipAddress = "0.0.0.0", port = 5000):
    ''' Cteate a socket
    
        Params: "ipAddress" - IP address of the server socket; "port" - port of the server socket

        Raise: IOError

        Returns: A socket instance
     '''
    try:
        socketObj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        socketObj.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        socketObj.bind((ipAddress, port))
    except socket.error as e:
        raise IOError('Cannot create a socket({}, {}): {}'.format(ipAddress, port, e))

    return socketObj


def runServer():
    ''' Run server socket  '''

    CONNECTIONS_LIST = []
    BUFFER_SIZE = 4096
    PORT = 5000

    serverSocketObj = getServerSocket()
    serverSocketObj.listen(10)

    # add to list of sockets
    CONNECTIONS_LIST.append(serverSocketObj)

    print("Server has been started on port {}".format(PORT))

    # processing sockets
    while 1:
        # Get the list sockets which are ready to be read through select
        readSockets, write_sockets, error_sockets = select.select(CONNECTIONS_LIST, [], [])

        for sock in readSockets:
            # check for new connections
            if sock == serverSocketObj:
                sockData, addr = serverSocketObj.accept()
                CONNECTIONS_LIST.append(sockData)

                print("Client ({}) connected".format(addr[0]))
                sendMessage(sockData, "User ({}) added the conversation\n".format(addr[0]), serverSocketObj, CONNECTIONS_LIST)
            # parse clients messages
            else:
                try:
                    # get data and send it to other clients
                    data = sock.recv(BUFFER_SIZE)
                    if (data):
                        command, otherData = parseMessage(data)
                        if command == "leave":
                            leaveChat(sock, serverSocketObj, CONNECTIONS_LIST)
                        elif command == "kill" and otherData and len(otherData) == 2:
                            killUser(sock, otherData, serverSocketObj, CONNECTIONS_LIST)
                        else:
                            sendMessage(sock, "\r<{}>{}".format(str(sock.getpeername()), data), serverSocketObj, CONNECTIONS_LIST)
                except :
                    # something wrong with current socket connection
                    message = "\n<Notifier>Client {} is offline\n".format(addr[0])
                    sendMessage(sock, message, serverSocketObj, CONNECTIONS_LIST)
                    print(message)

                    sock.close()
                    CONNECTIONS_LIST.remove(sock)

                    continue

    # close server socket
    serverSocketObj.close()

def leaveChat(sock, serverSocketObj, CONNECTIONS_LIST):
    """ Send a message that some user leaved the chat, then close the socket """

    message = "\n<Notifier>Client {} leave the chat\n".format(str(sock.getpeername()))
    sendMessage(sock, message, serverSocketObj, CONNECTIONS_LIST)
    print(message)

    sock.close()
    CONNECTIONS_LIST.remove(sock)


def killUser(sock, peerData, serverSocketObj, CONNECTIONS_LIST):
    """ Kill user with the given peer name """

    peerName = str(peerData).replace("[", "(").replace("]", ")")
    # try to find socket by peer name
    sockToKill = getSocketWithPeerName(serverSocketObj, CONNECTIONS_LIST, peerName)

    if sockToKill != None:
        # close killed socket
        sockToKill.close()
        CONNECTIONS_LIST.remove(sockToKill)

        # send message that user was killed
        sendMessage(sock, "\n<{}>User {} was killed\n".format(
            "Notifier", peerName), serverSocketObj, CONNECTIONS_LIST)

def getSocketWithPeerName(serverSocketObj, CONNECTIONS_LIST, peerName=""):
    """ Find socket by the given peer name
    
        Params: "serverSocketObj" - server socket instance; "CONNECTIONS_LIST" - list of all socket connections;"peerName" - a peer name to find

        Returns: Found socket instanse or None
     """
    for sock in CONNECTIONS_LIST:
        if sock != serverSocketObj and str(sock.getpeername()) == peerName:
            return sock
    
    return None


def sendMessage(sock, message, serverSoket, CONNECTION_LIST):
    """ Send a message to all sockets in the given connections list """
    for socketObj in CONNECTION_LIST:
        if socketObj != serverSoket and socketObj != sock:
            try:
                socketObj.send(message)
            except :
                # broken socket connection or something else
                socketObj.close()
                CONNECTION_LIST.remove(socketObj)


if __name__ == "__main__":
    runServer()
