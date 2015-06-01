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

using namespace std;

class stringClass
{
private:
    char *mystring;          
    unsigned long length;
    
public:

    stringClass(int len = 100);
    stringClass(char str[]);
    //stringClass(stringClass &str);
    stringClass(const stringClass & str);
    ~stringClass();
    
    inline long GetLength() const { return this->length; };
    inline char * GetStringChar() const { return this->mystring; };
    inline stringClass GetStringClass() const { return *this; };
    friend std::ostream & operator << (std::ostream & os,stringClass & str);
    friend std::istream & operator >> (std::istream & is,stringClass & str);
    void pringClass();
    stringClass operator = (stringClass);
    void operator = (char * str);
    void operator = (const char str[]);
    void operator = (string str);
    bool operator == (const stringClass & tmp) const;
    bool operator == (const char * tmp) const;
    void operator += (char *str);
    void operator () (int, int);
};

#endif /* defined(__laba3__stringClass__) */
