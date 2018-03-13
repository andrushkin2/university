import socket
import threading
import sys
import struct


exit_flag = False
isConnected = True
ip_list = []


class Receiver(threading.Thread):
    def __init__(self, s):
        self.s = s
        threading.Thread.__init__(self)
        #self.ip_list = []

    def run(self):
        flag = False
        global ip_list
        global exit_flag
        global isConnected
        while True:
            if isConnected == True:
                data, addr = self.s.recvfrom(1024)
                if data == 'init':
                    if flag == False:
                        flag = True
                        print("### Welcome to ChatRoom, user - {} ###".format(addr[0]))
                        ip_list.append(addr[0])
                    else:
                        self.addToListIfNeedIt(addr)
                elif data == "leave":
                    if isConnected == False:
                         continue
                    self.leaveGroup(addr)
                elif data == 'exit':
                    if exit_flag == True:
                        return
                    self.leaveGroup(addr)
                else:
                    self.addToListIfNeedIt(addr)

                    if addr[0] != ip_list[0]:
                        print("<{}> {}".format(addr[0], data))

            if exit_flag == True:
                return

    def addToListIfNeedIt(self, addr):
        if addr[0] not in ip_list:
            print("New user enters the chatroom - {} ###".format(addr[0]))
            ip_list.append(addr[0])

    def leaveGroup(self, addr):
        print("### User '{}' leaves the chatroom ###".format(addr[0]))
        ip_list.remove(addr[0])



class Sender(threading.Thread):
    def __init__(self, s):
        self.s = s
        #self.addr = addr
        threading.Thread.__init__(self)

    def run(self):
        global multicast_group
        global mreq
        global ip_list
        global isConnected
        print("Enter any key to connect")
        while True:
            # wait for type anything
            msg = sys.stdin.readline().replace("\n", "").replace("\r", "")

            if isConnected == False and len(msg) > 0:
                # connect user 
                connectToGroup(self.s)
                isConnected = True
                self.s.sendto('init', multicast_group)
            elif isConnected == False and len(msg) == 0:
                continue
            elif msg == "leave":
                # send a message
                self.s.sendto(msg, multicast_group)

                # leave chat
                self.leave()
                continue
            elif msg == 'list':
                # show connections list
                self.showList()
            else:
                # send a message
                self.s.sendto(msg, multicast_group)

                # close program if type "exit"
                if msg == 'exit':
                    self.exitApp()
                    return

                # otherwise, print what you've typed
                print("<You> {}".format(msg))
        self.s.close()

    def showList(self):
        for a in ip_list:
            print("{}\n".format(str(a)))
    
    def leave(self):
        global isConnected
        isConnected = False
        print("\n\nYou've leaved the chat!\nEnter any key to reconnect\n\n")
        disconnectFromGroup(self.s)

    def exitApp(self):
        global exit_flag
        global isConnected
        isConnected = False
        exit_flag = True
        print('\n\nGood Bye!\n\n')

def connectToGroup(s):
    # s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    print("Connect...")

def disconnectFromGroup(s):
    # s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, '')
    print("Disonnect...")

multicast_group = ('224.3.29.71', 2000)
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

ttl = struct.pack('b', 1)
s.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, ttl)

group = socket.inet_aton(multicast_group[0])
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
connectToGroup(s)

s.bind(('', 2000))

Receiver(s).start()
Sender(s).start()
