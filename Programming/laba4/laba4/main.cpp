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

int main(int argc, const char * argv[]) {
    queue<clockClass*> cl;
    clockClass* x = NULL;
    int select,
        maxsize,
        ch;
    
    
    ofstream fout("myclock.txt",ios::app);
    ifstream fin("myclock.txt");
    
    
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
                    case 1:	x = new clockClass;
                        break;
                    case 2:	x = new Electronic;
                        break;
                    case 3:	x = new Mechanic;
                        break;
                    default: cout << "Fatal error" << "\n";
                        system("pause");
                        return 1;
                }
                x->Input(cin);
                cl.Push(x);
            }
            cout << endl << "My clocks:" << endl << endl;
            while (!cl.IsEmpty())
            {
                cl.Pick()->PrintFromFile(fout);
                cl.Pop()->Print(cout);
                cout << endl;
            }
            break;
        }
        case 2:
        {
            string line;
            while (!!fin && !fin.eof())
            {
                fin >> line;
                switch (line.at(0))
                {
                    case 'c':	x = new clockClass;
                        break;
                    case 'e':	x = new Electronic;
                        break;
                    case 'm':	x = new Mechanic;
                        break;
                    default: cout << "Input error" << "\n";
                        system("pause");
                        return 1;
                }
                x->InputToFile(fin);
                cl.Push(x);
            }
            cout << endl << "My clocks:" << endl << endl;
            while (!cl.IsEmpty())
            {
                cl.Pop()->Print(cout);
                cout << endl;
            }
            break;
        }
    }
    
    fout.close();
    system("pause");
    return 0;
}
