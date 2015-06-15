//
//  mechanic.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "mechanic.h"
istream &operator>>(istream &stream, Mechanic &_in) {
    cout << "Enter mark of the clock: ";
    stream>>_in.mark;
    cout<<"Enter screen of the clock: ";
    stream>>_in.screen;
    cout<<"Enter size of the clock: ";
    stream>>_in.size;
    cout<<"Enter type of belt: ";
    stream>>_in.belt;
    return stream;
}

ostream &operator<<(ostream &stream, Mechanic &_out) {
    stream << "Mechanic clock: " << endl;
    stream << "Production of: ";
    stream << _out.mark<< endl;
    stream<<"With face of: ";
    stream << _out.screen<< endl;
    stream << "Size: ";
    stream << _out.size<< endl;
    stream<<"Type of belt: ";
    stream<<_out.belt<<endl;
    return stream;
}

ifstream &operator>>(ifstream &stream, Mechanic &_in)
{
    stream.read(reinterpret_cast<char*>(&_in), sizeof(_in));
    /*char* x;
    stream >> x;
    _in.SetMark(x);
    stream >> x;
    _in.SetScreen(x);
    stream >> x;
    _in.SetSize(x);
    stream >> _in.belt;*/
    return stream;
}

ofstream &operator<<(ofstream &stream, Mechanic &_out)
{
    stream.write(reinterpret_cast<char*>(&_out), sizeof(_out));
    /*stream << "m" << " ";
    stream << _out.GetMark() << " ";
    stream << _out.GetScreen() << " ";
    stream << _out.GetSize() << " ";
    stream << _out.belt << endl;*/
    return stream;
}

