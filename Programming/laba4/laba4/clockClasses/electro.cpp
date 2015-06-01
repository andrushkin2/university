//
//  electro.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "electro.h"
using namespace std;

istream &operator>>(istream &stream, Electronic &_in)
{
    string x;
    cout << "Enter mark of the clock: ";
    stream>>x;
    _in.SetMark(x);
    cout<<"Enter screen of the clock: ";
    stream>>x;
    _in.SetScreen(x);
    cout<<"Enter size of the clock: ";
    stream>>x;
    _in.SetSize(x);
    cout<<"Enter the type of powersource: ";
    stream>>_in.powersource;
    return stream;
}

ostream &operator<<(ostream &stream, Electronic &_out)
{
    stream << "Electronic clock: " << endl;
    stream<<"Production of: ";
    stream<<_out.GetMark()<<endl;
    stream<<"With face of: ";
    stream<<_out.GetScreen()<<endl;
    stream<<"Size: ";
    stream<<_out.GetSize()<<endl;
    stream<<"Type of powersource: ";
    stream<<_out.powersource<<endl;
    return stream;
}

ifstream &operator>>(ifstream &stream, Electronic &_in)
{
    string x;
    stream >> x;
    _in.SetMark(x);
    stream >> x;
    _in.SetScreen(x);
    stream >> x;
    _in.SetSize(x);
    stream >> _in.powersource;
    return stream;
}

ofstream &operator<<(ofstream &stream, Electronic &_out)
{
    stream << "e" << "%";
    stream << _out.GetMark() << "%";
    stream << _out.GetScreen() << "%";
    stream << _out.GetSize() << "%";
    stream << _out.powersource << endl;
    return stream;
}
