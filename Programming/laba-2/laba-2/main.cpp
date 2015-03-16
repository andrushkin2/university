#include <iostream>
#include "MatrixClass.h"

using namespace std;

int main()
{
	
	int m, n;
	char exit;
	do
	{
		{
			system("cls");
			matrix A, B, C;
			cout<<"Input matrix A sizes: ";
			cin>>m>>n;

			A.SetSize(m, n);
			A.fill();
			A.print();

			cout<<"Input matrix B sizes: ";
			cin>>m>>n;

			B.SetSize(m, n);
			B.fill();
			B.print();

			cout<<"Select operation: "<<endl<<"1. add"<<endl<<"2. mull"<<endl;
			cin>>m;

			switch (m)
			{
			case (1):
				try
				{
					C = A + B;
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
					cout<<"A * B = "<<endl;
					C.print();
				}
				catch(exeption ex)
				{
					cout<<"Matrix a not consistent!"<<endl;
				}
				break;
			default:
				cout<<"Select error!"<<endl;
			}
		}
		cout<<"Exit? (type \"y\" for exit) ";
		cin>>exit;

	} while(exit!='y');

	return 0;
}