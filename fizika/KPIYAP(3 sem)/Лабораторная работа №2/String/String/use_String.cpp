#include<iostream>
using namespace std;
#include"String.h"

int main()
{
	setlocale(LC_CTYPE,"Russian");
	String a;
	cout << "������� a:";
	cin >> a;
	String b;
	cout << "������� b:";
	cin >> b;
	a = "150505"+ a + b + b + a+"150505";
	cout << "������ a:" << a;
	cout << "������ b:" << b;
	String c;
	cout << "������� c:";
	cin >> c;
	c += "Granny";
	cout << "������ c:" << c;
	system("pause");
	return 0;
}