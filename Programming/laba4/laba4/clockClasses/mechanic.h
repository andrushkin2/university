//
//  mechanic.h
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba4__mechanic__
#define __laba4__mechanic__

#include <stdio.h>
#include "clockClass.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;
class Mechanic : public clockClass
{
    string belt;
public:
    string GetBelt() { return belt; }
    void SetBelt(string value) { belt = value; }
    
    void Print(ostream &stream) { stream << *this; }
    void Input(istream &stream) { stream >> *this; }
    void PrintFromFile(ofstream &stream) { stream << *this; }
    void InputToFile(ifstream &stream) { stream >> *this; }
    
    friend istream &operator>>(istream &stream, Mechanic &_out);
    friend ostream &operator<<(ostream &stream, Mechanic &_in);
    friend ifstream &operator>>(ifstream &stream, Mechanic &_out);
    friend ofstream &operator<<(ofstream &stream, Mechanic &_in);
};


#endif /* defined(__laba4__mechanic__) */
