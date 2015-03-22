//
//  main.cpp
//  laba2
//
//  Created by Andrei Kozyakov on 17.03.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#include <iostream>
#include "arrayClass.h"
using namespace std;

int main(int argc, const char * argv[]) {
    int m, n;
    char exit;
    do
    {
        {
            system("clear");
            matrixClass A, B, C;
            
            //work with A matrix
            cout << "Enter an A matrix size: ";
            cin >> m >> n;
            A.SetSize(m, n);
            A.fill();
            system("clear");
            A.print();
            
            //work with B matrix
            cout << "\n\nEnter an B matrix size: ";
            cin >> m >> n;
            B.SetSize(m, n);
            B.fill();
            system("clear");
            B.print();
            
            cout << "\n\nSelect an operation:\n\t1) add\n\t2) mull\n\t";
            cin >> m;
            
            switch (m)
            {
                case (1):
                    try
                    {
                        C = A + B;
                        system("clear");
                        cout<<"A + B = "<<endl;
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix sizes mismatch!"<<endl;
                    }
                    break;
                case (2):
                    try
                    {
                        C = A * B;
                        system("clear");
                        cout<<"A * B = "<<endl;
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix a not consistent!"<<endl;
                    }
                    break;
                default:
                    cout<<"Unknown operation has been selected!"<<endl;
            }
        }
        cout<<"\n\nDo you want try again? (type an \"y\" symbol) ";
        cin>>exit;
        
    } while(exit == 'y');
    
    return 0;
}
