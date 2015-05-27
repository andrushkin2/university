#ifndef _TRIANGLE_H_
#define _TRIANGLE_H_
#include "TwoDShape.h"

class Triangle : public TwoDShape
{
private:
	int x2;
	int y2;
public:
	Triangle(int _x = 0,int _y = 0,int _x2 = 0,int _y2 = 0);
	~Triangle();
	inline int GetX2() { return this->x2; }
	inline int GetY2() { return this->y2; }
	void Set(int _x,int _y,int _x2,int _y2);
	double Area();
	void Input();
};

#endif