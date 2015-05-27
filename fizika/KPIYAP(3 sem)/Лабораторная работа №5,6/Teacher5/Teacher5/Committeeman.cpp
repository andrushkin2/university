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

	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl;
	os << "Название комиссии:" << tmp.name_com << endl;
	os << "Биография:" << tmp.biogr << endl << endl;
}

void operator >> (std::istream & is,Committeeman & tmp)
{
	cout << "Введите имя:";
	is >> tmp.fname;
	cout << "Введите фамилию:";
	is >> tmp.lname;
	cout << "Введите возраст:";
	is >> tmp.age;
	cout << "Введите имя комиссии:";
	is >> tmp.name_com;
	cout << "Введите биографию:";
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