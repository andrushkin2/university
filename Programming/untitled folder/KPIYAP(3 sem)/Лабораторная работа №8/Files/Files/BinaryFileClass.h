#pragma once
#include"Person.h"
#include"Queue.h"
#include<fstream>
#include<iostream>
using namespace std;

class BinaryFileClass
{
private:

public:
	BinaryFileClass() {}
	~BinaryFileClass() {}

	void WPersonBin(Queue<Person> * tmp1);
	void RPersonBin(Queue<Person> * tmp2);
};