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
	os << "���:" << tmp.fname << endl;
	os << "�������:" << tmp.lname << endl;
	os << "�������:" << tmp.age << endl << endl;
}

void operator >> (std::istream & is,Person & tmp)
{
	cout << "������� ���:";
	is >> tmp.fname;
	cout << "������� �������:";
	is >> tmp.lname;
	cout << "������� �������:";
	is >> tmp.age;
}

void Person::operator = (const Person & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
}