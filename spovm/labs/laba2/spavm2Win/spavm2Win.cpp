// spavm2Win.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <Windows.h>
#include <conio.h>
#include <string>
#include <iostream>
#include <vector>

using namespace std;

#define bzero(a) memset(a,0,sizeof(a))

string strings[10] = {
	"First process", "Second process", "Third process", "Fouth process", "Fifth process",
	"Sixth process", "Seventh process", "Eighth process", "Ninth process", "Tenth process"
};

const int MAX_AMOUNT = 10;

PROCESS_INFORMATION createNewProcess(char*, char*, HANDLE);
void initProcessWithPath(char*);
void printProcessById(char*, char*, int);

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
		printProcessById(argv[0], argv[1], atoi(argv[2]));
	}

	return;
}

void initProcessWithPath(char* path){
	char	enteredSymbol = 0,
			eventId[30];

	char buf[1024];// input message


	HANDLE newstdout,read_stdout;
	SECURITY_ATTRIBUTES sa;
	sa.lpSecurityDescriptor = NULL;
	sa.nLength = sizeof(SECURITY_ATTRIBUTES);
	sa.bInheritHandle = true;       //разрешаем наследование дескрипторов
	 if (!CreatePipe(&read_stdout, &newstdout, &sa, 0)) //создаем пайп для stdout
	  {
		cout << "\tCannot create a pipe :(\n" << endl;
		system("pause");
		return;
	  }

	string	errorText = "Error on closing hanlde: ";
	string message;

	int		currentNum = 0;


	vector<HANDLE> closeEvents;
	vector<HANDLE> printEvents;

	PROCESS_INFORMATION processInfo[MAX_AMOUNT];

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
					processInfo[closeEvents.size() - 1] = createNewProcess(path, eventId, newstdout);
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
						currentNum = -1;			
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
		
		if (printEvents.size() > 0 && (currentNum == -1 || (WaitForSingleObject(printEvents[currentNum], 1) == WAIT_TIMEOUT))){
			DWORD NumberOfBytesRead;
			if (currentNum >= (printEvents.size() - 1)){
				currentNum = 0;
			} else {
				currentNum++;
			}

			SetEvent(printEvents[currentNum]);

			unsigned long bread;   //read butes
			unsigned long avail;   //total bytes
			PeekNamedPipe(read_stdout,buf,1023,&bread,&avail,NULL);

			// if data for reading exists
			if (bread != 0)
			{
			  bzero(buf);
			  if (avail > 1023)
			  {
				while (bread >= 1023)
				{
				  ReadFile(read_stdout, buf, 1023, &bread , NULL);  //read from pipe
				  printf("%s",buf);
				  bzero(buf);
				}
			  } else {
				ReadFile(read_stdout, buf, 1023, &bread, NULL);		//read from pipe
				printf("%s",buf);
			  }
			}
		}
	}
}


PROCESS_INFORMATION createNewProcess(char* path, char* commandLine, HANDLE newstdout){
	STARTUPINFO si;
	ZeroMemory(&si, sizeof(si));
	GetStartupInfo(&si); 
	si.dwFlags = STARTF_USESTDHANDLES|STARTF_USESHOWWINDOW;
	si.wShowWindow = SW_HIDE;
	si.hStdOutput = newstdout;
	si.hStdError = newstdout;   //set descriptiors for std:out 
	si.cb = sizeof(si);
	
	PROCESS_INFORMATION procInfo;
	ZeroMemory(&procInfo, sizeof(procInfo));
	
	if (!CreateProcess((LPCSTR)path, (LPSTR)commandLine, NULL, NULL, true, CREATE_NEW_CONSOLE, NULL, NULL, &si, &procInfo)){
		cout << "Error on creating a new process :(\t" << GetLastError() << endl;
	}
	return procInfo;
}

void printProcessById(char* processNumber, char* printName, int id){
	char eventId[30];
	int i;
	char buffer[100];				 // input message
	int bufferSize = sizeof(buffer); 
	string message;
	
	HANDLE closeEvent = OpenEvent(EVENT_ALL_ACCESS, false, processNumber);
	HANDLE printEvent = OpenEvent(EVENT_ALL_ACCESS, false, printName);
	
	HANDLE events[2]= {printEvent, closeEvent};
	while(1){
		message.clear();
		DWORD NumberOfBytesWritten;
		int index = WaitForMultipleObjects(2, events, FALSE, INFINITE) - WAIT_OBJECT_0; 
		if (index == 1){
			CloseHandle(closeEvent);
			ResetEvent(printEvent);
			CloseHandle(printEvent);
			break;
		}

		message = strings[id - 1];
		int size = message.size();
		message.copy(buffer, bufferSize, 0);
		for (int i = 0; i < size; i++){
			cout << buffer[i];
			Sleep(100);
		}
		cout << endl;
		ResetEvent(printEvent);
	}
	return;
}
