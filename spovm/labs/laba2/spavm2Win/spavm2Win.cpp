// spavm2Win.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <Windows.h>
#include <conio.h>
#include <string>
#include <iostream>
#include <vector>

using namespace std;

string strings[10] = {
	"First process", "Second process", "Third process", "Fouth process", "Fifth process",
	"Sixth process", "Seventh process", "Eighth process", "Ninth process", "Tenth process"
};

const int MAX_AMOUNT = 10;

PROCESS_INFORMATION createNewProcess(char*, char*);
void initProcessWithPath(char*);
void printProcessById(char*, char*);

int getSymbol(){
	if(_kbhit()){
		return _getch();
	}
	return -1;
}




void main(int argc, char* argv[])
{
	/**
	if child process -> printProcessById
	else -> init a parent process
	*/
	if (argc == 1){
		initProcessWithPath(argv[0]);
	} else{
		cout << "HellO!" << endl;
		
		cout << argv[0]<< argv[1]<< argv[2] << endl;
	system("pause");
		cout << argv[1] << endl;
		printProcessById(argv[1], argv[2]);
	}

	return;
}

void initProcessWithPath(char* path){
	char	enteredSymbol = 0,
			eventId[30];
	char buffer[100];				 // input message
	int bufferSize = sizeof(buffer); 

	string	errorText = "Error on closing hanlde: ";
	string message;

	int		currentNum = 0;

	bool	flag = false;

	vector<HANDLE> closeEvents;
	vector<HANDLE> printEvents;


	//create pipe
	HANDLE printPipe = CreateNamedPipe("\\\\.\\pipe\\MyPipe", PIPE_ACCESS_OUTBOUND, PIPE_TYPE_MESSAGE | PIPE_WAIT,PIPE_UNLIMITED_INSTANCES ,0 , 0, INFINITE, (LPSECURITY_ATTRIBUTES)NULL);
	if (!printPipe){
		cout << "\tCannot create a pipe :(\n";
		system("pause");
		return;
	}

	PROCESS_INFORMATION processInfo[MAX_AMOUNT];

	//PROCESS_INFORMATION processInfo[MAX_AMOUNT];

	while(1){
		Sleep(1);
		enteredSymbol = getSymbol();

		message.clear();

		switch(enteredSymbol){
			case '+':{
				if(closeEvents.size() < MAX_AMOUNT){
					int newId = closeEvents.size() + 1;
					sprintf(eventId, "%dclose", newId);
					//set a new event with non active state with autoreset
					closeEvents.push_back(CreateEvent(NULL, false, false, eventId));
					
					sprintf(eventId, "%dprint", newId);
					//manually reset event	
					printEvents.push_back(CreateEvent(NULL, true, false, eventId));
					
					sprintf(eventId, "%dclose %dprint %d", newId, newId, newId);
					// create a new process and save it process info
					processInfo[closeEvents.size() - 1] = createNewProcess(path, eventId);
				}
				break;
			}
			case '-': {
				if (closeEvents.size() > 0){
					int lastEventIndex = closeEvents.size() - 1;
					HANDLE lastHandle = closeEvents.back();
					SetEvent(lastHandle);
					WaitForSingleObject(processInfo[lastEventIndex].hProcess, INFINITE);
					if (!CloseHandle(lastHandle) || !CloseHandle(printEvents.back()) 
						|| !CloseHandle(processInfo[lastEventIndex].hProcess) || !CloseHandle(processInfo[lastEventIndex].hThread)){
							cout << errorText << GetLastError() << endl;
					}
					closeEvents.pop_back();
					printEvents.pop_back();
					
					if (currentNum >= closeEvents.size()){
						currentNum = 0;
						flag = true;						
					}
				}
				break;
			}
			case 'q':{
				if (closeEvents.size() > 0){
					while(closeEvents.size() > 0){
						int lastEventIndex = closeEvents.size() - 1;
						HANDLE lastHandle = closeEvents.back();
						SetEvent(lastHandle);
						WaitForSingleObject(processInfo[lastEventIndex].hProcess, INFINITE);
						if (!CloseHandle(lastHandle) || !CloseHandle(printEvents.back()) 
							|| !CloseHandle(processInfo[lastEventIndex].hProcess) || !CloseHandle(processInfo[lastEventIndex].hThread)){
								cout << errorText << GetLastError() << endl;
						}
						closeEvents.pop_back();
						printEvents.pop_back();
					}
					currentNum = 0;
				}
				cout << "\n\n\nPress any key...";
				_getch();
				return;
			}
		default:
			break;
		}
		
		if (printEvents.size() > 0 && WaitForSingleObject(printEvents[currentNum], 1) != WAIT_OBJECT_0){
			DWORD NumberOfBytesRead;
			if (currentNum >= (printEvents.size() - 1)){
				currentNum = 0;
			} else {
				currentNum++;
			}
			//sprintf(eventId, "%dp", currentNum);
			SetEvent(printEvents[currentNum]);
			int size;
			if(!ReadFile(printPipe, &size, sizeof(size), &NumberOfBytesRead, NULL)){
				break;
			}			
			if(!ReadFile(printPipe, buffer, bufferSize, &NumberOfBytesRead, NULL)) {
				break;
			}
			message.append(buffer, bufferSize); //add to message read buffer

			message.resize(size);
			flag = false;
		}
	}
}


