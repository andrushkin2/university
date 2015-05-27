#include"Committeeman.h"
#include<iostream>
using namespace std;

Committeeman::Committeeman() : Person()
{
}

Committeeman::Committeeman(const Committeeman & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
}

Committeeman::~Committeeman()
{
}

void operator << (std::ostream & os,Committeeman & tmp)
{
	//os << setw(10) << tmp.fname << setw(10) << tmp.lname << setw(5) << tmp.age 

	os << "���:" << tmp.fname << endl;
	os << "�������:" << tmp.lname << endl;
	os << "�������:" << tmp.age << endl;
	os << "�������� ��������:" << tmp.name_com << endl;
	os << "���������:" << tmp.biogr << endl << endl;
}

void operator >> (std::istream & is,Committeeman & tmp)
{
	cout << "������� ���:";
	is >> tmp.fname;
	cout << "������� �������:";
	is >> tmp.lname;
	cout << "������� �������:";
	is >> tmp.age;
	cout << "������� ��� ��������:";
	is >> tmp.name_com;
	cout << "������� ���������:";
	is >> tmp.biogr;
}

void Committeeman::operator = (Committeeman & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
}