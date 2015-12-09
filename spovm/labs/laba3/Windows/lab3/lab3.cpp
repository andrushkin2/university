#include <stdio.h>
#include <windows.h>
#include <conio.h>
#include <time.h>
#include <iostream>
#include <string>

using namespace std;

void parent(char* path);
void child();



int main(int argc, char* argv[])
{
	if (argc == 1){
		parent(argv[0]);
	} else {
		child();
	}
}


void parent(char* path)
{
	char buffer[100];				 // input message
	int bufferSize = sizeof(buffer); 
	
	//get info about new process
	STARTUPINFO si;
	ZeroMemory( &si, sizeof(si) );
	si.cb = sizeof(si);
	PROCESS_INFORMATION childProcessInfo;
	ZeroMemory(&childProcessInfo, sizeof(childProcessInfo));

	HANDLE printPipe;
	HANDLE Semaphores[3];	

	string message;

	Semaphores[0] = CreateSemaphore(NULL, 0 , 1, "printSemaphore");      		// Semaphore, start printing event
	Semaphores[1] = CreateSemaphore(NULL, 0 , 1, "endPrintSemaphore");      	// Semaphore, printing end event
	Semaphores[2] = CreateSemaphore(NULL, 0 , 1, "exitSemaphore");				// Semaphore, exit event

	cout << "\tServer process\n\n";

	printPipe = CreateNamedPipe("\\\\.\\pipe\\MyPipe", PIPE_ACCESS_OUTBOUND, PIPE_TYPE_MESSAGE | PIPE_WAIT,PIPE_UNLIMITED_INSTANCES ,0 , 0, INFINITE, (LPSECURITY_ATTRIBUTES)NULL);
	if (!printPipe){
		cout << "\tCannot create a pipe :(\n";
		system("pause");
		return;
	}

	if (!CreateProcess(path, " 2", NULL, NULL, FALSE, CREATE_NEW_CONSOLE, NULL, NULL, &si, &childProcessInfo)){
		cout << "\tCannot create a child process :(\n";
		system("pause");
		return;
	}

	if(!ConnectNamedPipe(printPipe, (LPOVERLAPPED)NULL)){
		cout<<"\tConnection failure :(\n";
		system("pause");
		return;
	}
	while(1)
	{				
		DWORD NumberOfBytesWritten;

		cout << "\nEnter message:\n";
		cin.clear();
		getline(cin, message);


		if(message == "quit")
		{
			ReleaseSemaphore(Semaphores[2], 1, NULL);  // set for exit
			WaitForSingleObject(childProcessInfo.hProcess, INFINITE);
			break;
		}

		ReleaseSemaphore(Semaphores[0], 1, NULL);   // set printSemaphore as ready to print
		//send size of message
		int size = message.size();
		WriteFile(printPipe, &size, sizeof(size), &NumberOfBytesWritten, (LPOVERLAPPED)NULL);
		//send message
		message.copy(buffer, bufferSize, 0);
		if( !WriteFile(printPipe, buffer, bufferSize, &NumberOfBytesWritten, (LPOVERLAPPED)NULL)){ 
			cout << "Cannot write to pipe :(\n";
		}
		// wait for endPrintSemaphore get rights
		WaitForSingleObject(Semaphores[1], INFINITE);
	}			

	CloseHandle(printPipe);
	CloseHandle(Semaphores[0]);
	CloseHandle(Semaphores[1]);
	cout << "\n\n";
	system("pause");
	return;
}

void child()
{
	cout<<"\tChild process\n\n";

	char buffer[100];				 // input message
	int bufferSize = sizeof(buffer); 
	string message;
	bool successFlag;
	
	HANDLE Semaphores[3];	
	Semaphores[0] = OpenSemaphore(SEMAPHORE_ALL_ACCESS, TRUE, "printSemaphore");
	Semaphores[1] = OpenSemaphore(SEMAPHORE_ALL_ACCESS, TRUE, "endPrintSemaphore");
	Semaphores[2] = OpenSemaphore(SEMAPHORE_ALL_ACCESS, TRUE, "exitSemaphore");

	HANDLE printPipe = CreateFile("\\\\.\\pipe\\MyPipe", GENERIC_READ, FILE_SHARE_WRITE, NULL, OPEN_EXISTING, 0, NULL);
	if(!printPipe){
		cout << "\tCannot create a pipe :(\n";
	}

	while(1)
	{				
		bool successFlag = TRUE;
		DWORD NumberOfBytesRead;
		message.clear();
		//get enabled semaphore index
		int index = WaitForMultipleObjects(3, Semaphores, FALSE, INFINITE) - WAIT_OBJECT_0; 
		//if exit semaphore
		if (index == 2){
			break;	
		}	
		
		int size;
		if(!ReadFile(printPipe, &size, sizeof(size), &NumberOfBytesRead, NULL)){
			break;
		}			

		successFlag = ReadFile(printPipe, buffer, bufferSize, &NumberOfBytesRead, NULL);
		if(!successFlag) {
			break;
		}
		message.append(buffer, bufferSize); //add to message read buffer

		message.resize(size);
		for(int i = 0; i < size; i++)
		{
			cout << buffer[i];
			Sleep(100);
		}
		cout << endl;

		ReleaseSemaphore(Semaphores[1], 1, NULL); //set endPrintSemaphore as true
	}
	CloseHandle(printPipe);
	CloseHandle(Semaphores[0]);
	CloseHandle(Semaphores[1]);
	return;
}