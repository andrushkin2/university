// keyboardLights.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <unistd.h>

using namespace std;

//  declarations
int enablePermissions(bool);
void runDelayInSeconds(double);
int main();

// variables declaration
int isNeedRepeatOperation = 1;   // repeat operation flag
int isCanExit = 0;   // exit flag
int isLightsCanShine = 0; // lights turn ON/OFF flag


int main()
{
    //	enable permissions for ports
	if (enablePermissions(true)) {
		return 1;
	}
    while(!isCanExit)
    {
        //code for///
        runDelayInSeconds(0.001);
    }
    //	disable permissions for ports
	if (enablePermissions(false)) {
		return 1;
	}
    return 0;
}

void runDelayInSeconds(double second) 
{
	usleep(second * 1000000);
}

int enablePermissions(bool enable)
{
	int value = enable ? 1 : 0;
	if(ioperm(0x0060, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0064, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0080, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	return 0;
}