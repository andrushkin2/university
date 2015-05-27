//
//  stringClass.cpp
//  laba3
//
//  Created by Andrei Kozyakov on 11.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "stringClass.h"

using namespace std;

//default constructor
stringClass::stringClass(int _length)
{
    this->length = _length;
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
    is.sync();
    is.getline(buf,sizeof buf);
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

bool stringClass::operator == (const stringClass & tmp) const
{
    if(!strcmp(this->mystring,tmp.mystring))
        return true;
    else
        return false;
}

bool stringClass::operator == (const char * tmp) const
{
    if(!strcmp(this->mystring,tmp))
        return true;
    else
        return false;
}

void stringClass::operator += (char *str)
{
    unsigned long len = this->length + strlen(str);
    char *tmp_str = new char [this->length + 1];
    strcpy(tmp_str,this->mystring);
    if(this->length != 0 )
        delete this->mystring;
    mystring = new char [len + 1];
    strcpy(mystring,tmp_str);
    strcat(mystring,str);
    this->length = len;
}

stringClass stringClass::operator () (int start, int end){
    end = (int)(end > length? this->length : end);
    stringClass result(end - start + 1);
    int counter = 0;
    for (int i = start; i <= end; i++){
        result.mystring[counter] = mystring[i];
        counter++;
    }
    
    return result;
}