PROCESS_INFORMATION createNewProcess(char* path, char* commandLine){
	STARTUPINFO si;
	ZeroMemory(&si, sizeof(si));
	si.cb = sizeof(si);
	
	PROCESS_INFORMATION procInfo;
	ZeroMemory(&procInfo, sizeof(procInfo));
	
	if (!CreateProcess((LPCSTR)path, (LPSTR)commandLine, NULL, NULL, false, CREATE_NEW_CONSOLE, NULL, NULL, &si, &procInfo)){
		cout << "Error on creating a new process :(\t" << GetLastError() << endl;
	}
	return procInfo;
}

void printProcessById(char* processNumber, char* printName){
	char eventId[30];
	cout << processNumber << endl;
	int i;
	char buffer[100];				 // input message
	int bufferSize = sizeof(buffer); 
	string message;

	HANDLE printPipe = CreateFile("\\\\.\\pipe\\MyPipe", GENERIC_WRITE, FILE_SHARE_WRITE, NULL, OPEN_EXISTING, 0, NULL);
	if(!printPipe){
		cout << "\tCannot create a pipe :(\n";
	}
	
	sprintf(eventId, "%s", processNumber);
	HANDLE closeEvent = OpenEvent(EVENT_ALL_ACCESS, false, processNumber);
	cout << eventId << endl;
	sprintf(eventId, "%sp", eventId);
	cout << eventId << endl;
	HANDLE printEvent = OpenEvent(EVENT_ALL_ACCESS, false, printName);
	
	HANDLE events[2]={printEvent, closeEvent};
	while(1){
		message.clear();
		DWORD NumberOfBytesWritten;
		int index = WaitForMultipleObjects(2, events, FALSE, INFINITE) - WAIT_OBJECT_0; 
		if (index == 1){
			cout << "close child" << endl;
			CloseHandle(closeEvent);
			CloseHandle(printEvent);
			break;
		}
		cout << "Start writing" << endl;
		message.append(processNumber);//strings[processNumber - 1];
		//send size of message
		int size = message.size();
		WriteFile(printPipe, &size, sizeof(size), &NumberOfBytesWritten, (LPOVERLAPPED)NULL);
		//send message
		message.copy(buffer, bufferSize, 0);
		if( !WriteFile(printPipe, buffer, bufferSize, &NumberOfBytesWritten, (LPOVERLAPPED)NULL)){ 
			cout << "Cannot write to pipe :(\n";
		}
		cout << "Reset print event" << endl;
		ResetEvent(printEvent);
	}
	return;
}
