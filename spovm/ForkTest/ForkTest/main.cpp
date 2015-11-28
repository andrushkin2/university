//
//  main.cpp
//  ForkTest
//
//  Created by Andrei Kozyakov on 01.09.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <unistd.h>
#include <time.h>

using namespace std;


int main(int argc, const char * argv[]) {
    // insert code here...
    int pipeD[2];
    //pipe[0] - readPipe
    //pipe[1] - writePipe
    
    pipe(pipeD);
    pid_t pId = fork();
    
    switch (pId) {
        case -1:
            perror("fork");
            exit(1);
            break;
        case 0:
            {
                close(pipeD[0]);
                char buffer[64];
                time_t t = time(0);
                tm timeStruct;
                timeStruct = *localtime(&t);
                strftime(buffer, sizeof(buffer), "%Y-%m-%d %X", &timeStruct);
                write(pipeD[1], buffer, sizeof(buffer));
                exit(0);
            }
        default:
        {
            waitpid(pId, NULL, 0);
            close(pipeD[1]);
            cout << "\n\nChild time:\n";
            char res[64];
            read(pipeD[0], res, sizeof(res));
            cout << res << "\n";
            exit(0);
        }
    }
    return 0;
}
