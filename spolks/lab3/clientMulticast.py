import socket
import threading
import sys
import struct


isExitProgram = False
isConnected = True
IP_LIST = []


class Receiver(threading.Thread):
    def __init__(self, s):
        self.s = s
        threading.Thread.__init__(self)

    def run(self):
        flag = False
        global IP_LIST
        global isExitProgram
        global isConnected
        while True:
            if isConnected == True:
                # get data
                data, addr = self.s.recvfrom(1024)

                if data == 'init':
                    if flag == False:
                        # current user - first connect
                        flag = True
                        print("\nWelcome to chat, user - {}\n".format(addr[0]))
                        if addr[0] not in IP_LIST:
                            IP_LIST.append(addr[0])
                    else:
                        # another user was connected
                        self.addToListIfNeedIt(addr)

                elif data == "leave":
                    if isConnected == False:
                         continue
                    self.leaveGroup(addr)

                elif data == 'exit':
                    if isExitProgram == True:
                        return
                    self.leaveGroup(addr)

                elif data == "killed" and isConnected:
                    # some user was killed
                    self.userWasKilled(addr)

                elif data.startswith("kill"):
                    # parse 'kill' command
                    splitted = data.split(" ")
                    
                    # if IP for killing is current socket address -> kill it
                    if len(splitted) == 2 and splitted[1] == IP_LIST[0]:
                        self.kill()

                else:
                    # a simple message
                    self.addToListIfNeedIt(addr)

                    if addr[0] != IP_LIST[0]:
                        print("<{}> {}".format(addr[0], data))

            if isExitProgram == True:
                return

    def userWasKilled(self, addr):
        """ Some user was killed. Show message and remove from known addresses """

        print("User '{}' was killed".format(addr[0]))
        IP_LIST.remove(addr[0])

    def kill(self):
        """ Kill current user and notify other ones """

        # notify other users
        self.s.sendto('killed', MULTICAS_GROUP)

        # disconnect from multigroup
        disconectFromGroup(self.s)

        # output
        print("\n\nYou've been killed!\nEnter any key to reconnect\n\n")

    def addToListIfNeedIt(self, addr):
        """ Add a new address to known addresses of need it """

        if addr[0] not in IP_LIST:
            print("New user enters the chatroom - {}".format(addr[0]))
            IP_LIST.append(addr[0])

    def leaveGroup(self, addr):
        """ Someone leave the chat. Show message and remove from known addresses """

        print("User '{}' leaves the chatroom".format(addr[0]))
        IP_LIST.remove(addr[0])



class Sender(threading.Thread):
    def __init__(self, s):
        self.s = s
        threading.Thread.__init__(self)

    def run(self):
        global MULTICAS_GROUP
        global mreq
        global IP_LIST
        global isConnected

        print("Enter any key to connect")

        while True:
            # wait for type anything
            msg = sys.stdin.readline().replace("\n", "").replace("\r", "")

            if isConnected == False and len(msg) > 0:
                # connect user 
                connectToGroup(self.s)
                # notify other users
                self.s.sendto('init', MULTICAS_GROUP)

            elif isConnected == False and len(msg) == 0:
                continue

            elif msg == "leave":
                # send a message
                self.s.sendto(msg, MULTICAS_GROUP)

                # leave chat
                self.leave()
                continue

            elif msg == 'list':
                # show connections list
                self.showList()

            else:
                # send a message
                self.s.sendto(msg, MULTICAS_GROUP)

                # close program if type "exit"
                if msg == 'exit':
                    self.exitApp()
                    return

                # otherwise, print what you've typed
                print("<You> {}".format(msg))

        self.s.close()

    def showList(self):
        """ show the list of known IPs """
        for a in IP_LIST:
            print("{}\n".format(str(a)))
    
    def leave(self):
        """ Current user leave the chat """
        disconectFromGroup(self.s)
        print("\n\nYou've leaved the chat!\nEnter any key to reconnect\n\n")

    def exitApp(self):
        """ Close the program """
        global isExitProgram
        global isConnected
        # set flags and say Goodbye
        disconectFromGroup(self.s)
        isExitProgram = True
        print('\n\nGood Bye!\n\n')


def disconectFromGroup(s):
    s.setsockopt(socket.IPPROTO_IP, socket.IP_DROP_MEMBERSHIP, mreq)
    global isConnected
    isConnected = False

def connectToGroup(s):
    s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    global isConnected
    isConnected = True

# create an UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# multicast TTL
ttl = struct.pack('b', 1)
s.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, ttl)

# create a multicast group and add it to socket options
MULTICAS_GROUP = ('224.3.29.71', 2000)
group = socket.inet_aton(MULTICAS_GROUP[0])
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
connectToGroup(s)

# bind to the port
s.bind(('', 2000))

# start
Receiver(s).start()
Sender(s).start()
