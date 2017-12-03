#include <iostream>
#include <fstream>
#include <cstring>
#include <cstdint>
#include "platform.hpp"

constexpr size_t g_fragmentSize = 32'768;


using namespace std;


/*
==================
OnReceived
==================
*/
template<typename socketType>
static bool OnReceived(const char* buffer, const size_t buffSize, socketType socket) {
	static bool waitForHeader = true;
	static uint64_t fileSize = 0, doneSize = 0;
	static ofstream file;

	if (waitForHeader) {
		fileSize = *reinterpret_cast<const uint64_t*>(buffer);
		const char * const fileName = buffer + sizeof fileSize;

		file.open(fileName, ios::binary);

		send(socket, "OK", 2, 0);
		waitForHeader = false;
		return false;
	} else {
		doneSize += buffSize;
		file.write(buffer, buffSize);

		cout << "\rReceive file... " << (float(doneSize) / float(fileSize)) * 100.0f << "%             ";
		cout.flush();

		if (doneSize == fileSize) {
			file.close();
			return true;
		} else {
			return false;
		}
	}
}

/*
==================
main
==================
*/
int main() {
	STARTUP();

	auto serverSocket = socket(AF_INET, SOCK_STREAM, 0);
	if (serverSocket == PLATFORM_INVALID_SOCKET) {
		cout << "Can't create socket. Error: " << PLATFORM_GET_ERROR << endl;
		CLEANUP();
		return 1;
	}

	cout << "Port to open: ";
	uint16_t port;
	cin >> port;

	sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	addr.sin_addr.s_addr = htonl(INADDR_ANY);

	if (bind(serverSocket, reinterpret_cast<sockaddr*>(&addr), sizeof addr) == PLATFORM_SOCKET_ERROR) {
		cout << "Can't bind socket. Error: " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}

	if (listen(serverSocket, 1) == PLATFORM_SOCKET_ERROR) {
		cout << "Listen error: " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}

	cout << "Waiting for client..." << endl;

	sockaddr_in clientAddr;
	platformSocklen_t clientAddrLen = sizeof clientAddr;
	auto clientSocket = accept(serverSocket, reinterpret_cast<sockaddr*>(&clientAddr), &clientAddrLen);
	if (clientSocket == PLATFORM_SOCKET_ERROR) {
		cout << "Accept error: " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}

    union _ipAddress {
        uint32_t address;
        uint8_t bytes[4];
    } ipAddress;
	ipAddress.address = ntohl(clientAddr.sin_addr.s_addr);
	cout << "Accepting incoming connection from " << int(ipAddress.bytes[3]) << '.' << int(ipAddress.bytes[2]) << '.' << int(ipAddress.bytes[1]) << '.' << int(ipAddress.bytes[0]) << endl;

	char fragment[g_fragmentSize];
	memset(fragment, 0, g_fragmentSize);

	while (1) {
		int recievedSize;
		if ((recievedSize = recv(clientSocket, fragment, sizeof fragment, 0)) == PLATFORM_SOCKET_ERROR) {
			cout << "Recv error: " << PLATFORM_GET_ERROR << endl;
			CLOSE_SOCKET(serverSocket);
			CLOSE_SOCKET(clientSocket);
			CLEANUP();
			return 1;
		} else {
			if (OnReceived(fragment, recievedSize, clientSocket)) {
				break;
			}
		}
	}

	cout << endl << "Done!" << endl;

	CLOSE_SOCKET(serverSocket);
	CLOSE_SOCKET(clientSocket);
	CLEANUP();

	return 0;
}
