#ifndef _TWODSHAPE_H_
#define _TWODSHAPE_H_
#include"Shape.h"
#include<iostream>
using namespace std;
class TwoDShape : public Shape
{
private:
	int x;
	int y;
public:
	TwoDShape(int _x = 0,int _y = 0);
	~TwoDShape();
	inline int GetX() { return this->x; }
	inline int GetY() { return this->y; }
	void Set(int _x,int _y);
	double Area() { return 0; }
	double Volume() { cout <<"Невозможно вычислить объем у 2D фигур!!" << endl;return 0; }
};

#endif