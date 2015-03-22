//
//  arrayClass.cpp
//  laba2
//
//  Created by Andrei Kozyakov on 17.03.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "arrayClass.h"
#include <new>
#include <cstdlib>
#include <iostream>
#include <iomanip>

using namespace std;

void matrixClass::SetSize(const int y, const int x)
{
    n = x;
    m = y;
    try
    {
        p = new int*[m];
        for(int i = 0; i < m; i++){
            p[i] = new int[n];
        }
    }
    catch (bad_alloc xa)
    {
        cout << "Memory Allocation Error!";
        exit(EXIT_FAILURE);
    }
    
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            p[i][j] = 0;
        }
    }
}

matrixClass::~matrixClass()
{
    if(!p){
        return;
    }
    for(int i = 0; i < m; i++){
        delete [] p[i];
    }
    delete [] p;
}

matrixClass::matrixClass(const matrixClass& op2)
{
    m = op2.m;
    n = op2.n;
    try
    {
        p = new int*[m];
        for(int i = 0; i < m; i++) p[i] = new int[n];
    }
    catch (bad_alloc xa)
    {
        cout << "Memory Allocation Error!";
        exit(EXIT_FAILURE);
    }
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            p[i][j] = op2.p[i][j];
        }
    }
}

void matrixClass::fill()
{
    for (int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
        {
            cout<<"Input value of ["<<i+1<<","<<j+1<<"]: ";
            cin>>p[i][j];
        }
}

void matrixClass::print()
{
    for (int i = 0; i < m; i++)
    {
        for(int j = 0; j < n; j++){
            cout<<setw(10)<<p[i][j];
        }
        cout<<endl;
    }
}

matrixClass matrixClass::operator+(matrixClass B)
{
    matrixClass C;
    if( m!=B.m || n!=B.n){
        throw SizesMismatch;
    }
    C.SetSize(m, n);
    for (int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            C.p[i][j] = p[i][j] + B.p[i][j];
    return C;
}

matrixClass matrixClass::operator*(matrixClass B)
{
    matrixClass C;
    if( n != B.m ){
        throw NotConsistent;
    }
    C.SetSize(m, B.n);
    for (int i = 0; i < C.m; i++){
        for(int j = 0; j < C.n; j++){
            for(int k = 0; k < n; k++){
                C.p[i][j] += p[i][k] * B.p[k][j];
            };
        }
    }
    return C;
}

matrixClass matrixClass::operator=(matrixClass obj)
{
    m = obj.m;
    n = obj.n;
    try
    {
        p = new int*[m];
        for(int i = 0; i < m; i++){
            p[i] = new int[n];
        }
    }
    catch (bad_alloc xa)
    {
        cout<<"Memory Allocation Error!";
        exit(EXIT_FAILURE);
    }
    
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            p[i][j] = obj.p[i][j];
        }
    }
    return *this;
}
