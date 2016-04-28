// keyboardLights.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <signal.h>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <unistd.h>

using namespace std;

//  declarations
int enablePermissions(bool);
void runDelayInSeconds(double);
void actionHandler(int);
void sendToIndicator(unsigned char);
void waitAndRunMask(unsigned char);
void lightShow();
int main();

// variables declaration
struct sigaction act, oldAct;
int isNeedRepeatOperation = 1;   // repeat operation flag
int isCanExit = 0;   // exit flag
int isLightsCanShine = 0; // lights turn ON/OFF flag


int main()
{
    //	enable permissions for ports
	if (enablePermissions(true)) {
		return 1;
	}
    
    // install signal handler
    act.sa_handler = actionHandler;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (sigaction(SIGINT, &act, &oldAct) == -1){
        perror("sigaction error");
        return 1;
    };
    //  work with lights until isCanExit flag disabled 
    while(!isCanExit)
    {
        if (isLightsCanShine)
        {
            lightShow();
        }
    }
    
    // restore old signal handler
    sigaction(SIGINT, &oldAct, 0);
    
    //	disable permissions for ports
	if (enablePermissions(false)) {
		return 1;
	}
    return 0;
}

void lightShow()
{
    //   ON - Num Lock light
    sendToIndicator(0x02);
    runDelayInSeconds(0.15);
    //   ON - Caps Lock light
    sendToIndicator(0x04);
    runDelayInSeconds(0.15);
    //   ON - Num Lock and Caps Lock lights
    sendToIndicator(0x6);  
    runDelayInSeconds(0.2);
    //   OFF all lights
    sendToIndicator(0x00); 
    runDelayInSeconds(0.05);
    //   ON - Num Lock and Caps Lock lights
    sendToIndicator(0x06); 
    runDelayInSeconds(0.1);
    //   OFF all lights
    sendToIndicator(0x00); 

}

void waitAndRunMask(unsigned char mask)
{
    isNeedRepeatOperation = 1;
    //  wait until command pass
    while (isNeedRepeatOperation)
    {
        // wait for keyboard buffer enable
        while((inb_p(0x0064) & 0x02) != 0x00);
        //  send command with mask
        outb_p(mask, 0x0060);
        //  a small delay
        runDelayInSeconds(0.5);
    }
}

void sendToIndicator(unsigned char mask)
{
    //  send command to get permissions for manipulating ligths
    waitAndRunMask(0xED);
    //  send command with mask
    waitAndRunMask(mask);
}


void actionHandler(int exitCode){
    cout << "\nrun";
    unsigned char value = 0;
    //  run  old signal handler 
    oldAct.sa_handler(exitCode);
    //  get value from 60 port
    printf("\t%x", value);
    value = inb_p(0x0060);
    //  check value
    switch (value) {
        //  check is ESC clicked
        case 0x01:
            isCanExit = 1;
            break;
        //  is we should switch ON/OFF lights
        case 0x26: 
            isLightsCanShine = isLightsCanShine == 0 ? 1 : 0;
        default:
            break;
    }
    //  if command didn't pass -> we should repeat it
    isNeedRepeatOperation = (value != 0xFA && isLightsCanShine == 1) ? 1 : 0;
    //  print value of 60 port
    printf("\t%x", value);
    //  reset interrupt controller
    //outb_p(0x20, 0x20);
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