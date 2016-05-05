
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

void getch_init() {
    termios settings;

    tcgetattr(STDIN_FILENO, &stored);   //Получаем текущие настройки терминала
    settings = stored;      //Копируем их
    //settings.c_lflag &= ~(ICANON|ECHO);     //Отключаем канонический режим и эхо
    settings.c_cc[VTIME] = 0;       //Таймаут ожидания ввода - без ожидания
    settings.c_cc[VMIN] = 1;        //Размер буфера для ожиания - 1 символ
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //Применяем новые настройки
}

void getch_fin() {
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);      //Восстанавливаем настройки терминала
}

int msCounter = 0;

//void interrupt far (*oldInt70h)(void);    // Указатель на старый 
 // обработчик прерывания
void newInt70handler(int);

void freeze(void);
void unfreeze(void);
int BCDToInteger(int bcd);
unsigned char IntToBCD(int value);
void getTime(void);
void setTime(void);
void showValue(unsigned char regNum);
void delay_time(void);
void wait(void);
int enablePermissions(bool enable);
int main();
// variables declaration
struct sigaction act, oldAct;





int main()
{
    //	enable permissions for ports
	if (enablePermissions(true)) {
		return 1;
	}
    getch_init();
    char c, value;
    printf("Press:\n'1' - Show time\n'2' - Set time\n'3' - Delay time\n'Esc' - quit\n\n");
    while(c != 27)
    {
        c = getchar();
        switch(c)
        {
            case '1': 
                printf("%c", c);
                getTime();
                break;
            case '2': 
                setTime();
                break;
            case '3': 
                delay_time();
                break;
            default: break;
        }
    }
    getch_fin();
    cout << "exit";
    return 0;
}

void wait(void)
{
    do    // Ожидание, пока часы заняты
    {
        outb_p(0x0A, 0x70);
    } while( inb_p(0x71) & 0x80 ); // 0x80 = 10000000, 
// пока 7-й бит - 1, часы заняты
}

void getTime(void)
{
    
    unsigned char value;
    wait();
   
    outb_p(0x04, 0x70); // Текущий час
    value = inb_p(0x71); printf("%d:",BCDToInteger(value)); wait();
    outb_p(0x02, 0x70); // Текущая минута
    value = inb_p(0x71); printf("%d:",BCDToInteger(value)); wait();
    outb_p(0x00, 0x70); // Текущая секунда
    value = inb_p(0x71); printf("%d   ",BCDToInteger(value)); wait();
    outb_p(0x07, 0x70); // Текущий день месяца
    value = inb_p(0x71); printf("%d.",BCDToInteger(value)); wait();
    outb_p(0x08, 0x70); // Текущий месяц
    value = inb_p(0x71); printf("%d.",BCDToInteger(value)); wait();
    outb_p(0x09, 0x70); // Текущий год
    value = inb_p(0x71); printf("%d   ",BCDToInteger(value)); wait();
    outb_p(0x06, 0x70); // Текущий день недели
    value = inb_p(0x71);
    switch(BCDToInteger(value))
    {
        case 2: printf("Monday\n"); break;
        case 3: printf("Tuesday\n"); break;
        case 4: printf("Wednesday\n"); break;
        case 5: printf("Thursday\n"); break;
        case 6: printf("Friday\n"); break;
        case 7: printf("Saturday\n"); break;
        case 1: printf("Sunday\n"); break;
        default: printf("Day of week is not set\n"); break;
    }
}

void setTime(void)
{
    int value;
    freeze();     // Запретить обновление часов
    
    printf("Enter hour: "); scanf("%d", &value);
    outb_p(0x04, 0x70);
    outb_p(IntToBCD(value), 0x71); // Значение в порт 71h в BCD-формате
    printf("Enter minute: "); scanf("%d", &value);
    outb_p(0x02, 0x70);
    outb_p(IntToBCD(value), 0x71);
    printf("Enter second: "); scanf("%d", &value);
    outb_p(0x00, 0x70);
    outb_p(IntToBCD(value), 0x71);
    printf("Enter week day number: "); scanf("%d", &value);
    outb_p(0x06, 0x70);
    outb_p(IntToBCD(value), 0x71);
    printf("Enter day of month: "); scanf("%d", &value);
    outb_p(0x07, 0x70);
    outb_p(IntToBCD(value), 0x71);
    printf("Enter mounth: "); scanf("%d", &value);
    outb_p(0x08, 0x70);
    outb_p(IntToBCD(value), 0x71);
    printf("Enter year: "); scanf("%d", &value);
    outb_p(0x09, 0x70);
    outb_p(IntToBCD(value), 0x71);
    unfreeze(); // Разрешить обновление часов
}

