#ifndef _PARALLELEPIPED_H_
#define _PARALLELEPIPED_H_
#include"ThreeDShape.h"

class Parallelepiped : public ThreeDShape
{
private:
	int height;
	int width;
	int length;
public:
	Parallelepiped(int _height = 0,int _width = 0,int _length = 0);
	~Parallelepiped();
	inline int GetHeight() { return this->height; };
	inline int GetWidth() { return this->width; };
	inline int GetLength() { return this->length; };
	void Set(int _height,int _width,int _length);
	double Area();
	double Volume();
	void Input();
};

#endif