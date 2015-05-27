#ifndef _INPEXCEPTION_H_
#define _INPEXCEPTION_H_
#include"MyExcaption.h"
#include"String.h"
#include"Queue.h"
#include<iostream>

class InpException : public MyException
{
private :
	int number;
	String name;
public :
	InpException(int _number = 0);
	InpException(const InpException & tmp);
	~InpException();
	
	friend void operator << (std::ostream & os,InpException & tmp);
};

#endif