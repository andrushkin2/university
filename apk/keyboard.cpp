#include <iostream>
#include <sys/io.h>
#include <stdio.h>
#include <termios.h>
#include <unistd.h>

int enablePermissions(bool);
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

using namespace std;

int main() {
    unsigned char _0x0061_port;
    if (enablePermissions(true)) {
		return 1;
	}

    getch_init();

    outb_p(0b10110110, 0x0043);
    outb_p(0xA9, 0x0042);
    outb_p(0x04, 0x0042);
    _0x0061_port = inb_p(0x0061);
    _0x0061_port |= 0x03;
    outb_p(_0x0061_port, 0x0061);

    getchar();
    getch_fin();

    _0x0061_port = inb_p(0x0061);
    _0x0061_port &= 0xFC;
    outb_p(_0x0061_port, 0x0061);
    if (enablePermissions(false)) {
		return 1;
	}
    return 0;
}

int enablePermissions(bool enable)
{
	int value = enable ? 1 : 0;
	if(ioperm(0x0042, 2, value)) {
        perror("Error getting access to timer ports");
        return 1;
    }
    if(ioperm(0x0061, 1, value)) {
        perror("Error getting access to 55 controller");
        return 1;
    }
    if(ioperm(0x0080, 1, value)) {
        perror("Error getting access to 80 port");
        return 1;
    }
	return 0;
}