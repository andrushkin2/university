#ifndef _THREEDSHAPE_H_
#define _THREEDSHAPE_H_
#include"Shape.h"

class ThreeDShape : public Shape
{
private:
	int radius;
public:
	ThreeDShape( int _radius = 0);
	~ThreeDShape() {};
	int GetRadius() { return this->radius; }
	void Set(int _radius) { radius = _radius; }
	double Volume() { return 0; };
	double Area() { return 0; };
};

#endif