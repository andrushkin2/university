// soundTimer.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <unistd.h>

using namespace std;

struct notes {
	int a1 = 440;
	int a2 = 349;
	int a3 = 523;
	int a4 = 659;
	int a5 = 415;
	int a6 = 440;
	int a7 = 493;
} note;

struct notesTime {
	double a1 = 0.5;
	double a2 = 0.35;
	double a3 = 0.15;
	double a4 = 0.1;
	double a5 = 0.1;
	double a6 = 0.1;
	double a7 = 0.1;
} noteTime;



void runDelayInTicks(double);
void printBinary(unsigned int value);
void playSound(int, double, double);
int enablePermissions(bool);
void printState();
int main();

int main()
{
	if (enablePermissions(true)) {
		return 1;
	}
	/**
	int a1 = 440;
	int a2 = 349;
	int a3 = 523;
	int a4 = 659;
	int a5 = 415;
	int a6 = 440;
	int a7 = 493;
	*/
	
	int nots[] = {
		note.a1, note.a1, note.a1, note.a2, note.a3, note.a1, note.a2, note.a3, note.a1
	};
	
	double notsTime[] = {
		noteTime.a1, noteTime.a1, noteTime.a1, noteTime.a2, noteTime.a3, noteTime.a1, noteTime.a2, noteTime.a3, noteTime.a1
	};
	
	double notsTimeDelay[] = {
		0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1
	};
	
	printf("\n\n\tStart play\n");
	int i = 0, len = 9;
	for (i = 0; i < len; i++){
		playSound(nots[i], notsTime[i], notsTimeDelay[i]);
	}
	printf("\n\n\tStop play\n");	
	printState();
	
	if (enablePermissions(false)) {
		return 1;
	}
	printf("\n\n\tPress any key...");
    return 0;
}

void printState()
{
	outb_p(0xe2, 0x0043);
	runDelayInTicks(0.1);
	printf("\nState of channel 0: ");
	printBinary((unsigned int)(inb_p(0x0040)));
	outb_p(0xe4, 0x0043);
	printf("\nState of channel 1: ");
	printBinary((unsigned int)(inb_p(0x0041)));
	outb_p(0xe8, 0x0043);
	printf("\nState of channel 2: ");
	printBinary((unsigned int)(inb_p(0x0042)));
}

void runDelayInTicks(double steps) {
	usleep(steps * 1000000);
}

void printBinary(unsigned int value)
{
	string res = "";
	while (value){
		if (value & 1){
			res += "1";
		}
		else {
			res += "0";
		}
		value >>= 1;
	}
	reverse(res.begin(), res.end());
	cout << res;
}

void playSound(int freq, double delayTime, double afterSleep = 0.1) {
	int delay;
	unsigned char _0x0061_port;
	//	set mode chanel of 2 timer
	outb_p(0xb6, 0x0043);
	//	calc delay for the timer's counter register
	delay = 1193180L / freq;
	//	set to the timer register young byte and then older byte 
	outb_p(delay & 0x00ff, 0x0042);
	outb_p((delay & 0xff00) >> 8, 0x0042);
	//	turn on speaker
	_0x0061_port = inb_p(0x0061);
    _0x0061_port |= 0x03;
    outb_p(_0x0061_port, 0x0061);
	//	start delay
	runDelayInTicks(delayTime);
	//	turn off speaker
	_0x0061_port = inb_p(0x0061);
    _0x0061_port &= 0xFC;
    outb_p(_0x0061_port, 0x0061);
	runDelayInTicks(afterSleep);
}   

int enablePermissions(bool enable)
{
	int value = enable ? 1 : 0;
	if(ioperm(0x0040, 2, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0041, 2, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0042, 2, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0043, 2, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0061, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0080, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	return 0;
}