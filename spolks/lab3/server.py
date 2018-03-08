import socket
import select


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
                        sendMessage(sock, "\r<{}>{}".format(str(sock.getpeername()), data), serverSocketObj, CONNECTIONS_LIST)
                except :
                    # something wrong with current socket connection
                    message = "Client {} is offline".format(addr[0])
                    sendMessage(sock, message,serverSocketObj, CONNECTIONS_LIST)
                    print(message)

                    sock.close()
                    CONNECTIONS_LIST.remove(sock)

                    continue

    # close server socket
    serverSocketObj.close()


def sendMessage(sock, message, serverSoket, CONNECTION_LIST):
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
