//
//  arrayClass.h
//  laba2
//
//  Created by Andrei Kozyakov on 17.03.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba2__arrayClass__
#define __laba2__arrayClass__

#include <stdio.h>
#include <cstddef>

enum exeption
{
    SizesMismatch,
    NotConsistent
};

class matrixClass
{
    int **p, m, n;
    
public:
    matrixClass() { p = NULL; }
    matrixClass(const matrixClass&);
    void SetSize(int, int);
    void fill();
    void print();
    ~matrixClass();
    matrixClass operator=(matrixClass);
    matrixClass operator+(matrixClass);
    matrixClass operator*(matrixClass);
};

#endif /* defined(__laba2__arrayClass__) */
