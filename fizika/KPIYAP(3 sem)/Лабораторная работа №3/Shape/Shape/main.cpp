#include<iostream>
using namespace std;
#include"Shape.h"
#include"Circle.h"
#include"Rectangle.h"
#include"Triangle.h"
#include"Sphere.h"
#include"Cylinder.h"
#include"Parallelepiped.h"

int main()
{
	setlocale(LC_CTYPE,"Russian");
	//
	Sphere tmp(5);
	Shape *p = &tmp;
	cout << p->Volume() << endl;
	//
	system("pause");
	return 0;
}