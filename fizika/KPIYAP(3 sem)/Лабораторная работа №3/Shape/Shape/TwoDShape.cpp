#include"TwoDShape.h"

TwoDShape::TwoDShape(int _x,int _y)
{
	this->x = _x;
	this->y = _y;
}

TwoDShape::~TwoDShape()
{
}

void TwoDShape::Set(int _x,int _y)
{
	this->x = _x;
	this->y = _y;
}