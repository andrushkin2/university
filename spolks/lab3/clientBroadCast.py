import socket
import threading
import sys

isExitProgram = False
IP_LIST = []


class Receiver(threading.Thread):
    def __init__(self, s):
        self.s = s
        threading.Thread.__init__(self)

    def run(self):
        flag = False
        global IP_LIST
        global isExitProgram
        while True:
            # get data
            data, addr = self.s.recvfrom(1024)
            if data == 'init':
                # current user - first connect
                if flag == False:
                    flag = True
                    print("\nWelcome to chat, user - {}\n".format(addr[0]))
                    if addr[0] not in IP_LIST:
                        IP_LIST.append(addr[0])
                else:
                    # another user was connected
                    self.addToListIfNeedIt(addr)

            elif data == 'exit':
                if isExitProgram == True:
                    return

                print("User '{}' leaves the chatroom".format(addr[0]))
                IP_LIST.remove(addr[0])

            else:
                # a simple message
                self.addToListIfNeedIt(addr)

                if addr[0] != IP_LIST[0]:
                    print("<{}> {}".format(addr[0], data))

            if isExitProgram == True:
                return
    
    def addToListIfNeedIt(self, addr):
        """ Add a new address to known addresses of need it """

        if addr[0] not in IP_LIST:
            print("New user enters the chatroom - {}".format(addr[0]))
            IP_LIST.append(addr[0])



class Sender(threading.Thread):
    def __init__(self, s):
        self.s = s
        threading.Thread.__init__(self)

    def run(self):
        self.s.sendto('init', ('<broadcast>', 2000))
        global IP_LIST

        while True:
            # wait for type anything
            msg = sys.stdin.readline().replace("\n", "").replace("\r", "")

            if msg == 'list':
                # show connections list
                for a in IP_LIST:
                    print("{}\n".format(str(a)))

            else:
                # send a message
                self.s.sendto(msg, ('<broadcast>', 2000))

                # close program if type "exit"
                if msg == 'exit':
                    global isExitProgram
                    isExitProgram = True
                    print('\n\nGood Bye!\n\n')
                    self.s.close()
                    return

                # otherwise, print what you've typed
                print("<You> {}".format(msg))
        return

# create an UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# enable BROADCAST and bind to the PORT
s.bind(('', 2000))
s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

# start
Receiver(s).start()
Sender(s).start()

