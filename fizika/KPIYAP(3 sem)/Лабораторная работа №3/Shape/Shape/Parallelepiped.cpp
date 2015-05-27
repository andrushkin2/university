#include "Parallelepiped.h"
#include<iostream>
using namespace std;

Parallelepiped::Parallelepiped(int _height,int _width,int _length)
{
	this->height = _height;
	this->width = _width;
	this->length = _length;
}
	
Parallelepiped::~Parallelepiped()
{
}

void Parallelepiped::Set(int _height,int _width,int _length)
{
	this->height = _height;
	this->width = _width;
	this->length = _length;
}

double Parallelepiped::Area()
{
	return 6 * width * length;
}

double Parallelepiped::Volume()
{
	return height * width * length;
}

void Parallelepiped::Input()
{
	cout << "¬ведите длину:";
	cin >> length;
	cout << "¬ведите ширину:";
	cin >> width;
	cout << "¬ведите длину:";
	cin >> length;
}