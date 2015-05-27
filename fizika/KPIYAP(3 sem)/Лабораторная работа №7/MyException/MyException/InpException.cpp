#include"InpException.h"
#include<iostream>
using namespace std;

InpException::InpException(int _number)
{
	this->number = _number;
	switch(_number)
	{
	case 1 :
		{
			this->name = "You don't enter correct first name!";
			break;
		}
	case 2 :
		{
			this->name = "You don't enter correct last name!";
			break;
		}
	case 3 :
		{
			this->name = "You don't enter correct age!";
			break;
		}
	case 4 :
		{
			this->name = "You don't enter correct capacity!";
			break;
		}
	case 5 :
		{
			this->name = "You don't enter correct specialty!";
			break;
		}
	case 6 :
		{
			this->name = "You don't enter correct scientific work!";
			break;
		}
	case 7 :
		{
			this->name = "You don't enter correct name of commision!";
			break;
		}
	case 8 :
		{
			this->name = "You don't enter correct biography!";
			break;
		}
	case 9 :
		{
			this->name = "You don't enter correct scientific work in commission!";
			break;
		}
	case 10 :
		{
			this->name = "You don't enter number or get into next line.!!";
			break;
		}
	}
}

InpException::InpException(const InpException & tmp)
{
	this->number = tmp.number;
	this->name = tmp.name;
}

InpException::~InpException()
{
}

void operator << (std::ostream & os,InpException & tmp)
{
	 os << "Код исключения:" << tmp.number << endl 
		<< "Причина исключения:" << tmp.name << endl << endl;
}