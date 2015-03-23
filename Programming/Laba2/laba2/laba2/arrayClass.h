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

enum exeption
{
    SizesMismatch,
    NotConsistent
};

class matrixClass
{
    int **arr, m, n;
    
public:
    matrixClass() { arr = NULL; }
    matrixClass(const matrixClass&);
    void setSize(int, int);
    void fillMatrix();
    matrixClass addition(matrixClass);
    matrixClass multipl(matrixClass);
    void print();
    ~matrixClass();
    matrixClass operator=(matrixClass);
    matrixClass operator+(matrixClass);
    matrixClass operator*(matrixClass);
};

#endif /* defined(__laba2__arrayClass__) */
