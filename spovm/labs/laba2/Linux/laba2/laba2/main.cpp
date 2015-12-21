//
//  main.cpp
//  laba2
//
//  Created by Andrei Kozyakov on 21.12.15.
//  Copyright © 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <stdio.h>
#include <termios.h>
#include <unistd.h>
#include <fcntl.h>
#include <signal.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

#define max_count 20

using namespace std;

struct sigaction    workSig,
                    endSig;
int printFlag = 0,
    endFlag = 0;

void setPrint(int sig)
{
    printFlag = 1;
};

void setEnd(int sig)
{
    endFlag = 1;
};


int kbhit(void)
{
    struct termios oldt, newt;
    int ch;
    int oldf;
    
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    oldf = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, oldf | O_NONBLOCK);
    
    ch = getchar();
    
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    fcntl(STDIN_FILENO, F_SETFL, oldf);
    
    if(ch != EOF)
    {
        ungetc(ch, stdin);
        return 1;
    }
    
    return 0;
}

char getch() {
    termios settings, stored;
    char ch;
    
    tcgetattr(STDIN_FILENO, &stored);   //Получаем текущие настройки терминала
    settings = stored;      //Копируем их
    settings.c_lflag &= ~(ICANON|ECHO);     //Отключаем канонический режим и эхо
    settings.c_cc[VTIME] = 1;       //Таймаут ожидания ввода - бесконечно
    settings.c_cc[VMIN] = 1;       //Размер буфера для ввода - 1 символ
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //Применяем новые настройки
    ch = getchar();     //Теперь действие getchar() аналогично getch() в DOS-овском conio.h
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);      //Восстанавливаем настройки терминала
    
    return ch;
}


char getSymbol(){
    if (kbhit()){
        return getch();
    }
    return 'a';
}

int main()
{
    pid_t process[max_count];
    int currProc = 0;
    int totalProc = 0;
    
    workSig.sa_handler = setPrint;
    endSig.sa_handler = setEnd;
    sigaction(SIGUSR1, &workSig, NULL);
    sigaction(SIGUSR2, &endSig, NULL);
    
    while (1)
    {
            switch(getSymbol())
            {
                case '+':
                {
                    if(totalProc < max_count)
                    {
                        process[totalProc] = fork();
                        totalProc++;
                        switch(process[totalProc-1])
                        {
                            case 0:
                            {
                                char str[] = "Process number ";
                                int num = totalProc;
                                printFlag = 0;
                                endFlag = 0;
                                while(!endFlag)
                                {
                                    if (endFlag){
                                        printFlag = 0;
                                        kill(getppid(), SIGUSR1);
                                        break;
                                    }
                                    if(printFlag)
                                    {
                                        cout << str << num << endl;
                                        usleep(200 * 1000);
                                        printFlag = 0;
                                    }
                                    
                                    usleep(100 * 1000);
                                    if (endFlag){
                                        printFlag = 0;
                                        kill(getppid(), SIGUSR1);
                                        break;
                                    }
                                    kill(getppid(), SIGUSR1);
                                    pause();
                                }
                                return 0;
                                break;
                            }
                            default:
                            {
                                pause();
                                break;
                            }
                        }
                    }
                    break;
                }
                case '-':
                {
                    if(totalProc > 0)
                    {
                        totalProc--;
                        kill(process[totalProc], SIGUSR2);
                        wait(&process[totalProc]);
                    }
                    break;
                }
                case 'q':
                {
                    while(totalProc > 0)
                    {
                        totalProc--;
                        kill(process[totalProc], SIGUSR2);
                    }
                    endFlag = 1;
                    return 0;
                    break;
                }
            }
        
        if (totalProc){
            if(currProc >= totalProc && currProc != 0){
                currProc = 0;
            }
            kill(process[currProc], SIGUSR1);
            pause();
            currProc++;
        }
    }
    
    return 0;
}

