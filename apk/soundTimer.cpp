// soundTimer.cpp : Defines the entry point for the console application.
//

#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <termios.h>
#include <unistd.h>

using namespace std;

void runDelayInTicks(int);
void playSound(int, int);
int enablePermissions(bool);
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
	
	//getch_init();
	playSound(330, 5);
	//getchar();
	//getch_fin();
	
	if (enablePermissions(false)) {
		return 1;
	}

    return 0;
}

void runDelayInTicks(int steps) {
	usleep(steps * 1000000);
}

void playSound(int freq, int delayTime) {
	int delay, i;
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