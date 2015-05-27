#include<iostream>

#include"Queue.h"
using namespace std;
int main()
{
	setlocale(LC_CTYPE,"Russian");
	Queue<int> a;
	for(int i = 0;i < 5;i++)
		a.Push(i + 1);
	cout << endl << endl;
	Queue<int>::Iterator iter = a.Begin();
	for(Queue<int>::Iterator iter = a.Begin();iter != a.End();iter++)
		cout << *iter << endl;
	/*
	int tmp = 0;
	while(1)
	{
		system("cls");
		cout << " 1 - Ввести число" << endl;
		cout << " 2 - Показать содержимое очереди" << endl;
		cout << " 3 - Удалить" << endl;
		cout << " 0 - Выйти" << endl;
		cout << "    Выберите команду:";
		cin.sync();
		switch(cin.get())
		{
		case '1' : 
			{
				system("cls");
				do
				{
					cout << "Введите число:";
					cin >> tmp;
					a.Push(tmp);
					cout << "Продолжить ввод?(0 - выйти)";
					cin.sync();
				}while(cin.get() != '0');
				break;
			}
		case '2' :
			{
				system("cls");
				a.Show();
				cout << "Размер очереди:" << a.GetSize() << endl;
				system("pause");
				break;
			}
		case '3' :
			{
				system("cls");
				a.Delete();
				system("pause");
				break;
			}
		case '0' :
			{
				return 0;
			}
		}
	}
	*/
	system("pause");
	return 0;
}