#ifndef _SHAPE_H_
#define _SHAPE_H_

class Shape
{
private:

public:
	Shape()
	{
		//cout << "Constr Shape" << endl;
	}
	virtual ~Shape() {}
	virtual double Area()=0;
	virtual double Volume()=0;
};

#endif