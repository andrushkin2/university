//
//  mechanic.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "mechanic.h"
istream &operator>>(istream &stream, Mechanic &_in) {
    string x;
    cout << "Enter mark of the clock: ";
    stream >> x;
    _in.SetMark(x);
    cout<<"Enter screen of the clock: ";
    stream >> x;
    _in.SetScreen(x);
    cout << "Enter size of the clock: ";
    stream >> x;
    _in.SetSize(x);
    cout<<"Enter type of belt: ";
    stream>>_in.belt;
    return stream;
}

ostream &operator<<(ostream &stream, Mechanic &_out) {
    stream << "Mechanic clock: " << endl;
    stream << "Production of: ";
    stream << _out.GetMark()<< endl;
    stream<<"With face of: ";
    stream << _out.GetScreen()<< endl;
    stream << "Size: ";
    stream << _out.GetSize()<< endl;
    stream<<"Type of belt: ";
    stream<<_out.belt<<endl;
    return stream;
}

ifstream &operator>>(ifstream &stream, Mechanic &_in)
{
    string x;
    stream >> x;
    _in.SetMark(x);
    stream >> x;
    _in.SetScreen(x);
    stream >> x;
    _in.SetSize(x);
    stream >> _in.belt;
    return stream;
}

ofstream &operator<<(ofstream &stream, Mechanic &_out)
{
    stream << "m" << "%";
    stream << _out.GetMark() << "%";
    stream << _out.GetScreen() << "%";
    stream << _out.GetSize() << "%";
    stream << _out.belt << endl;
    return stream;
}

