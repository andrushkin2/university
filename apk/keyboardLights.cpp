// keyboardLights.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <unistd.h>

using namespace std;

//  declarations
int enablePermissions(bool);
void runDelayInSeconds(double);
void sendToIndicator(unsigned char);
void waitAndRunMask(unsigned char);
void lightShow();
int main();

//  variables declaration
int isNeedRepeatOperation = 1;   // repeat operation flag


int main()
{
    //	enable permissions for ports
	if (enablePermissions(true)) {
		return 1;
	}
    //  run lights show
    lightShow();
    //	disable permissions for ports
	if (enablePermissions(false)) {
		return 1;
	}
    return 0;
}

void lightShow()
{
    //   ON - all lights
    sendToIndicator(0x07); 
    runDelayInSeconds(0.5);
    //   ON - Num Lock light
    sendToIndicator(0x02);
    runDelayInSeconds(0.2);
    //   ON - Caps Lock light
    sendToIndicator(0x04);
    runDelayInSeconds(0.3);
    //   ON - Num Lock and Caps Lock lights
    sendToIndicator(0x6);  
    runDelayInSeconds(0.2);
    //   OFF all lights
    sendToIndicator(0x00); 
    runDelayInSeconds(0.05);
    //   ON - Num Lock and Caps Lock lights
    sendToIndicator(0x06); 
    runDelayInSeconds(0.1);
    //   ON - all lights
    sendToIndicator(0x07); 
    runDelayInSeconds(0.9);
    //   OFF all lights
    sendToIndicator(0x00); 

}

void waitAndRunMask(unsigned char mask)
{
    isNeedRepeatOperation = 1;
    //  wait until command pass
    while (isNeedRepeatOperation)
    {
        //  wait for keyboard buffer enable
        while((inb_p(0x0064) & 0x02) != 0x00);
        //  send command with mask
        outb_p(mask, 0x0060);
        isNeedRepeatOperation = 0;
        //  a small delay
        runDelayInSeconds(0.1);
    }
}

void sendToIndicator(unsigned char mask)
{
    //  send command to get permissions for manipulating ligths
    waitAndRunMask(0xED);
    //  send command with mask
    waitAndRunMask(mask);
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
    if(ioperm(0x0020, 1, value)) {
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