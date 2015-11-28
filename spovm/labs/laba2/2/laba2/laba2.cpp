#include <iostream>
#include <stack>
#include <unistd.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <semaphore.h>
#include <termios.h>

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

pid_t start_proc(const int num) {
    pid_t pid = fork();
    switch(pid) {
        case -1:
            std::cout<<"Ошибка при создании процесса!"<<std::endl;

        default:
            break;

        case 0:
            execl("proc", "proc", std::to_string(num).c_str(), NULL);
    }
    return pid;
}

void stop_proc(pid_t pid) {
    kill(pid, SIGINT);
    wait(NULL);
}

int main() {
    char c;
    std::stack<pid_t> proc_stack;
    int proc_cnt = 0;
    pid_t pid;
    sem_t *proc_stdout_sem = sem_open("/proc_stdout_sem", O_CREAT, S_IRUSR|S_IWUSR|S_IRGRP|S_IWGRP, 1);

    if(proc_stdout_sem == SEM_FAILED) {
        perror("Ошибка открытия семафора");
        return 1;
    }

    while( (c = getch()) != 'q') {
        switch(c) {
            case '=':
                proc_cnt++;
                sem_wait(proc_stdout_sem);
                std::cout << std::endl << "Процессов: " << proc_cnt <<std::endl;
                sem_post(proc_stdout_sem);
                pid = start_proc(proc_cnt);
                if(pid != -1) {
                    proc_stack.push(pid);
                }
                break;

            case '-':
                if(proc_stack.empty()) {
                    std::cout<<"Ни одного процесса не создано!"<<std::endl;
                } else {
                    stop_proc(proc_stack.top());
                    proc_stack.pop();
                    proc_cnt--;
                    sem_wait(proc_stdout_sem);
                    std::cout << std::endl << "Процессов: " << proc_cnt <<std::endl;
                    sem_post(proc_stdout_sem);
                }

            default:
                break;
        }
    }

    if(!proc_stack.empty()) {
        while(!proc_stack.empty()) {
            stop_proc(proc_stack.top());
            proc_stack.pop();
        }
    }

    sem_unlink("/proc_stdout_sem");

    return 0;
}
