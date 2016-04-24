// soundTimer.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <termios.h>
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
void playSound(int, double, double);
int enablePermissions(bool);
void printState();
int main();

termios stored;

void getch_init() {
    termios settings;

    tcgetattr(STDIN_FILENO, &stored);   //Получаем текущие настройки терминала
    settings = stored;      //Копируем их
    settings.c_lflag &= ~(ICANON|ECHO);     //Отключаем канонический режим и эхо
    settings.c_cc[VTIME] = 0;       //Таймаут ожидания ввода - без ожидания
    settings.c_cc[VMIN] = 1;        //Размер буфера для ожиания - 1 символ
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //Применяем новые настройки
}
void getch_fin() {
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);      //Восстанавливаем настройки терминала
}

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
	
	getch_init();
	int i = 0, len = 9;
	for (i = 0; i < len; i++){
		playSound(nots[i], notsTime[i], notsTimeDelay[i]);
	}	
	printState();
	getchar();
	getch_fin();
	
	if (enablePermissions(false)) {
		return 1;
	}

    return 0;
}

void printState()
{
	unsigned char values[] = {0xe2, 0xe4, 0xe8},
	int len = 3;
	for (i = 0; i < len; i++)
	{
		outp(0x43, values[i]);
        printf("\nСлово состояния канала %d: %02.2X", i + 1, inp(0x40));
	}
	outp(0x43, 0xe2);
	printf("\nСлово состояния канала: %02.2X", inp(0x40));
}

void runDelayInTicks(double steps) {
	usleep(steps * 1000000);
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
	if(ioperm(0x0042, 2, value)) {
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