// Запретить обновление часов
void freeze(void)
{
    unsigned char value;
    wait();  // Ожидание, пока часы заняты

    outb_p(0x0B, 0x70);
    value = inb_p(0x71); // читаем регистр состояния B
    value|=0x80;  // Заменяем 7-й бит на 1 для запрещения обновления часов
    outb_p(0x0B, 0x70);
    outb_p(value, 0x71); // Записываем новое значение в регистр B, 
  // обновление часов запрещено
}

void unfreeze(void)
{
    unsigned char value;
    wait();  // Ожидание, пока часы заняты
    outb_p(0x0B, 0x70);
    value = inb_p(0x71);  // читаем регистр состояния B
    value-=0x80;        // Заменяем 7-й бит на 0 
// для разрешения обновления часов
    outb_p(0x0B, 0x70);
    outb_p(value, 0x71); // Записываем новое значение в регистр B, 
  // обновление часов разрешено
}

void newInt70handler(int exitCode)
{
    msCounter++;     // Счётчик милисекунд
    outb_p(0x0C, 0x70); // Если регистр C не будет прочитан после IRQ 8,
    inb_p(0x71);       // тогда прерывание не случится снова
    outb_p(0x20, 0x20); // Посылаем контроллеру прерываний (master) 
// сигнал EOI (end of interrupt)
    outb_p(0x20, 0xA0); // Посылаем второму контроллеру прерываний (slave) 
// сигнал EOI (end of interrupt)
}

void delay_time(void)
{
    unsigned long delayPeriod;
    unsigned char value;
    //disable();    // Запретить прерывания
    // install signal handler
    //act.sa_handler = newInt70handler;
    //sigemptyset(&act.sa_mask);
    //act.sa_flags = 0;
    //if (sigaction(SIGRTMIN, &act, &oldAct) == -1){
        //perror("sigaction error");
        //return;
    //};
    //oldInt70h = getvect(0x70);
    //setvect(0x70, newInt70handler);
    //enable();     // Разрешить прерывания

    printf("Enter delay time in milliseconds: ");
    scanf("%ld", &delayPeriod);
    printf("\nBefore delay: ");
    getTime();
    printf("\nDelaying ...");
    freeze();
    // Размаскирование линии сигнала запроса от ЧРВ
    //value = inb_p(0xA1);
    //outb_p(value & 0xFE, 0xA1);// 0xFE = 11111110, бит 0 в 0, 
  // чтобы разрешить прерывания от ЧРВ

    // Включение периодического прерывания
    //outb_p(0x0B, 0x70);  // Выбираем регистр B
    //value = inb_p(0x0B); // Читаем содержимое регистра B

    //outb_p(0x0B, 0x70);  // Выбираем регистр B
    //outb_p(value|0x40, 0x71); // 0x40 = 01000000, 
 // 6-й бит регистра B устанавливаем в 1

    //msCounter = 0;
    //while(msCounter != delayPeriod); // Задержка на заданное 
  // кол-во миллисекунд
	usleep(delayPeriod * 1000);
    printf("\nEnd delay of %d ms\n", msCounter);
    
    // restore old signal handler
    //sigaction(SIGRTMIN, &oldAct, 0);
    //setvect(0x70, oldInt70h); // Восстанавливаем старый обработчик
    unfreeze();
    printf("\nBefore delay: ");
    getTime();
}

int BCDToInteger (int bcd)
{
    return bcd % 16 + bcd / 16 * 10;
}

unsigned char IntToBCD (int value)
{
    return (unsigned char)((value/10)<<4)|(value%10);
}

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