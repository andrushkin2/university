//
//  clockClass.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "clockClass.h"
using namespace std;

istream &operator>>(istream &stream, clockClass &_in)
{
    cout<<"Enter mark of the clock: ";
    stream>>_in.mark;
    cout<<"Enter screen of the clock: ";
    stream>>_in.screen;
    cout<<"Enter size of the clock: ";
    stream>>_in.size;
    return stream;
}

ostream &operator<<(ostream &stream, clockClass &_out)
{
    stream << "Simple clock: " << endl;
    stream<<"Production of: ";
    stream<<_out.mark<<endl;
    stream<<"With face of: ";
    stream<<_out.screen<<endl;
    stream<<"Size: ";
    stream<<_out.size<<endl;
    return stream;
}

ifstream &operator>>(ifstream &stream, clockClass &_in)
{
    stream >> _in.mark;
    stream >> _in.screen;
    stream >> _in.size;
    return stream;
}

ofstream &operator<<(ofstream &stream, clockClass &_out)
{
    stream << "c" << "%";
    stream << _out.mark << "%";
    stream << _out.screen << "%";
    stream << _out.size << endl;
    return stream;
}
