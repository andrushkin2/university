//
//  electro.h
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba4__electro__
#define __laba4__electro__

#include <stdio.h>
#include "clockClass.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;

class Electronic : public clockClass
{
    char powersource[15];
    
public:
    //Electronic(char* s = "", char* m = "", char* s = ""){
        
    //}
    char* GetPowersource() { return powersource; }
    void SetPowersource(char* value) { strcpy(powersource, value); }
    
    void Print(ostream &stream) { stream << *this; }
    void Input(istream &stream) { stream >> *this; }
    void PrintFromFile(ofstream &stream) { stream << *this; }
    void InputToFile(ifstream &stream) { stream >> *this; }
    
    friend istream &operator>>(istream &stream, Electronic &_in);
    friend ostream &operator<<(ostream &stream, Electronic &_out);
    friend ifstream &operator>>(ifstream &stream, Electronic &_in);
    friend ofstream &operator<<(ofstream &stream, Electronic &_out);
};

#endif /* defined(__laba4__electro__) */
