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

int kbhit(void);
struct sigaction workSig, endSig;
int printFlag = 0, endFlag = 0;
void Set_printFlag(int sig)
{
    printFlag = 1;
};
void Set_endFlag(int sig)
{
    endFlag = 1;
};

int main()
{
    struct termios oldt, newt;
    tcgetattr( STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~( ICANON | ECHO );
    tcsetattr( STDIN_FILENO, TCSANOW, &newt);

    pid_t process[max_count];
    int currProc = 0;
    int totalProc = 0;

    workSig.sa_handler = Set_printFlag;
    endSig.sa_handler = Set_endFlag;
    sigaction(SIGUSR1,&workSig,NULL);
    sigaction(SIGUSR2,&endSig,NULL);

    int ch;
    while (!endFlag)
    {

        while(kbhit() && (ch != 'q'))
        {
            switch(ch = getchar())
            {
                printf("%c\n", ch);
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
                                char str[] = "Hello from process #";
                                int num = totalProc;
                                printFlag = 0;
                                endFlag = 0;
                                while(!endFlag)
                                {
                                    if(printFlag)
                                    {
                                        for(int i = 0; i < strlen(str); i++)
                                        {
                                            printf("%c", str[i]);
                                            fflush(stdout);
                                            usleep(70000);
                                        }
                                        printf("%d \n", num);
                                        printFlag = 0;
                                    }
                                    kill(getppid(), SIGUSR1);
                                    pause();
                                }
                                //kill(getppid(), SIGUSR1);
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
                    break;
                }
            }
        }

        if(currProc >= totalProc) currProc = 0;

        //здесь заводятся процессы
        if(currProc < totalProc)
        {
            kill(process[currProc], SIGUSR1);
            pause();
            currProc++;
        }else{
        if((currProc == totalProc) && (currProc != 0))
        {
            currProc = 0;
            kill(process[currProc], SIGUSR1);
            pause();
            currProc++;
        }
        }
    }

    tcsetattr( STDIN_FILENO, TCSANOW, &oldt );
    return 0;
}


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
