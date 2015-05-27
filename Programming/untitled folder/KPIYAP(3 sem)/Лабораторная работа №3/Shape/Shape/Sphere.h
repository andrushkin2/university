#ifndef _SPHERE_H_
#define _SPHERE_H_
#include"ThreeDShape.h"

class Sphere : public ThreeDShape
{
private:
	//int radius;
public:
	Sphere(int _radius = 0);
	~Sphere();
	//inline int GetRadius() { return this->radius; }
	//void Set(int _radius);
	double Volume();
	double Area();
	void Input();
};

#endif