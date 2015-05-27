//
//  main.cpp
//  Example files
//
//  Created by Andrei Kozyakov on 25.05.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include <stdlib.h>
#include <stdio.h>
#include <iomanip>
#include <fstream>
#include <istream>
using namespace std;

struct A{
    char p[40];
    char s[20];
    int names;
};

class stud{
    A a;
    public:
    void writeData();
    void showData();
};

void stud::writeData(){
    char c = 'n';
    fstream file;
    file.open("FILE.dat", ios::out | ios::binary);
    
    cout << "Vvod info\n";
    do {
        cout << "Vvod FIO\n";
        cin.getline(a.p, 40);
        
        cout << "Vvod pin\n";
        cin.getline(a.s, 20);

        cout << "Vvod number\n";
        cin >> a.names;
        
        file.write(reinterpret_cast<char*>(&a), sizeof(a));
    } while (c == 'y');
    
    file.close();
}

void stud::showData(){
    fstream file;
    file.open("FILE.dat", ios::in | ios::binary);
    
    cout << setw(15)<< "client" << setw(15)<< "pin" << setw(15)<<"Number\n";
    while(1){
        file.read(reinterpret_cast<char*>(&a), sizeof(a));
        if (file.eof()){
            break;
        } else {
            cout << setw(15)<< a.p << setw(15)<< a.s << setw(15)<< a.p << endl;
        }
    }
    
    file.close();
}

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    
    fstream infile;
    infile.seekg(0);// указатель на начало файла
    
    return 0;
}
