#include <iostream>
#include <fstream>
#include <string>
#include "platform.hpp"


constexpr size_t g_fragmentSize = 1400;
constexpr int g_sendTryCount = 5;

using namespace std;


/*
==================
WaitForHeader
==================
*/
template<typename socketType>
static bool WaitForHeader(string &fileName, uint64_t &fileSize, const socketType &serverSocket, sockaddr_in &srcAddress) {
	int rxLength = 0;
	char buf[g_fragmentSize];
	platformSocklen_t srcAddressLength = sizeof srcAddress;
	int count = g_sendTryCount;

	while (count --> 0) {
		memset(buf, 0, sizeof buf);
		if ((rxLength = recvfrom(serverSocket, buf, sizeof buf, 0, reinterpret_cast<sockaddr*>(&srcAddress), &srcAddressLength)) == PLATFORM_SOCKET_ERROR) {
			cerr << "recvfrom() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		//send it back
		if (sendto(serverSocket, buf, rxLength, 0, reinterpret_cast<sockaddr*>(&srcAddress), srcAddressLength) == PLATFORM_SOCKET_ERROR) {
			cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		fileSize = *reinterpret_cast<const uint64_t*>(buf);

		const char* fileN = buf + sizeof fileSize;
		fileName = fileN;

		// if check pass then continue
		memset(buf, 0, sizeof buf);
		if ((recvfrom(serverSocket, buf, sizeof buf, 0, reinterpret_cast<sockaddr*>(&srcAddress), &srcAddressLength)) == PLATFORM_SOCKET_ERROR) {
			cerr << "recvfrom() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		if (strcmp(buf, "OK") != 0) {
			return false;
		} else {
			return true;
		}
	}
	
	return false;
}

/*
==================
ReceiveFile
==================
*/
template<typename socketType>
static bool ReceiveFile(string &fileName, uint64_t &fileSize, socketType serverSocket, sockaddr_in &srcAddress) {
	int count = 0;
	char buf[g_fragmentSize];
	int rxLength = 0, currentSize = 0;
	platformSocklen_t srcAddressLength = sizeof srcAddress;
	int skipCounter = 0;

	ofstream file(fileName, ios::binary);
	if (!file) {
		cerr << "Can't open file " << fileName << endl;
		return false;
	}

	for(;;) {
		memset(buf, 0, sizeof buf);
		if ((rxLength = recvfrom(serverSocket, buf, sizeof buf, 0, reinterpret_cast<sockaddr*>(&srcAddress), &srcAddressLength)) == PLATFORM_SOCKET_ERROR) {
			cerr << "recvfrom() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		} else {
			file.write(buf, rxLength);
			currentSize += rxLength;
			if (++skipCounter == 10) {
				skipCounter = 0;
				cout << "\rReceive file... " << (float(currentSize) / float(fileSize)) * 100.0f << "%             ";
				cout.flush();
			}
			if (sendto(serverSocket, "OK", sizeof("OK"), 0, reinterpret_cast<sockaddr*>(&srcAddress), srcAddressLength) == PLATFORM_SOCKET_ERROR) {
				cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
				return false;
			}
			// end when sizes is equal
			if (currentSize == fileSize) {
				break;
			}
		}
	}

	return true;
}

/*
==================
main
==================
*/
int main() {
	STARTUP();

	auto serverSocket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
	if (serverSocket == PLATFORM_INVALID_SOCKET) {
		cerr << "Can't create socket. Error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
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
		cerr << "Can't bind socket. Error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}

	uint64_t fileSize = 0;
	string fileName;
	sockaddr_in srcAddress;
	bool status;

	if (status = WaitForHeader(fileName, fileSize, serverSocket, srcAddress)) {
		status = ReceiveFile(fileName, fileSize, serverSocket, srcAddress);
	} else {
		cerr << "Failed to get header!" << endl;
	}

	CLOSE_SOCKET(serverSocket);
	CLEANUP();

	return status ? 0 : 1;
}
