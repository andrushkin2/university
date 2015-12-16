//
//  main.cpp
//  lab3
//
//  Created by Andrei Kozyakov on 15.12.15.
//  Copyright © 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <stdio.h>
#include <termios.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/shm.h>
#include <unistd.h>
#include <sys/sem.h>
#include <sys/types.h>
//#include <wait>
#include <semaphore.h>
#include <string.h>
#include <math.h>

using namespace std;


void WaitSemaphore(int sem_id, int num);
void ReleaseSemaphore(int sem_id, int num);


int main(int argc, char *argv[])
{
    int sendMessage = 0,
        messageGot = 1,
        readyToWork = 2,
        canReadNewMessage = 3;
    
    int bufferSize = 80; // Размер буфера
    int shm_id = shmget(IPC_PRIVATE, bufferSize, IPC_CREAT|0666); // Создание сегмента разделяемой памяти
    
    if (shm_id < 0)
    {
        printf("shmget error\n");
        return(0);
    }
    
    int NumberOfBlocks; // Количество блоков размером с буфер
    int length;	      // Длина передаваемой строки
    
    system("clear");
    string message;
    
    // Создание набора семафоров
    int sem_id = semget(IPC_PRIVATE, 4, IPC_CREAT|0666);
    semctl(sem_id, 0, SETALL, 0);
    if(sem_id < 0)
    {
        printf("Semaphores is not created.");
        return 0;
    }
    int pid = fork();
    switch(pid)
    {
        case -1:
            printf("New process is not created\n");
            return 0;
            
        case 0: // child process
        {
            void *buffer = shmat(shm_id, NULL, 0);
            while(1)
            {
                message.clear();
                
                WaitSemaphore(sem_id, readyToWork);
                length = *(int*)buffer;
                ReleaseSemaphore(sem_id, messageGot);
                
                if(length == -1) break;  // exit from program
                
                WaitSemaphore(sem_id, sendMessage);
                message.append((char*)buffer, bufferSize); 
                ReleaseSemaphore(sem_id, messageGot);
                
                message.resize(length);
                cout << "\nChild process:\n";// << message << "\n\n\n";
                
                printf("%s", buffer);
                
                cout<<"\n\n\n";
                
                ReleaseSemaphore(sem_id, canReadNewMessage);
            }
            
            
        }
            break;
            
        default: // Родительский процесс
        {
            void *buffer = shmat(shm_id, NULL, 0);
            while(1)
            {
                message.clear();
                cout<<"Parent process:\n";
            
                tcflush(STDIN_FILENO, TCIFLUSH);
                cin.clear();
                getline(cin, message);
            
                
                ReleaseSemaphore(sem_id, readyToWork);	// set ready as true
                
                if(message == "quit")
                {
                    length = -1;
                    *(int*)buffer = length;
                    ReleaseSemaphore(sem_id, sendMessage);
                    WaitSemaphore(sem_id, messageGot);
                    waitpid(pid, NULL, 0);
                    break;
                }
                
                length = message.size();
                *(int*)buffer = length;
                
                ReleaseSemaphore(sem_id, sendMessage);
                WaitSemaphore(sem_id, messageGot);
                
                message.copy((char*)buffer, bufferSize, 0);
                ReleaseSemaphore(sem_id, sendMessage);
                WaitSemaphore(sem_id, messageGot);
                
                WaitSemaphore(sem_id, canReadNewMessage);
            }
            
            semctl(sem_id, 0, IPC_RMID);
        }
            break;
    }
    
    system("clear"); 

    return 0;
}



void WaitSemaphore(int sem_id, int num)
{
    struct sembuf buf;
    buf.sem_op = -1;
    buf.sem_flg = SEM_UNDO;
    buf.sem_num = num;
    semop(sem_id, &buf, 1);	
}

// Установить счётчик семафора в 1
void ReleaseSemaphore(int sem_id, int num)
{
    struct sembuf buf;
    buf.sem_op = 1;
    buf.sem_flg = SEM_UNDO;
    buf.sem_num = num;
    semop(sem_id, &buf, 1); 
}

