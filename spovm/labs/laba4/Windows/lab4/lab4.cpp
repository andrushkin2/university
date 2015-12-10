#include <windows.h>
#include <conio.h>
#include <iostream>
#include <vector>
#include <stack>
#include <process.h>

#define MAX_COUNT 10

using namespace std;

unsigned int __stdcall  threadCallFunc(void* arg);
void exitLastThread();

char strings[10][30] = {
	{"1) First thread"}, {"2) Second thread"}, {"3) Third thread"}, {"4) Fourth thread"}, {"5) Fifth thread"}, 
	{"6) Sixth thread"}, {"7) Seventh thread"}, {"8) Eighth thread"}, {"9) Ninth thread"}, {"10) Tenth thread"}
};

CRITICAL_SECTION critSection;

stack<HANDLE> threads;
stack<HANDLE> closingThreads;
vector<bool*> quitFlags;

struct threadArg
{
	bool* quitFlag;
	int num;
};


void main()
{
	InitializeCriticalSection(&critSection);
	while(1)
	{
		switch(_getch())
		{
			case '+':
				if(threads.size() < MAX_COUNT) {
					quitFlags.push_back(new bool(false));		//create a new exit flag
					//complete args for a new thread
					threadArg* arg = new threadArg();
					(*arg).num = threads.size();              // add number of thread
					(*arg).quitFlag = quitFlags.back();		  // set link for exit flag
					
					//create a thread and push it to array of threads
					HANDLE thread = (HANDLE) _beginthreadex(NULL, 0, threadCallFunc, (void*)(arg), 0, NULL);
					threads.push(thread);	
				}
				break;
			case '-':
				if(threads.size() > 0){
					exitLastThread();
				}
				break;
			case 'q':
				while(threads.size() > 0){
					exitLastThread();
				}	
				while(closingThreads.size() > 0)
				{
					WaitForSingleObject(closingThreads.top(), INFINITE);
					closingThreads.pop();
				}
				DeleteCriticalSection(&critSection);
				printf("\n\n\t");
				system("pause");
				return;
			default:
				break;
		}
	}
}
void exitLastThread(){
	closingThreads.push(threads.top()); // add closing thread to stack
	*(quitFlags.back()) = true;   // set exit flag as true to stop printing
	quitFlags.pop_back();         // remove exit flag from stack
	threads.pop();				  // remove current thread from stack
}

unsigned int __stdcall  threadCallFunc(void* arg)
{
//	Sleep(1000); // для проверки на ошибки

	bool *qFlag = (*(threadArg*)arg).quitFlag;   // exit flag
	int threadNumber = (*(threadArg*)arg).num;   // trhead number
	delete arg;

	while(1)
	{
		if(*qFlag) {
			break;	
		}

		EnterCriticalSection(&critSection);
		for(int i = 0; i < strlen(strings[threadNumber]); i++)
		{
			if(*qFlag){
				break;
			}
			cout << strings[threadNumber][i];
			Sleep(50);
		}
		cout << endl;
		LeaveCriticalSection(&critSection);

		Sleep(1);
	}

	delete qFlag;
	return 0;
}