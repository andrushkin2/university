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
    string size;
    string screen;
    string mark;
    
public:
    
    string GetSize(){ return size; }
    string GetScreen(){ return screen; }
    string GetMark(){ return mark; }
    void SetSize(string value) { size = value; }
    void SetScreen(string value) { screen = value; }
    void SetMark(string value) { mark = value; }
    
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
