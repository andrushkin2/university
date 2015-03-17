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

class matrix
{
    int **p, m, n;
    
public:
    matrix() { p = NULL; }
    matrix(const matrix&);
    ~matrix();
    void SetSize(const int, const int);
    void fill();
    void print();
    matrix operator+(matrix);
    matrix operator*(matrix);
    matrix operator=(matrix);
};

#endif /* defined(__laba2__arrayClass__) */
