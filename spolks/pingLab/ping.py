#!usr/bin/env python2

import time
import socket
import struct
import select
import random
import asyncore
import sys

IcmpEchoRequest = 8
IcpmCode = socket.getprotobyname("icmp")

ErrorDescriptions = {
    1: "ICPM messages can only be sent using ROOT permissions",
    10013: "ICPM messages can only be sent using ROOT permissions"
}

def smurf(src, dst, timeout = 2):
    socketObj = getICMPSocket()
    socketObj.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)

    port = random.choice(range(33434, 33535))

    try:
        socketObj.bind((src, port))
    except socket.error as e:
        raise IOError('Unable to bind receiver socket: {}'.format(e))

    # get packet data
    packerId, packet = getPacket(timeout)
    while packet:
        sent = socketObj.sendto(packet, (dst, port))
        packet = packet[sent:]

    select.select([socketObj], [], [], timeout)
    socketObj.close()

def ping(destAddress, timeout = 2, count = 4):
    ''' Sends a bunch of ping request to the given address that can be an IP or hostname

        "timeout" can be any integer or float
        "count" specifies how many pings will be sent

        Displays the result on the screen
    '''

    print("Pinging {}:".format(destAddress))
    for i in range(count):
        delay, host = sendPingRequest(destAddress, timeout)
        if delay == None:
            print("Request timed out. (Timeout within {} seconds)".format(timeout))
        else:
            delay = round(delay * 1000.0, 4)
            print("Reply from {}: time={}ms".format(host, delay))
    print("")

def getExtendedICMPSocket(port):
    ''' Get extended ICPM socket '''
    socketObj = getICMPSocket()

    socketObj.setsockopt(socket.SOL_SOCKET, socket.SO_RCVTIMEO, struct.pack("ll", 5, 0))
    try:
        socketObj.bind(('', port))
    except socket.error as e:
        raise IOError('Unable to bind receiver socket: {}'.format(e))

    return socketObj

def traceroute(destAddress, timeout=2, hops=30):
    ttl = 1
    port = random.choice(range(33434, 33535))

    try:
        destIP = socket.gethostbyname(destAddress)
    except socket.gaierror as e:
        print('Unable to resolve {}: {}'.format(destAddress, e))
        raise

    print('Traceroute to {} ({}), {} hops max'.format(destAddress, destIP, hops))

    while True:
        reciever = getExtendedICMPSocket(port)
        sender = getUDPSocket(ttl)

        # get packet data
        packerId, packet = getPacket(timeout)


        while packet:
            sent = sender.sendto(packet, (destAddress, port))
            packet = packet[sent:]

        addr = None

        try:
            delay, addr = recieveData(reciever, packerId, time.time(), timeout, False)
        except socket.error as e:
            pass
            # raise IOError('Socket error: {}'.format(e))
        finally:
            reciever.close()
            sender.close()

        if addr and delay != None:
            print('{:<4}\t{:<8}ms\t{}'.format(ttl, round(delay * 1000.0, 4), addr[0]))

            if addr[0] == destIP:
                break
        else:
            print('{:<4}\t\t*\tRequest timed out'.format(ttl))

        ttl += 1

        if ttl > hops:
            break

    print("Trace complete.")


def getICMPSocket():
    ''' Get ICMP socket instance '''

    try:
        socketObj = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
    except socket.error as e:
        if e.errno in ErrorDescriptions:
            raise socket.error("".join((e.args[1], ErrorDescriptions[e.errno])))
        raise

    return socketObj

def getUDPSocket(ttl):
    ''' Get UDP socket instance 
    
        Returns: socketObj
    '''

    try:
        socketObj = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
        socketObj.setsockopt(socket.SOL_IP, socket.IP_TTL, ttl)
    except socket.error as e:
        if e.errno in ErrorDescriptions:
            raise socket.error("".join((e.args[1], ErrorDescriptions[e.errno])))
        raise

    return socketObj


def getPacket(timeout):
    ''' Get a packet ID and packet data
    
        "timeout" uses for generating a packet ID

        Returns: packetId, packet
     '''
    packetId = int((id(timeout) * random.random()) % 65535)
    packet = createPacket(packetId)

    return packetId, packet


def sendPingRequest(destAddress, timeout = 1):
    ''' 
    Send a ping request to the given address. It can be IP or hostname.
    Timeout can be integer or float

    Returns: the delay or None on timeout and an invalid address
    '''

    socketObj = getICMPSocket()

    try:
        host = socket.gethostbyname(destAddress)
    except socket.gaierror:
        socketObj.close()
        return None, None

    # get packet data
    packerId, packet = getPacket(timeout)

    while packet:
        sent = socketObj.sendto(packet, (destAddress, 1))
        packet = packet[sent:]

    delay, addr = recieveData(socketObj, packerId, time.time(), timeout)
    socketObj.close()

    return delay, host


def recieveData(socketObj, packetId, sentTime, timeout, waitForReady = True):
    ''' Recieve data from the given socket '''
    timeLeft = timeout

    while True:
        startTime = time.time()
        ready = select.select([socketObj], [], [], timeLeft)
        timeOffset = time.time() - startTime

        # if state empty -> timeout
        if waitForReady and ready[0] == []:
            return None, None
        
        timeRecieved = time.time()

        # get recieve data
        try:
            recPacket, addr = socketObj.recvfrom(1024)
        except:
            raise
        icmpHeader = recPacket[20:28]

        # unpack header data
        type, code, checksum, p_id, sequence = struct.unpack('bbHHh', icmpHeader)

        if p_id == packetId or not waitForReady:
            return timeRecieved - startTime, addr

        timeLeft -= timeRecieved - startTime
        if timeLeft <= 0:
            return None, None

def getHeaderData(checksum, id):
    ''' Get bytes object of header data '''
    return struct.pack('bbHHh', IcmpEchoRequest, 0, checksum, id, 1)


def createPacket(id):
    """Create a packer based on the given in args 'id'"""

    # Header is type (8), code (8), checksum (16), id (16), sequence (16)
    header = getHeaderData(0, id)

    data = 192 * 'Q'

    checksum = getChecksum(header + data)

    header = getHeaderData(socket.htons(checksum), id)

    return header + data




def getChecksum(dataString):
    """Create a checksum for given data"""
    sum = 0
    count_to = (len(dataString) / 2) * 2
    count = 0
    while count < count_to:
        this_val = ord(dataString[count + 1])*256+ord(dataString[count])
        sum = sum + this_val
        sum = sum & 0xffffffff # Necessary?
        count = count + 2
    if count_to < len(dataString):
        sum = sum + ord(dataString[len(dataString) - 1])
        sum = sum & 0xffffffff # Necessary?
    sum = (sum >> 16) + (sum & 0xffff)
    sum = sum + (sum >> 16)
    answer = ~sum
    answer = answer & 0xffff
    # Swap bytes. Bugger me if I know why.
    answer = answer >> 8 | (answer << 8 & 0xff00)
    return answer

if __name__ == "__main__":
    ping('www.heise.de')
    ping('google.com')
    ping('an-invalid-test-url.com')
    ping('127.0.0.1')
