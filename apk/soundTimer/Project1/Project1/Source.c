// soundTimer.cpp : Defines the entry point for the console application.
//


#include <dos.h>
#include <stdio.h>
#include <conio.h>


void runDelayInTicks(int);
void tm_sound(int, int);


int main()
{
	int mary[] = {
		330, 294, 262, 294, 330, 330, 330,
		294, 294, 294, 330, 392, 392,
		330, 294, 262, 294, 330, 330, 330, 330,
		294, 294, 330, 294, 262, 0
	};

	// Массив длительностей

	int del[] = {
		5,   5,   5,   5,   5,   5,   10,
		5,   5,   10,  5,   5,   10,
		5,   5,   5,   5,   5,   5,   5,   5,
		5,   5,   5,   5,   20
	};



	int i;

	for (i = 0; mary[i] != 0; i++)
	{
		tm_sound(mary[i], del[i]);
	}

	return 0;
}

void runDelayInTicks(int steps) {
	__int16 ticks = (__int16)steps;
	_asm {
		// push SI to stack
		push si
			//read timer state
			mov  si, ticks
			mov  ah, 0
			int  1ah
			//set to BX low byte of timer state
			mov  bx, dx
			add  bx, si
			//wait unitl DX not equal BX
			runWhileLoop :
		int  1ah
			cmp  dx, bx
			jne  runWhileLoop
			//return state of SI and exit 
			pop  si
	}
}

void tm_sound(int freq, int time) {

	int cnt, i;

	// Задаем режим канала 2 таймера

	outp(0x43, 0xb6);

	// Вычисляем задержку для загрузки в
	// регистр счетчика таймера

	cnt = 1193180L / freq;

	// Загружаем регистр счетчика таймера - сначала
	// младший, затем старший байты
	outp(0x42, cnt & 0x00ff);

	outp(0x42, (cnt & 0xff00) >> 8);

	// Включаем громкоговоритель. Сигнал от
	// канала 2 таймера теперь будет проходить
	// на вход громкоговорителя.

	outp(0x61, inp(0x61) | 3);

	// Выполняем задержку.

	runDelayInTicks(time);

	// Выключаем громкоговоритель.

	outp(0x61, inp(0x61) & 0xfc);

}