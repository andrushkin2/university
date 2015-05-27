#include<iostream>
using namespace std;
#include"Person.h"
#include"Queue.h"
#include"String.h"
#include"UTeacher.h"
#include"Committeeman.h"
#include"TCMember.h"

int main()
{
	setlocale(LC_CTYPE,"Russian");
	Queue<Person> data1;
	Queue<UTeacher> data2;
	Queue<Committeeman> data3;
	Queue<TCMember> data4;
	Queue<Person> data5;
	while(1)
	{
		system("cls");
		cout << "               ����" << endl;
		cout << " 1 - �������� ����������(����� Person)" << endl;
		cout << " 2 - �������� ������ � �����������(����� Person)" << endl << endl;
		cout << " 3 - �������� ����������(����� UTeacher)" << endl;
		cout << " 4 - �������� ������ � �����������(����� UTeacher)" << endl << endl;
		cout << " 5 - �������� ����������(����� Committeeman)" << endl;
		cout << " 6 - �������� ������ � �����������(����� Committeeman)" << endl << endl;
		cout << " 7 - �������� ����������(����� TCMember)" << endl;
		cout << " 8 - �������� ������ � �����������(����� TCMember)" << endl << endl;
		cout << " a - �������(����� Person)" << endl;
		cout << " b - �������(����� UTeacher)" << endl << endl;
		cout << " c - �������(����� Committeeman)" << endl;
		cout << " d - �������(����� TCMember)" << endl << endl;
		cout << " e - �������� ����������(�������� ����� Person)" << endl;
		cout << " f - �������� ����������(�������� ����� Person)" << endl;
		cout << " 0 - �����" << endl;
		cout << "�������� �������:";
		cin.sync();
		switch(cin.get())
		{
		case '1' :
			{
				Person tmp1;
				system("cls");
				cin >> tmp1;
				data1.Push(tmp1);
				break;
			}
		case '2' :
			{
				system("cls");
				cout << "������ �������:" << data1.GetSize() << endl;
				data1.Show();
				system("pause");
				break;
			}
		case '3' :
			{
				UTeacher tmp2;
				system("cls");
				cin >> tmp2;
				data2.Push(tmp2);
				break;
			}
		case '4' :
			{
				system("cls");
				data2.Show();
				cout << "������ �������:" << data2.GetSize() << endl;
				system("pause");
				break;
			}
		case '5' :
			{
				Committeeman tmp3;
				system("cls");
				cin >> tmp3;
				data3.Push(tmp3);
				break;
			}
		case '6' :
			{
				system("cls");
				data3.Show();
                cout << "������ �������:" << data3.GetSize() << endl;
				system("pause");
				break;
			}
		case '7' :
			{
				TCMember tmp4;
				system("cls");
				cin >> tmp4;
				data4.Push(tmp4);
				break;
			}
		case '8' :
			{
				system("cls");
				data4.Show();
                cout << "������ �������:" << data4.GetSize() << endl;
				system("pause");
				break;
			}
		case 'a' :
			{
				system("cls");
				data1.Delete();
				system("pause");
				break;
			}
		case 'b' :
			{
				system("cls");
				data2.Delete();
				system("pause");
				break;
			}
		case 'c' :
			{
				system("cls");
				data3.Delete();
				system("pause");
				break;
			}
		case 'd' :
			{
				system("cls");
				data4.Delete();
				system("pause");
				break;
			}
		case 'e' :
			{
				Person tmp;
				system("cls");
				cin >> tmp;
				data5.Push(tmp);
				break;
			}
		case 'f' :
			{
				system("cls");
				cout << "������ �������:" << data5.GetSize() << endl;
				Queue<Person>::Iterator iter = data5.Begin();
				do
				{
					cout << *iter;
					iter++;
				}while(iter != data5.End());
				system("pause");
				break;
			}
		case '0' :
			{
				return 0;
			}
		}
	}
	system("pause");
	return 0;
}
