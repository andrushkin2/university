#include <iostream>
#include <fstream>
#include <string>
#include <chrono>
#include "platform.hpp"


using namespace std::chrono_literals;
using namespace std;


constexpr size_t g_fragmentSize = 1400;
constexpr int g_sendTryCount = 5;
constexpr auto g_fragmentTimeout = 100ms;


/*
==================
SendHeader
==================
*/
template<typename socketType>
static bool SendHeader(const string &fileName, const uint64_t fileSize, socketType socket, sockaddr_in &dstAddress) {
	char buf[g_fragmentSize], check[g_fragmentSize];
	int count = g_sendTryCount;
	platformSocklen_t srcAddressLength = sizeof dstAddress;

	memset(buf, 0, sizeof buf);
	memset(check, 0, sizeof buf);
	memcpy(buf, &fileSize, sizeof fileSize);
	memcpy(buf + sizeof fileSize, fileName.c_str(), fileName.size());

	while (count --> 0) {
		if (sendto(socket, buf, int(sizeof fileSize + fileName.size()), 0, reinterpret_cast<sockaddr*>(&dstAddress), srcAddressLength) == PLATFORM_SOCKET_ERROR) {
			cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		if (recvfrom(socket, check, sizeof check, 0, reinterpret_cast<sockaddr*>(&dstAddress), &srcAddressLength) == PLATFORM_SOCKET_ERROR) {
			cerr << "recvfrom() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		if (strcmp(buf, check) != 0) {
			if (sendto(socket, "NO", int(strlen("NO")), 0, reinterpret_cast<sockaddr*>(&dstAddress), srcAddressLength) == PLATFORM_SOCKET_ERROR) {
				cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
				return false;
			}
			continue;
		} else {
			if (sendto(socket, "OK", int(strlen("OK")), 0, reinterpret_cast<sockaddr*>(&dstAddress), srcAddressLength) == PLATFORM_SOCKET_ERROR) {
				cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
				return false;
			}
			return true;
		}
	}

	return false;
}

/*
==================
SendFile
==================
*/
template<typename socketType>
static bool SendFile(ifstream &file, socketType socket, const uint64_t fileSize, sockaddr_in &dstAddress) {
	uint64_t doneSize = 0, recvSize = 0;
	char buf[g_fragmentSize], acknowlege[10];
	platformSocklen_t dstAddressLength = sizeof dstAddress;
	int skipCounter = 0;
	int sendTry = 0;
	file.read(buf, sizeof buf);

	while (doneSize != fileSize && sendTry != g_sendTryCount) {
		const int readedSize = int(file.gcount());

		if (sendto(socket, buf, readedSize, 0, reinterpret_cast<sockaddr*>(&dstAddress), dstAddressLength) == PLATFORM_SOCKET_ERROR) {
			cerr << "sendto() error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
			return false;
		}

		memset(acknowlege, 0, sizeof acknowlege);
		recvfrom(socket, acknowlege, sizeof acknowlege, 0, reinterpret_cast<sockaddr*>(&dstAddress), &dstAddressLength);

		if (!strcmp(acknowlege, "OK")) {
			doneSize += readedSize;
			sendTry = 0;
			if (++skipCounter == 10) {
				skipCounter = 0;
				cout << "\rSend file... " << (float(doneSize) / float(fileSize)) * 100.0f << "%             ";
				cout.flush();
			}
			file.read(buf, sizeof buf);		//on success send next pice of data
		} else {
			cout << "\rNo answer, retry #" << sendTry + 1 << "..." << endl;
			cout.flush();
			sendTry++;
		}
	}

	return true;
}

/*
==================
main
==================
*/
int main(void) {
	STARTUP();

	auto serverSocket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
	if (serverSocket == PLATFORM_SOCKET_ERROR) {
		cerr << "Can't create socket. Error: " << PLATFORM_GET_ERROR << " at line " << __LINE__ << endl;
		CLEANUP();
		return 1;
	}

#ifdef _WIN32
	DWORD timeout = chrono::duration_cast<chrono::milliseconds>(g_fragmentTimeout).count();
	if (setsockopt(serverSocket, SOL_SOCKET, SO_RCVTIMEO, reinterpret_cast<const char*>(&timeout), sizeof timeout)) {
		cerr << "setsockopt() error:  " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}
#elif defined(__linux__)
	timeval tv;
	tv.tv_sec = 0;
	tv.tv_usec = chrono::duration_cast<chrono::microseconds>(g_fragmentTimeout).count();
	if (setsockopt(serverSocket, SOL_SOCKET, SO_RCVTIMEO, reinterpret_cast<const char*>(&tv), sizeof tv)) {
		cerr << "setsockopt() error:  " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}
#else
#error Unsupported Platform!
#endif

	cout << "Server address:port > ";

	union {
		uint8_t bytes[4];
		in_addr addr;
	} ipAddr;

	int temp;
	char temp2;

	cin >> temp >> temp2;		//also skip dot symbol
	ipAddr.bytes[3] = temp;
	cin >> temp >> temp2;
	ipAddr.bytes[2] = temp;
	cin >> temp >> temp2;
	ipAddr.bytes[1] = temp;
	cin >> temp >> temp2;		//skip colon symbol
	ipAddr.bytes[0] = temp;

	uint16_t port;
	cin >> port;

	sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(port);
	addr.sin_addr.s_addr = htonl(ipAddr.addr.s_addr);

	string fileName;
	cout << "File name > ";
	cin >> fileName;

	ifstream file(fileName, ios::binary);
	if (!file) {
		cerr << "Can't open file: " << fileName << endl;
		CLOSE_SOCKET(serverSocket);
		CLEANUP();
		return 1;
	}

	file.seekg(0, ios::end);
	const uint64_t fileSize = file.tellg();
	file.seekg(0);

	bool status = SendHeader(fileName, fileSize, serverSocket, addr);
	if (status) {
		status = SendFile(file, serverSocket, fileSize, addr);
	} else {
		cerr << "Failed to send header!" << endl;
	}

	if (status) {
		cout << endl << "Done!" << endl;
	} else {
		cerr << endl << "Fail!" << endl;
	}

	CLOSE_SOCKET(serverSocket);
	CLEANUP();

	return status ? 0 : 1;
}
