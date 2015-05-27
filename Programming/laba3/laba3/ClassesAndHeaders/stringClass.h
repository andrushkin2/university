//
//  stringClass.h
//  laba3
//
//  Created by Andrei Kozyakov on 11.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba3__stringClass__
#define __laba3__stringClass__

#include <stdio.h>
#include <iostream>
#include <string.h>

class stringClass
{
private:
    char *mystring;          
    unsigned long length;
public:
    stringClass(int _length = 100);
    stringClass(char str[]);
    stringClass(const stringClass & str);
    ~stringClass();
    
    inline long GetLength() const { return this->length; };
    inline char * GetStringChar() const { return this->mystring; };
    inline stringClass GetString() const { return *this; };
    friend std::ostream & operator << (std::ostream & os,stringClass & str);
    friend std::istream & operator >> (std::istream & is,stringClass & str);
    void operator = (const stringClass & tmp);
    void operator = (char * str);
    void operator = (const char str[]);
    bool operator == (const stringClass & tmp) const;
    bool operator == (const char * tmp) const;
    void operator += (char *str);
    stringClass operator () (int, int);
};

#endif /* defined(__laba3__stringClass__) */
