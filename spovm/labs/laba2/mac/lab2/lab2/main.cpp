//
//  main.cpp
//  lab2
//
//  Created by Andrei Kozyakov on 15.12.15.
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
#include <ncurses.h>
#include <pthread.h>
#include <string.h>

#define MAX_COUNT 10
using namespace std;


void* printString(void* arg);
void CloseLastThread();
void WaitThreads();
void AddThread();

char strings[10][30] = {{"1) First thread"}, {"2) Second thread"}, {"3) Third thread"}, {"4) Fourth thread"}, {"5) Fifth thread"}, {"6) Sixth thread"}, {"7) Seventh thread"}, {"8) Eighth thread"}, {"9) Ninth thread"}, {"10) Tenth thread"}};

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    return 0;
}
