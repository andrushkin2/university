//
//  main.cpp
//  laba3
//
//  Created by Andrei Kozyakov on 11.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <iomanip>
#include "stringClass.h"

using namespace std;

int main(int argc, const char * argv[]) {
    
    int m;
    char exit;
    char *temp = new char[50];
    stringClass a, b;
    
    a = "stringClass";
    
    do
    {
        {
            system("clear");
            
            
            cout << "\n\nSelect an operation:\n\t1) Set a new string to class A\n\t2) Print classes\n\t3) Check is equal with string\n\t4) Add extra symbols to class A\n\t5) Slice class A\n\t6) Exit\n\t";
            cin >> m;
            
            system("clear");
            switch (m)
            {
                case (1):
                    cout << "Enter a new sting:\n";
                    cin >> a;
                    break;
                case (2):
                    cout << "Class A:\n";
                    a.pringClass();
                    
                    cout << "\n\nClass B:\n";
                    b.pringClass();
                    
                    break;
                case (3):
                    cout << "Input a string for camparing with class A:\n";
                    cin >> temp;
                    cout << endl << a << (a == temp? " equal with " : " doesn't equal with") << temp;
                    break;
                case (4):
                    cout << "Input a string for adding:\n";
                    cin >> temp;
                    cout << endl << a << " + " << temp << " = ";
                    a += temp;
                    cout << a;
                    break;
                case (5):
                    int st, end;
                    cout << "Input start number of symbol:\n";
                    cin >> st;
                    
                    cout << "Input end number of symbol:\n";
                    cin >> end;
                    b = a(st, end);
                    cout << "\n\nResult - class B value: " << b << endl;
                    break;
                case (6):
                    return 0;
                default:
                    cout<<"Unknown operation has been selected!\n";
            }
        }
        cout << "\n\nDo you want try again? (type an \"y\" for continue) ";
        cin >> exit;
        
    } while(exit == 'y');
    
    return 0;
}
