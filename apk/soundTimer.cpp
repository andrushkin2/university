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
	int a7 = 698;
} note;

struct notesTime {
	double a1 = 0.5;
	double a2 = 0.35;
	double a3 = 0.15;
	double a4 = 0.5;
	double a5 = 0.5;
	double a6 = 1.0;
	double a7 = 0.35;
} noteTime;



void runDelayInTicks(double);
void printBinary(unsigned int value);
void playSound(int, double);
int enablePermissions(bool);
void printState();
int main();

int main()
{
	//	enable permission for the ports
	if (enablePermissions(true)) {
		return 1;
	}
	/**
	*int a1 = 440;		double a1 = 0.5;	
	*int a2 = 349;		double a2 = 0.35;
	*int a3 = 523;		double a3 = 0.15;
	*int a4 = 659;		double a4 = 0.5;
	*int a5 = 415;		double a5 = 0.5;
	*int a6 = 440;		double a6 = 1.0;
	*int a7 = 698;		double a7 = 0.35;
	*/
	
	int nots[] = {
		note.a1, note.a1, note.a1, note.a2, note.a3, note.a1, note.a2, note.a3, note.a6,
		note.a4, note.a4, note.a4, note.a7, note.a3, note.a5, note.a2, note.a3, note.a6
	};
	
	double notsTime[] = {
		noteTime.a1, noteTime.a1, noteTime.a1, noteTime.a2, noteTime.a3, noteTime.a1, noteTime.a2, noteTime.a3, noteTime.a6,
		noteTime.a4, noteTime.a4, noteTime.a4, noteTime.a7, noteTime.a3, noteTime.a5, noteTime.a2, noteTime.a3, noteTime.a6
	};
	//	play music
	printf("\nStart playing\n");
	int i = 0, len = 9;
	for (i = 0; i < len; i++){
		playSound(nots[i], notsTime[i]);
	}
	printf("\nStop playing\n");
	//	print states of channels
	printState();
	//	disable permission for the ports
	printf("\n");
	if (enablePermissions(false)) {
		return 1;
	}
    return 0;
}

void printState()
{
	//	get State of channel 0
	outb_p(0xe2, 0x0043);
	printf("\nState of channel 0: ");
	printBinary((unsigned int)(inb_p(0x0040)));
	//	get State of channel 1
	outb_p(0xe4, 0x0043);
	printf("\nState of channel 1: ");
	printBinary((unsigned int)(inb_p(0x0041)));
	//	get State of channel 2
	outb_p(0xe8, 0x0043);
	printf("\nState of channel 2: ");
	printBinary((unsigned int)(inb_p(0x0042)));
}

void runDelayInTicks(double second) {
	usleep(second * 1000000);
}

void printBinary(unsigned int value)
{
	//	convert 
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

void playSound(int freq, double delayTime) {
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
	//	pause between sound
	runDelayInTicks(0.1);
}   

int enablePermissions(bool enable)
{
	int value = enable ? 1 : 0;
	if(ioperm(0x0040, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0041, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0042, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x0043, 1, value)) {
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