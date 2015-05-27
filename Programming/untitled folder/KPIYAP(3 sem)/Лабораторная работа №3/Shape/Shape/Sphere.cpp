#include"Sphere.h"
#include<iostream>
using namespace std;
#include<cmath>

Sphere::Sphere(int _radius) : ThreeDShape(_radius)
{
	//ThreeDShape::Set(_radius);
	//this->radius = _radius;
}

Sphere::~Sphere()
{
}
/*
void Sphere::Set(int _radius)
{
	ThreeDShape::Set(_radius);
	//this->radius = _radius;
}
*/
double Sphere::Volume()
{
	double volume;
	return volume = (4 * 3.14 * this->GetRadius() * this->GetRadius() * this->GetRadius())/3;
}

double Sphere::Area()
{
	double area;
	return area = 4 * 3.14 * this->GetRadius() * this->GetRadius();
}

void Sphere::Input()
{
	int tmp;
	cout << "¬ведите радиус:";
	cin >> tmp;
	ThreeDShape::Set(tmp);
}