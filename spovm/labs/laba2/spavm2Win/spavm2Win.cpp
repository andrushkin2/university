// spavm2Win.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <Windows.h>
#include <conio.h>
#include <string>
#include <iostream>
#include <vector>

using namespace std;

char strings[10][30] = {
	{"First process"}, {"Second process"}, {"Third process"}, {"Fouth process"}, {"Fifth process"},
	{"Sixth process"}, {"Seventh process"}, {"Eighth process"}, {"Ninth process"}, {"Tenth process"}
};

const int MAX_AMOUNT = 10;

PROCESS_INFORMATION createNewProcess(char*, char*);
void initProcessWithPath(char*);
void printProcessById(int);

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
	if(argc == 2){
		printProcessById(atoi(argv[1]));
	} else {
		initProcessWithPath(argv[0]);
	}
	return;
}

void initProcessWithPath(char* path){
	char	enteredSymbol = 0,
			eventId[30];

	string	errorText = "Error on closing hanlde: ";

	int		currentNum = 0;

	bool	flag = false;

	vector<HANDLE> closeEvents;
	vector<HANDLE> printEvents;

	PROCESS_INFORMATION processInfo[MAX_AMOUNT];

	//PROCESS_INFORMATION processInfo[MAX_AMOUNT];

	while(1){
		Sleep(1);
		enteredSymbol = getSymbol();

		switch(enteredSymbol){
			case '+':{
				if(closeEvents.size() < MAX_AMOUNT){
					sprintf(eventId, "%d", closeEvents.size() + 1);
					//set a new event with non active state with autoreset
					closeEvents.push_back(CreateEvent(NULL, false, false, eventId));
					
					sprintf(eventId, "%dp", printEvents.size() + 1);
					//manually reset event	
					printEvents.push_back(CreateEvent(NULL, true, false, eventId));
					
					sprintf(eventId, "%d", closeEvents.size());
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
		
		if (printEvents.size() > 0 && WaitForSingleObject(printEvents[currentNum], 1) == WAIT_TIMEOUT){
			if (currentNum >= (printEvents.size() - 1)){
				currentNum = 0;
			} else {
				currentNum++;
			}
			flag = false;
			SetEvent(printEvents[currentNum]);
		}
	}
}


PROCESS_INFORMATION createNewProcess(char* path, char* commandLine){
	STARTUPINFO si;
	ZeroMemory(&si, sizeof(si));
	si.cb = sizeof(si);
	
	PROCESS_INFORMATION procInfo;
	ZeroMemory(&procInfo, sizeof(procInfo));
	
	if (!CreateProcess(path, commandLine, NULL, NULL, false, NULL, NULL, NULL, &si, &procInfo)){
		cout << "Error on creating a new process :(\t" << GetLastError() << endl;
	}
	return procInfo;
}

void printProcessById(int processNumber){
	char eventId[30];
	
	int i;
	
	sprintf(eventId, "%d", processNumber);
	HANDLE closeEvent = OpenEvent(EVENT_ALL_ACCESS, false, eventId);
	
	sprintf(eventId, "%dp", processNumber);
	HANDLE printEvent = OpenEvent(EVENT_ALL_ACCESS, false, eventId);
	
	while(1){
		if (WaitForSingleObject(printEvent, 1) == WAIT_OBJECT_0){
			char* text = strings[processNumber - 1];
			int length = strlen(text);
			for (i = 0; i < length; i++){
				if (WaitForSingleObject(closeEvent, 0) == WAIT_OBJECT_0){
					CloseHandle(closeEvent);
					CloseHandle(printEvent);
					return;
				}
				printf("%c", text[i]);
				//cout << text[i];
				Sleep(1);			
			}
			ResetEvent(printEvent);
		}
		if(WaitForSingleObject(closeEvent, 0) == WAIT_OBJECT_0){
			CloseHandle(closeEvent);
			CloseHandle(printEvent);
			return;
		}
	}
	return;
}
