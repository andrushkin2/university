//
//  main.cpp
//  laba3
//
//  Created by Andrei Kozyakov on 11.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <string.h>
#include "stringClass.h"

using namespace std;

int main(int argc, const char * argv[]) {
    // insert code here...
    cout << "Hello, World!\n";\
    
    stringClass A;
    
    A = "stringClass";
    
    stringClass B = A(1, 4);
    
    cout << A << endl;
    
    cout << B << endl;
    
    return 0;
}
