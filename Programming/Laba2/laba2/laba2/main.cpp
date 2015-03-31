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

void workWithClass(matrixClass&, string);
void multFunction(matrixClass&, matrixClass&, bool);


int main(int argc, const char * argv[]) {
    int m;
    char exit;
    do
    {
        {
            system("clear");
            matrixClass A, B;
            
            //work with A matrix
            workWithClass(A, "A");
            
            //work with B matrix
            workWithClass(B, "B");
            
            cout << "\n\nSelect an operation:\n\t1) Addition\n\t2) Multiplication\n\t3) Addition(overload)\n\t4) Multiplication(overload)\n\t";
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
                        matrixClass C, D;
                        C = D = A * B;
                        system("clear");
                        cout<<"A * B = \n";
                        D.print();
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

void workWithClass(matrixClass & object, string name = "Unknown name"){
    int m, n;
    cout << "Enter an "+ name +" matrix size: ";
    cin >> m >> n;
    object.setSize(m, n);
    object.fillMatrix();
    system("clear");
    cout << name + " = \n";
    object.print();
}
