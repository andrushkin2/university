#include<iostream>
using namespace std;
#include"String.h"

int main()
{
	setlocale(LC_CTYPE,"Russian");
	String a;
	cout << "Введите a:";
	cin >> a;
	String b;
	cout << "Введите b:";
	cin >> b;
	a = "150505"+ a + b + b + a+"150505";
	cout << "Строка a:" << a;
	cout << "Строка b:" << b;
	String c;
	cout << "Введите c:";
	cin >> c;
	c += "Granny";
	cout << "Строка c:" << c;
	system("pause");
	return 0;
}