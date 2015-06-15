//
//  main.cpp
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include "queueTemplate.h"
#include "clockClass.h"
#include "electro.h"
#include "mechanic.h"
#include <fstream>
#include <iostream>
#include <string>
#include <sstream>
using namespace std;

void stringParse();
string readString(ifstream);

int main(int argc, const char * argv[]) {
    queue<clockClass*> clock;
    queue<clockClass*> elect;
    queue<clockClass*> mech;
    clockClass* x = NULL;
    int select,
        maxsize,
        ch;
    
    ofstream fout;
    ifstream fin;
    
    
    cout << "1: Enter some clock" << endl;
    cout << "2: Read some clock from file" << endl;
    cin >> ch;
    switch (ch)
    {
        case 1:
        {
            system("cls");
            cout << "Input number of created instances: ";
            cin >> maxsize;
            cout << endl;
            for (int i = 0; i < maxsize; i++)
            {
                cout << "Select clock type:\n 1 - Simple clock\n, 2 - Electronic clock\n, 3 - Mechanic clock >";
                cin >> select;
                switch (select)
                {
                    case 1:
                        x = new clockClass;
                        x->Input(cin);
                        clock.Push(x);
                        fout.open("clock.txt", ios::out | ios::binary);
                        x->PrintFromFile(fout);
                        fout.close();
                        
                        break;
                    case 2:{
                        x = new Electronic;
                        x->Input(cin);
                        elect.Push(x);
                        fout.open("elect.txt",ios::out | ios::binary);
                        x->PrintFromFile(fout);
                        fout.close();
                        break;
                    }
                    case 3:{
                        x = new Mechanic();
                        x->Input(cin);
                        fout.open("mech.txt", ios::out | ios::binary);
                        x->PrintFromFile(fout);
                        fout.close();
                        mech.Push(x);

                        break;
                    }
                    default: cout << "Fatal error" << "\n";
                        system("pause");
                        return 1;
                }
            }
            cout << endl << "My clocks:" << endl << endl;

            break;
        }
        case 2:
        {
            for (int i = 1; i <= 3; i++){
                switch (i) {
                    case 1:
                        x = new clockClass;
                        fin.open("clock.txt", ios::in | ios::binary);
                        while (!!fin && !fin.eof()){
                            x->InputToFile(fin);
                            if (fin.eof()){
                                break;
                            }
                            clock.Push(x);
                        }
                        fin.close();
                        break;
                    case 2:
                        x = new Electronic;
                        fin.open("elect.txt", ios::in | ios::binary);
                        while (!!fin && !fin.eof()){
                            x->InputToFile(fin);
                            if (fin.eof()){
                                break;
                            }
                            elect.Push(x);
                        }
                        fin.close();
                        break;
                    case 3:
                        x = new Mechanic;
                        fin.open("mech.txt", ios::in | ios::binary);
                        while (!!fin && !fin.eof()){
                            x->InputToFile(fin);
                            if (fin.eof()){
                                break;
                            }
                            mech.Push(x);
                        }
                        fin.close();
                        break;

                    default:
                        break;
                }
        }
            
    }
    }
    while (!clock.IsEmpty())
    {
        clock.Pop()->Print(cout);
        cout << endl;
    }
    while (!elect.IsEmpty())
    {
        elect.Pop()->Print(cout);
        cout << endl;
    }
    while (!mech.IsEmpty())
    {
        mech.Pop()->Print(cout);
        cout << endl;
    }

    
    system("pause");
    return 0;
}
