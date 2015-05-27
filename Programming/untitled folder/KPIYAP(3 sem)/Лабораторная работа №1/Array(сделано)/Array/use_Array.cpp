#include<iostream>
using namespace std;
#include"Array.h"

int main()
{
	setlocale(LC_CTYPE,"Russian");
	Array a(4);
	a.Input();
	Array b(5);
	b.Input();
	Array c;
	c = a + b+a+b+b;
	cout << c;
	Array d(5);
	d.Input();
	d += c;
	cout << d;
    cout << "Минимальный эл-т сумм-х массивов: " << c.Min() << endl;
	cout << "Максимальный эл-т сумм-х массивов: " << c.Max() << endl;
	system("pause");
	return 0;
}