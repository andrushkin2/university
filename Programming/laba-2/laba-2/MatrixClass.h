#ifndef MATRIXCLASS_H_
#define MATRIXCLASS_H_

#include <cstddef>

enum exeption
{
	SizesMismatch,
	NotConsistent
};

class matrix
{
	int **p, m, n;

public:
	matrix() { p = NULL; }
	matrix(const matrix&);
	~matrix();
	void SetSize(const int, const int);
	void fill();
	void print();
	matrix operator+(matrix);
	matrix operator*(matrix);
	matrix operator=(matrix);
};

#endif