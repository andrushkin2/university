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
		cout << " 1 - ������ �����" << endl;
		cout << " 2 - �������� ���������� �������" << endl;
		cout << " 3 - �������" << endl;
		cout << " 0 - �����" << endl;
		cout << "    �������� �������:";
		cin.sync();
		switch(cin.get())
		{
		case '1' : 
			{
				system("cls");
				do
				{
					cout << "������� �����:";
					cin >> tmp;
					a.Push(tmp);
					cout << "���������� ����?(0 - �����)";
					cin.sync();
				}while(cin.get() != '0');
				break;
			}
		case '2' :
			{
				system("cls");
				a.Show();
				cout << "������ �������:" << a.GetSize() << endl;
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