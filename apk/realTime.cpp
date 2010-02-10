
#include <ctype.h>
#include <stdio.h>

#include <string.h>
#include <stdlib.h>

#include <iostream>
#include <termios.h>
#include <sys/io.h>
#include <stdio.h>
#include <signal.h>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <sys/types.h>
#include <unistd.h>

using namespace std;

termios stored;
//  set new console configs
void getchInitialization() {
    termios settings;
    tcgetattr(STDIN_FILENO, &stored);   //  get current console config
    settings = stored;                  //  copy the confings
    settings.c_cc[VTIME] = 0;           //  key press time OFF
    settings.c_cc[VMIN] = 1;            //  wait for key press count 1
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //set new configs
}
//  restore console configs
void getchRestore() {
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);
}
//  function declarations
void freezeTimeUpdate(void);
void unfreezeTimeUpdate(void);
void getTime(void);
void setTime(void);
void showValue(unsigned char);
void delayRTC(void);
void waitForTimeBusy(void);
void setValueToPort(unsigned char, int);
unsigned char intToBcdCode(int);
unsigned char getValueFromPort(unsigned char);
int bcdCodeToInt(int);
int enablePermissions(bool);
int main();

int main()
{
    //	enable permissions for ports
	if (enablePermissions(true)) {
		return 1;
	}
    getchInitialization();
    printf("Menu:\n\t1) Print time\n\t2) Set new time\n\t3) Delay for RTC\n\t4) EXIT\n\n");
    char c;
    while(c != '4')
    {
        c = getchar();
        switch(c)
        {
            case '1': 
                getTime();
                printf("Menu:\n\t1) Print time\n\t2) Set new time\n\t3) Delay for RTC\n\t4) EXIT\n\n");
                break;
            case '2': 
                setTime();
                printf("Menu:\n\t1) Print time\n\t2) Set new time\n\t3) Delay for RTC\n\t4) EXIT\n\n");
                break;
            case '3': 
                delayRTC();
                printf("Menu:\n\t1) Print time\n\t2) Set new time\n\t3) Delay for RTC\n\t4) EXIT\n\n");
                break;
            default: break;
        }
    }
    getchRestore();
    return 0;
}

void waitForTimeBusy(void)
{
    //  use polling - waiting for clock enabled
    do {
        outb_p(0x0A, 0x70);
    } while(inb_p(0x71) & 0x80); // until 7's bit = 1, clock is busy
}

unsigned char getValueFromPort(unsigned char port)
{
    //  waiting for clock enabled
    waitForTimeBusy();
    //  send command to port
    outb_p(port, 0x70);
    //  return value
    return inb_p(0x71);
}

void getTime(void)
{
    //  get current year
    printf("\n%d-", bcdCodeToInt(getValueFromPort(0x09)));
    //  get current month
    printf("%d-", bcdCodeToInt(getValueFromPort(0x08)));
    //  get current date
    printf("%d  ", bcdCodeToInt(getValueFromPort(0x07)));
    //  get current hours
    printf("%d:", bcdCodeToInt(getValueFromPort(0x04)));
    //  get current minutes
    printf("%d:", bcdCodeToInt(getValueFromPort(0x02)));
    //  get current seconds
    printf("%d  ", bcdCodeToInt(getValueFromPort(0x00)));
    //  get week day name
    switch(bcdCodeToInt(getValueFromPort(0x06)))
    {
        case 2: printf("Monday"); break;
        case 3: printf("Tuesday"); break;
        case 4: printf("Wednesday"); break;
        case 5: printf("Thursday"); break;
        case 6: printf("Friday"); break;
        case 7: printf("Saturday"); break;
        case 1: printf("Sunday"); break;
        default: break;
    }
    printf("\n");
}

void setValueToPort(unsigned char port, int value)
{
    //  send command to port
    outb_p(port, 0x70);
    //  set value to the port
    outb_p(intToBcdCode(value), 0x71);
}

void setTime(void)
{
    int value;
    //  disable time update
    freezeTimeUpdate();
    //  set year
    printf("\nEnter year: "); 
    scanf("%d", &value);
    setValueToPort(0x09, value);
    //  set month
    printf("\nEnter month(1-12): "); 
    scanf("%d", &value);
    setValueToPort(0x08, value);
    //  set date
    printf("\nEnter date: "); 
    scanf("%d", &value);
    setValueToPort(0x07, value);
    //  set hours
    printf("\nEnter hours(0-23): "); 
    scanf("%d", &value);
    setValueToPort(0x04, value);
    //  set minutes
    printf("\nEnter minutes: "); 
    scanf("%d", &value);
    setValueToPort(0x02, value);
    //  set seconds
    printf("\nEnter seconds: "); 
    scanf("%d", &value);
    setValueToPort(0x00, value);
    unfreezeTimeUpdate();
    printf("\nDone!\n");
}

//  disable time update
void freezeTimeUpdate(void)
{
    unsigned char value;
    //  wating for clock isn't busy
    waitForTimeBusy();
    outb_p(0x0B, 0x70);
    //  read register state
    value = inb_p(0x71);
    //  replace 7's bit with '1' to disable time update
    value |= 0x80;
    outb_p(0x0B, 0x70);
    //  set calculated value to the time port 
    outb_p(value, 0x71);
}
//  enable time update
void unfreezeTimeUpdate(void)
{
    unsigned char value;
    //  wating for clock isn't busy
    waitForTimeBusy();
    outb_p(0x0B, 0x70);
    //  read register state
    value = inb_p(0x71);
    //  replace 7's bit with '0' to enable time update
    value -= 0x80;
    outb_p(0x0B, 0x70);
    //  set calculated value to the time port 
    outb_p(value, 0x71);
}

void delayRTC(void)
{
    unsigned long delayInMilliseconds;
    //  get time for delay in milliseconds
    printf("Enter delay time in milliseconds: ");
    scanf("%ld", &delayInMilliseconds);
    //  print current dateTime value 
    printf("\nBefore delay: ");
    getTime();
    printf("\nDelaying ...");
    //  disable time update
    freezeTimeUpdate();
    //  run delay in milliseconds
	usleep(delayInMilliseconds * 1000);
    printf("\nEnd delay of %ld ms\n", delayInMilliseconds);
    //  enable time update
    unfreezeTimeUpdate();
    //  print current dateTime after delay
    printf("\nTime after delay: ");
    getTime();
}
//  function for converting BCD code to integer
int bcdCodeToInt (int bcdCode)
{
    return bcdCode % 16 + bcdCode / 16 * 10;
}
//  function for converting integer value to BCD code
unsigned char intToBcdCode (int value)
{
    return (unsigned char)((value / 10) << 4) | (value % 10);
}
//  function for enable/disable permissions
int enablePermissions(bool enable)
{
	int value = enable ? 1 : 0;
	if(ioperm(0x70, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
    if(ioperm(0x71, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0xA1, 1, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0xA0, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	if(ioperm(0x0B, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	if(ioperm(0x80, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	return 0;
}