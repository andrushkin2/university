// keyboardLights.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <termios.h>
#include <unistd.h>

using namespace std;

termios stored;

void getch_init() {
    termios settings;

    tcgetattr(STDIN_FILENO, &stored);   //  get current configs fo console
    settings = stored;      //  copy confings
    settings.c_lflag &= ~(ICANON|ECHO);     //  turn off CANON and ECHO mode
    settings.c_cc[VTIME] = 2;       //  Timer for key press - 0.5 seconds
    settings.c_cc[VMIN] = 0;        //  Size of wating buffer - 0 seconds
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //  Set new options
}

void getch_fin() {
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);      //  Restore an old configs
}

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
    getch_init();
    //  run lights show until 'e' key selected
    do{
        lightShow();
    }
    while(getchar() != 'e');
    getch_fin();
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
    runDelayInSeconds(0.1);
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