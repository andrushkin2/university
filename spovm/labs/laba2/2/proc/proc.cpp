#include <iostream>
#include <cstdlib>
#include <cstdio>
#include <cstring>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <semaphore.h>
#include <signal.h>

sem_t *proc_stdout_sem;
bool SemCapturedByThisProcess;

void sig_int(int sig) {
    if(SemCapturedByThisProcess) {
        sem_post(proc_stdout_sem);
    }
    sem_close(proc_stdout_sem);
    exit(0);
}

int main(int argc, char **argv) {
    if(argc == 1) {
        std::cout << "Не указан номер процесса!" <<std::endl;
        return 1;
    }

    proc_stdout_sem = sem_open("/proc_stdout_sem", O_RDWR);
    if(proc_stdout_sem == SEM_FAILED) {
        perror("Ошибка открытия семафора");
        return 1;
    }

    struct sigaction action;
    memset(&action, 0, sizeof(struct sigaction));
    action.sa_handler = sig_int;
    sigset_t set;
    sigemptyset(&set);
    sigaddset(&set, SIGINT);
    action.sa_mask = set;

    if(sigaction(SIGINT, &action, NULL)) {
        perror("Ошибка установки обработчика сигнала");
        return 1;
    }

    std::string str = str + "Привет из процесса №" + argv[1] + '!';

    while(1) {
        usleep(25000);
        sem_wait(proc_stdout_sem);
        SemCapturedByThisProcess = true;
        for(unsigned int i = 0; i<str.length(); ++i) {
            std::cout << str[i];
            std::cout.flush();
            usleep(25000);
        }
        std::cout << std::endl;
        sem_post(proc_stdout_sem);
        SemCapturedByThisProcess = false;
    }

    return 0;
}
