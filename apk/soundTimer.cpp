// soundTimer.cpp : Defines the entry point for the console application.
//

#include <sys/io.h>
#include <stdio.h>
#include <unistd.h>
#include <termios.h>

void runDelayInTicks(int);
void playSound(int, int);
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
	if(ioperm(0x42, 2, 1)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x61, 2, 1)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	getch_init();
	playSound(330, 2);
	getchar();
	getch_fin();
	
	if(ioperm(0x42, 2, 0)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	if(ioperm(0x61, 2, 0)) {
        perror("Error getting access to timer ports");
        return 1;
    }
	
    return 0;
}

void runDelayInTicks(int steps) {
	sleep(steps);
}

void playSound(int freq, int delayTime) {
	int delay, i;
	//	set mode chanel of 2 timer
	outb_p(0x43, 0xb6);
	//	calc delay for the timer's counter register
	delay = 1193180L / freq;
	//	set to the timer register young byte and then older byte 
	outb_p(0x42, delay & 0x00ff);
	outb_p(0x42, (delay & 0xff00) >> 8);
	//	turn on speaker
	outb_p(0x61, inb_p(0x61) | 3);
	//	start delay
	runDelayInTicks(delayTime);
	//	turn off speaker
	outb_p(0x61, inb_p(0x61) & 0xfc);
}   