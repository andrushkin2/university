#ifndef _CYLINDER_H_
#define _CYLINDER_H_
#include"ThreeDShape.h"

class Cylinder : public ThreeDShape
{
private:
	int height;
public:
	Cylinder(int _radius = 0,int _height = 0);
	~Cylinder();
	//inline int GetRadius() { return this->radius; };
	inline int GetHeight() { return this->height; };
	//void Set(int _radius,int _height);
	double Volume();
	double Area();
	void Input();
};

#endif