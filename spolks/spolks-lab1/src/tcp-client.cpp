#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <cstdint>
#include "platform.hpp"


constexpr size_t g_fragmentSize = 32'768;

using namespace std;


/*
==================
main
==================
*/
int main() {
	STARTUP();

	auto clientSocket = socket(AF_INET, SOCK_STREAM, 0);
	if (clientSocket == PLATFORM_INVALID_SOCKET) {
		cout << "Can't create socket! Error: " << PLATFORM_GET_ERROR << endl;
		CLEANUP();
		return 1;
	}

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

	if (connect(clientSocket, reinterpret_cast<sockaddr*>(&addr), sizeof addr) == PLATFORM_SOCKET_ERROR) {
		cout << "Connect error: " << PLATFORM_GET_ERROR << endl;
		CLOSE_SOCKET(clientSocket);
		CLEANUP();
		return 1;
	}

	cout << "Connected to server!" << endl;

	string fileName;
	cout << "File name > ";
	cin >> fileName;

	ifstream file(fileName, ios::binary);
	if (!file) {
		cout << "Can't open file: " << fileName << endl;
		CLOSE_SOCKET(clientSocket);
		CLEANUP();
		return 1;
	}

	file.seekg(0, ios::end);
	const uint64_t fileSize = file.tellg();
	file.seekg(0);

	char buffer[g_fragmentSize];
	memset(buffer, 0, g_fragmentSize);

	//create header: file size + filename
	memcpy(buffer, &fileSize, sizeof fileSize);
	memcpy(buffer + sizeof fileSize, fileName.c_str(), fileName.size());

	send(clientSocket, buffer, sizeof fileSize + fileName.size(), 0);		//send header to server
	recv(clientSocket, buffer, g_fragmentSize, 0);							//wait for server ready
	if (buffer[0] != 'O' || buffer[1] != 'K') {
		cout << "Error during header transfer" << endl;
		CLOSE_SOCKET(clientSocket);
		CLEANUP();
		return 1;
	}

	uint64_t doneSize = 0;

	while (1) {
		file.read(buffer, g_fragmentSize);
		const int readedSize = int(file.gcount());
		doneSize += readedSize;

		cout << "\rSend file... " << (float(doneSize) / float(fileSize)) * 100.0f << "%             ";
		cout.flush();

		send(clientSocket, buffer, readedSize, 0);
		if (doneSize == fileSize) {
			break;
		}
	}

	cout << endl << "Done!" << endl;

	CLOSE_SOCKET(clientSocket);
	CLEANUP();

	return 0;
}
