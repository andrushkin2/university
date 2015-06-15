//
//  clockClass.h
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba4__clockClass__
#define __laba4__clockClass__

#include <stdio.h>
#include <iostream>
#include <fstream>
#include <string>

using namespace std;
class clockClass
{
protected:
    char size[15];
    char screen[15];
    char mark[15];
    
public:
    
    char* GetSize(){ return size; }
    char* GetScreen(){ return screen; }
    char* GetMark(){ return mark; }
    void SetSize(char* value) {
        strcpy(size, value);
    }
    void SetScreen(char* value) { strcpy(screen, value); }
    void SetMark(char* value) { strcpy(mark, value); }
    
    virtual void Print(ostream &stream) { stream << *this; }
    virtual void Input(istream &stream) { stream >> *this; }
    virtual void PrintFromFile(ofstream &stream) { stream << *this; }
    virtual void InputToFile(ifstream &stream) { stream >> *this; }
    
    friend istream &operator>>(istream &stream, clockClass &_in);
    friend ostream &operator<<(ostream &stream, clockClass &_out);
    friend ifstream &operator>>(ifstream &stream, clockClass &_in);
    friend ofstream &operator<<(ofstream &stream, clockClass &_out);
    
};

#endif /* defined(__laba4__clockClass__) */
