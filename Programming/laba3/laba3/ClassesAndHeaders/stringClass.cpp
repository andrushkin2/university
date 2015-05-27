//
//  stringClass.cpp
//  laba3
//
//  Created by Andrei Kozyakov on 11.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "stringClass.h"
#include <iomanip>

using namespace std;

//default constructor
stringClass::stringClass(int len)
{
    this->length = len;
    this->mystring = new char [this->length];
    strcpy(this->mystring,"");
}

stringClass::stringClass(char str[])
{
    this->length = strlen(str);
    this->mystring = new char [this->length + 1];
    strcpy(this->mystring,str);
}

stringClass::stringClass(const stringClass & str)
{
    this->length = str.length;
    this->mystring = new char [this->length + 1];
    strcpy(this->mystring,str.mystring);
}

stringClass::~stringClass()
{
    delete [] this->mystring;
}
//output
ostream & operator << (ostream & os,stringClass & str)
{
    return os << str.mystring;
}
//input
istream & operator >> (istream & is,stringClass & str)
{
    
    delete [] str.mystring;
    char buf[256];
    is >> buf;
    str.length = strlen(buf);
    str.mystring = new char [str.length + 1];
    strcpy(str.mystring,buf);
    return is;
}


void stringClass::operator = (const stringClass & tmp)
{
    delete [] this->mystring;
    this->length = tmp.GetLength();
    this->mystring = new char [this->length + 1];
    strcpy(this->mystring,tmp.mystring);
}

void stringClass::operator = (char * str)
{
    delete [] this->mystring;
    this->length = strlen(str);
    this->mystring = new char [this->length + 1];
    strcpy(this->mystring,str);
}

void stringClass::operator = (const char str[])
{
    delete [] this->mystring;
    this->length = strlen(str);
    this->mystring = new char [this->length + 1];
    strcpy(this->mystring,str);
}

void stringClass::operator = (const string str)
{
    delete [] this->mystring;
    this->length = str.length();
    this->mystring = new char [this->length + 1];
    for (int i = 0; i < this->length; i++){
        this->mystring[i] = str[i];
    }
}

bool stringClass::operator == (const stringClass & tmp) const
{
    return !strcmp(this->mystring,tmp.mystring);
}

bool stringClass::operator == (const char * tmp) const
{
    return !strcmp(this->mystring,tmp);
}

void stringClass::operator += (char *str)
{
    unsigned long len = this->length + strlen(str);
    char *tmp_str = new char [this->length + 1];
    strcpy(tmp_str,this->mystring);
    if(this->length != 0 )
        delete this->mystring;
    this->mystring = new char [len + 1];
    strcpy(this->mystring,tmp_str);
    strcat(this->mystring,str);
    this->length = len;
}

stringClass stringClass::operator () (int start, int end = 0){
    end = (int)(end > length || end == 0? this->length : end);
    stringClass result(end - start + 1);
    int counter = 0;
    for (int i = start; i <= end; i++){
        result.mystring[counter] = mystring[i];
        counter++;
    }
    
    return result;
}

void stringClass::pringClass(){
    cout << "Value: " << setw(15) << this->mystring << endl << "Length: " << setw(15) << this->length << endl;
}
