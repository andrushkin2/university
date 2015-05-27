#include"Cylinder.h"
#include<iostream>
using namespace std;

Cylinder::Cylinder(int _radius,int _height):ThreeDShape(_radius)
{
	//this->radius = _radius;
	//ThreeDShape::Set(_radius);
	this->height = _height;
}

Cylinder::~Cylinder()
{
}
/*
void Cylinder::Set(int _radius,int _height)
{
	this->radius = _radius;
	this->height = _height;
}
*/
double Cylinder::Volume()
{
	return 3.14 * this->GetRadius() * this->GetRadius() * height;
}

double Cylinder::Area()
{
	return 2 * 3.14 * this->GetRadius() * (this->GetRadius() + height);
}

void Cylinder::Input()
{
	int tmp;
	cout << "¬ведите радиус:";
	cin >> tmp;
	ThreeDShape::Set(tmp);
	cout << "¬ведите высоту:";
	cin >> height;
}