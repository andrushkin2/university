//
//  arrayClass.cpp
//  laba2
//
//  Created by Andrei Kozyakov on 17.03.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include "arrayClass.h"
#include <cstdlib>
#include <iostream>
#include <iomanip>

using namespace std;

void matrixClass::setSize(int y, int x)
{
    n = x;
    m = y;
    try
    {
        if (n == 0 || m == 0){
            throw SizesMismatch;
        }
        arr = new int*[m];
        for(int i = 0; i < m; i++){
            arr[i] = new int[n];
        }
    }
    catch (exeption xa)
    {
        cout << "Memory Allocation!\n";
        exit(EXIT_FAILURE);
    }
    
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            arr[i][j] = 0;
        }
    }
}

matrixClass::~matrixClass()
{
    if(!arr){
        return;
    }
    for(int i = 0; i < m; i++){
        delete [] arr[i];
    }
    delete [] arr;
}

matrixClass::matrixClass(const matrixClass& object)
{
    m = object.m;
    n = object.n;
    try
    {
        if (n == 0 || m == 0){
            throw SizesMismatch;
        }
        arr = new int*[m];
        for(int i = 0; i < m; i++){
            arr[i] = new int[n];
        }
    }
    catch (exeption xa)
    {
        cout << "Memory Allocation!\n";
        exit(EXIT_FAILURE);
    }
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            arr[i][j] = object.arr[i][j];
        }
    }
}

void matrixClass::fillMatrix()
{
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++)
        {
            cout << "Fill [" << i+1 << "," << j+1 << "] value: ";
            cin >> arr[i][j];
        }
    }
}

void matrixClass::print()
{
    for (int i = 0; i < m; i++)
    {
        for(int j = 0; j < n; j++){
            cout << setw(10) << arr[i][j];
        }
        cout << endl;
    }
}
matrixClass matrixClass::addition(matrixClass B){
    if( m!=B.m || n!=B.n){
        throw SizesMismatch;
    }
    matrixClass C;
    C.setSize(m, n);
    for (int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            C.arr[i][j] = arr[i][j] + B.arr[i][j];
    return C;
}

matrixClass matrixClass::operator+(matrixClass B)
{
    matrixClass C;
    C.setSize(m, n);
    for (int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            C.arr[i][j] = arr[i][j] + B.arr[i][j];
    return C;
}

matrixClass matrixClass::multipl(matrixClass B)
{
    matrixClass C;
    C.setSize(m, B.n);
    for (int i = 0; i < C.m; i++){
        for(int j = 0; j < C.n; j++){
            for(int k = 0; k < n; k++){
                C.arr[i][j] += arr[i][k] * B.arr[k][j];
            };
        }
    }
    return C;
}

matrixClass matrixClass::operator*(matrixClass B)
{
    matrixClass C;
    C.setSize(m, B.n);
    for (int i = 0; i < C.m; i++){
        for(int j = 0; j < C.n; j++){
            for(int k = 0; k < n; k++){
                C.arr[i][j] += arr[i][k] * B.arr[k][j];
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
        if (n == 0 || m == 0){
            throw "Cannot be zero!";
        }
        arr = new int*[m];
        for(int i = 0; i < m; i++){
            arr[i] = new int[n];
        }
    }
    catch (exeption xa)
    {
        cout<<"Memory Allocation!\n";
        exit(EXIT_FAILURE);
    }
    
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            arr[i][j] = obj.arr[i][j];
        }
    }
    return *this;
}
