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
void WaitThreads();
void AddThread();

char getch() {
    termios settings, stored;
    char ch;
    
    tcgetattr(STDIN_FILENO, &stored);   //Получаем текущие настройки терминала
    settings = stored;      //Копируем их
    settings.c_lflag &= ~(ICANON|ECHO);     //Отключаем канонический режим и эхо
    settings.c_cc[VTIME] = 0;       //Таймаут ожидания ввода - бесконечно
    settings.c_cc[VMIN] = 1;       //Размер буфера для ввода - 1 символ
    tcsetattr(STDIN_FILENO, TCSANOW, &settings);    //Применяем новые настройки
    ch = getchar();     //Теперь действие getchar() аналогично getch() в DOS-овском conio.h
    tcsetattr(STDIN_FILENO, TCSANOW, &stored);      //Восстанавливаем настройки терминала
    
    return ch;
}

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
        cout <<"Initialize mutex error...\n";
        
        return 0;
    }
    
   
    
    while(1)
    {
        usleep(10000);
        switch(getch())
        {
            case '+':
                if(threads.size() < MAX_COUNT) AddThread();
                break;
                
            case '-':
                if(threads.size() > 0) CloseLastThread();
                break;
                
            case 'q':
                while(threads.size() > 0)
                    CloseLastThread();
                WaitThreads();
                
                pthread_mutex_destroy(&printMutex);
                
                
                return 0;
                
            default:
                break;
        }
    }
}


void CloseLastThread()
{
    closingThreads.push(threads.top()); // Добавляем id последнего потока в стек закрывающихся потоков
    
    *(quitFlags.back()) = true;   // Устанавливаем флаг выхода для последнего потока
    
    quitFlags.pop_back();         // Удаляем указатель на флаг закрытия последнего потока из массива
    
    threads.pop();				  // Удаляем id последнего потока
}

void WaitThreads()
{
    while(closingThreads.size() > 0)
    {
        pthread_join(closingThreads.top(), NULL); // Ожидаем завершения последнего потока
        closingThreads.pop();
    }
}

void AddThread()
{
    quitFlags.push_back(new bool(false));
    
    threadArg* arg = new threadArg();
    (*arg).num = (int)threads.size();              // Номер добавляемого потока
    (*arg).quitFlag = quitFlags.back();		  // Указатель на флаг закрытия для данного потока
    
    pthread_t thread;
    
    if(pthread_create(&thread, NULL, printString, arg) != 0)
    {
        cout << "Creating new thread error...\n";
        return;
    }
    threads.push(thread);
    
}



void* printString(void* arg)
{
    //	usleep(1000000); // для проверки на ошибки
    
    bool *qFlag = (*(threadArg*)arg).quitFlag;   // Указатель на флаг выхода для данного потока
    int threadNumber = (*(threadArg*)arg).num;   // Номер данного потока
    delete (threadArg*)arg;
    
    while(1)
    {
        if(*qFlag) break;
        
        pthread_mutex_lock(&printMutex);
        for(int i = 0; i < strlen(strings[threadNumber]); i++)
        {
            
            if(*qFlag) break;
            
            printf("%c",strings[threadNumber][i]);
            usleep(100000);
        }
        
        pthread_mutex_unlock(&printMutex);
        
        usleep(100);
    }
    
    delete qFlag;
    return NULL;
}