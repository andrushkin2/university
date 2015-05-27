#include"Person.h"
#include"String.h"
#include<iostream>
using namespace std;

Person::Person()
{
	this->age = 0;
}

Person::Person(char *_fname,char *_lname,int _age)
{
	this->fname = _fname;
	this->lname = _lname;
	this->age = _age;
}

Person::Person(const Person & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
}

Person::~Person()
{
}

void operator << (std::ostream & os,Person & tmp)
{
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl << endl;
}

void operator >> (std::istream & is,Person & tmp)
{
	cout << "Введите имя:";
	is >> tmp.fname;
	cout << "Введите фамилию:";
	is >> tmp.lname;
	cout << "Введите возраст:";
	is >> tmp.age;
}

void Person::operator = (const Person & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
}