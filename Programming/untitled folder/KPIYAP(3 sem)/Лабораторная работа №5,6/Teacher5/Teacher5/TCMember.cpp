#include"TCMember.h"
#include"String.h"
#include<iostream>
using namespace std;

TCMember::TCMember()
{
	count_works_in_com = 0;
	max_num_of_works_in_com = sizeof(this->scientific_works_in_com) / sizeof(String);
}

TCMember::TCMember(const TCMember & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;

	this->official_capacity = tmp.official_capacity;
	this->specialty = tmp.specialty;
	this->count_works = tmp.count_works;
	this->max_num_of_works = tmp.max_num_of_works;
	for(int i = 0;i < this->max_num_of_works;i++)
		this->scientific_works[i] = tmp.scientific_works[i];

		this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
	

	this->count_works_in_com = tmp.count_works_in_com;
	this->max_num_of_works_in_com = tmp.max_num_of_works_in_com;
	for(int i = 0;i < this->max_num_of_works_in_com;i++)
		this->scientific_works_in_com[i] = tmp.scientific_works_in_com[i];
}

TCMember::~TCMember()
{
}

void operator << (std::ostream & os,TCMember & tmp)
{
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl;

	os << "Должность:" << tmp.official_capacity << endl;
	os << "Специальность:" << tmp.specialty << endl;
	os << "Список научных работ:" << endl;
	for(int i = 0;i < tmp.count_works;i++)
	{
		os << "Работа №" << i + 1 << ":" << tmp.scientific_works[i] << endl;
	}
	os << "num_max_of_works:" << tmp.max_num_of_works << endl;
	os << "count_works:" << tmp.count_works << endl;

	os << "Название комиссии:" << tmp.name_com << endl;
	os << "Биография:" << tmp.biogr << endl;
	
	os << "Список научных работ в комиссии:" << endl;
	for(int i = 0;i < tmp.count_works_in_com;i++)
	{
		os << "Работа №" << i + 1 << ":" << tmp.scientific_works_in_com[i] << endl;
	}
	os << endl;
}

void operator >> (std::istream & is,TCMember & tmp)
{
	cout << "Введите имя:";
	is >> tmp.fname;
	cout << "Введите фамилию:";
	is >> tmp.lname;
	cout << "Введите возраст:";
	is >> tmp.age;

	cout << "Введите должность:";
	is >> tmp.official_capacity;
	cout << "Введите специальность:";
	is >> tmp.specialty;
	String tmp_cin;
	cout << "   Ввод списка научных работ:" << endl;
	for(int i = 0;i < tmp.max_num_of_works;i++)
	{
		cout << "Введите научную работу #" << i + 1 << ":";
		is >> tmp_cin;
		if(tmp_cin == "end")
			break;
		tmp.scientific_works[i] = tmp_cin;
		tmp.count_works++;
	}

	cout << "Введите имя комиссии:";
	is >> tmp.name_com;
	cout << "Введите биографию:";
	is >> tmp.biogr;

	String tmp_cin2;
	cout << "   Ввод списка научных работ в комиссии:" << endl;
	for(int i = 0;i < tmp.max_num_of_works_in_com;i++)
	{
		cout << "Введите научную работу #" << i + 1 << ":";
		is >> tmp_cin2;
		if(tmp_cin2 == "end")
			break;
		tmp.scientific_works_in_com[i] = tmp_cin2;
		tmp.count_works_in_com++;
	}
}

void TCMember::operator = (const TCMember & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;

	this->official_capacity = tmp.official_capacity;
	this->specialty = tmp.specialty;
	this->count_works = tmp.count_works;
	this->max_num_of_works = tmp.max_num_of_works;
	for(int i = 0;i < this->max_num_of_works;i++)
		this->scientific_works[i] = tmp.scientific_works[i];

		this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;

	this->count_works_in_com = tmp.count_works_in_com;
	this->max_num_of_works_in_com = tmp.max_num_of_works_in_com;
	for(int i = 0;i < this->max_num_of_works_in_com;i++)
		this->scientific_works_in_com[i] = tmp.scientific_works_in_com[i];
}