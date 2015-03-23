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
            matrixClass A, B;
            
            //work with A matrix
            cout << "Enter an A matrix size: ";
            cin >> m >> n;
            A.setSize(m, n);
            A.fillMatrix();
            system("clear");
            cout<<"A = \n";
            A.print();
            
            //work with B matrix
            cout << "\n\nEnter an B matrix size: ";
            cin >> m >> n;
            B.setSize(m, n);
            B.fillMatrix();
            system("clear");
            cout<<"B = \n";
            B.print();
            
            cout << "\n\nSelect an operation:\n\t1) Addition\n\t2) Multiplication\n\t3) Addition(overwrite)\n\t4) Multiplication(overwrite)\n\t";
            cin >> m;
            
            switch (m)
            {
                case (1):
                    try
                    {
                        matrixClass C(A.addition(B));
                        system("clear");
                        cout<<"A + B = \n";
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix sizes mismatch!\n";
                    }
                    break;
                case (2):
                    try
                    {
                        matrixClass C = A.multipl(B);
                        system("clear");
                        cout<<"A * B = \n";
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix are not consistent!\n";
                    }
                    break;
                case (3):
                    try
                    {
                        matrixClass C = A + B;
                        system("clear");
                        cout<<"A + B = \n";
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix sizes mismatch!\n";
                    }
                    break;
                case (4):
                    try
                    {
                        matrixClass C = A * B;
                        system("clear");
                        cout<<"A * B = \n";
                        C.print();
                    }
                    catch(exeption ex)
                    {
                        cout<<"Matrix are not consistent!\n";
                    }
                    break;
                default:
                    cout<<"Unknown operation has been selected!\n";
            }
        }
        cout<<"\n\nDo you want try again? (type an \"y\" symbol) ";
        cin>>exit;
        
    } while(exit == 'y');
    
    return 0;
}
