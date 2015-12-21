//
//  main.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 9.12.15.
//  Copyright © 2015 Andrei Kozyakov. All rights reserved.
//

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <unistd.h>
#include <vector>
#include <stack>
#include <unistd.h>
#include <termios.h>

#include <pthread.h>
#include <string.h>

#define MAX_COUNT 10

using namespace std;

void* printString(void* arg);
void CloseLastThread();

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

int printNumber = -1;
bool printEnd = true;
char strings[10][30] = {{"1) First thread"}, {"2) Second thread"}, {"3) Third thread"}, {"4) Fourth thread"}, {"5) Fifth thread"}, {"6) Sixth thread"}, {"7) Seventh thread"}, {"8) Eighth thread"}, {"9) Ninth thread"}, {"10) Tenth thread"}};

pthread_mutex_t printMutex;

stack<pthread_t> threads;
stack<pthread_t> closingThreads;
vector<bool*> quitFlags;

struct threadArg
{
    bool* quitFlag;
    int num;
};


int main()
{
    if(pthread_mutex_init(&printMutex, NULL) != 0)
    {
        cout <<"Cannot initialize mutex :(\n"; 
        return 0;
    }
    
    while(1)
    {
        switch(getch())
        {
            case '+':
                if(threads.size() < MAX_COUNT) {
                    quitFlags.push_back(new bool(false));
                    threadArg* arg = new threadArg();
                    (*arg).num = (int)threads.size();    
                    (*arg).quitFlag = quitFlags.back();       
                    pthread_t thread;
                    if(pthread_create(&thread, NULL, printString, arg) != 0)
                    {
                        cout << "Cannot create a thread :(\n";
                        return;
                    }
                    threads.push(thread); 
                }
                break;
                
            case '-':
                if(threads.size() > 0) {
                    if (printNumber == threads.size() - 1){
                        printNumber = -1;
                        printEnd = true;
                    }
                    CloseLastThread();
                    pthread_join(closingThreads.top(), NULL); // // waiting for thread close
                    closingThreads.pop();
                }
                break;
                
            case 'q':
                while(threads.size() > 0){
                    CloseLastThread();
                }
                while(closingThreads.size() > 0)
                {
                    pthread_join(closingThreads.top(), NULL); // waiting for thread close
                    closingThreads.pop();
                }
                pthread_mutex_destroy(&printMutex);
                return 0;
                
            default:
                break;
        }
    }

    if (threads.size() && printEnd){
        printEnd = false;
        if (printNumber + 1 >= threads.size()){
            printNumber = 0;
        } else {
            printNumber++;
        }
    }
}

void CloseLastThread()
{
    closingThreads.push(threads.top()); 
    *(quitFlags.back()) = true;   
    quitFlags.pop_back();         
    threads.pop();			
}

void* printString(void* arg)
{   
    bool *qFlag = (*(threadArg*)arg).quitFlag;   // link to Quit flag
    int threadNumber = (*(threadArg*)arg).num;   // thread number
    delete (threadArg*)arg;
    
    while(1)
    {
        if(*qFlag) {
            break;
        }
        if (printNumber == threadNumber){
            pthread_mutex_lock(&printMutex);
            for(int i = 0; i < strlen(strings[threadNumber]); i++)
            { 
                if(*qFlag) {
                    break;
                }
                cout << strings[threadNumber][i];
                usleep(50);
            }
            cout << endl;
            printEnd = true;
            pthread_mutex_unlock(&printMutex);
        }
        usleep(100);
    }
    delete qFlag;
    return NULL;
}