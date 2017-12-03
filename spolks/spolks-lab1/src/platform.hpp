#pragma once

#ifdef _WIN32

#include <WinSock2.h>

#define STARTUP() \
	WORD sockVer = MAKEWORD(2, 2); \
	WSADATA wsaData; \
	if (WSAStartup(sockVer, &wsaData)) { \
		cout << "Can't initialize WinSock! Error: " << WSAGetLastError() << endl; \
		return 1; \
	}

#define CLEANUP() \
	WSACleanup()

#define PLATFORM_GET_ERROR			WSAGetLastError()

#define PLATFORM_INVALID_SOCKET		INVALID_SOCKET

#define PLATFORM_SOCKET_ERROR		SOCKET_ERROR

#define CLOSE_SOCKET(...)			closesocket(__VA_ARGS__)

using platformSocklen_t = int;

const auto g_workerModuleName = "tcp-server-parallel-worker.exe";

#elif defined (__linux__) 

#include <unistd.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <cerrno>

#define STARTUP()

#define CLEANUP()

#define PLATFORM_GET_ERROR			strerror(errno)

#define PLATFORM_INVALID_SOCKET		-1

#define PLATFORM_SOCKET_ERROR		-1

#define CLOSE_SOCKET(...)			close(__VA_ARGS__)

using platformSocklen_t = socklen_t;

const auto g_workerModuleName = "tcp-server-parallel-worker";

#else
#error Unsupported Platform!
#endif
