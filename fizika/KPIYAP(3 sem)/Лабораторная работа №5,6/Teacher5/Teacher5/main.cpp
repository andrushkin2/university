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
		cout << "               МЕНЮ" << endl;
		cout << " 1 - Добавить информацию(класс Person)" << endl;
		cout << " 2 - Показать список с информацией(класс Person)" << endl << endl;
		cout << " 3 - Добавить информацию(класс UTeacher)" << endl;
		cout << " 4 - Показать список с информацией(класс UTeacher)" << endl << endl;
		cout << " 5 - Добавить информацию(класс Committeeman)" << endl;
		cout << " 6 - Показать список с информацией(класс Committeeman)" << endl << endl;
		cout << " 7 - Добавить информацию(класс TCMember)" << endl;
		cout << " 8 - Показать список с информацией(класс TCMember)" << endl << endl;
		cout << " a - Удалить(класс Person)" << endl;
		cout << " b - Удалить(класс UTeacher)" << endl << endl;
		cout << " c - Удалить(класс Committeeman)" << endl;
		cout << " d - Удалить(класс TCMember)" << endl << endl;
		cout << " e - Добавить информацию(итератор класс Person)" << endl;
		cout << " f - Показать информацию(итератор класс Person)" << endl;
		cout << " 0 - Выйти" << endl;
		cout << "Выберите команду:";
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
				cout << "Размер очереди:" << data1.GetSize() << endl;
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
				cout << "Размер очереди:" << data2.GetSize() << endl;
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
                cout << "Размер очереди:" << data3.GetSize() << endl;
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
                cout << "Размер очереди:" << data4.GetSize() << endl;
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
				cout << "Размер очереди:" << data5.GetSize() << endl;
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
