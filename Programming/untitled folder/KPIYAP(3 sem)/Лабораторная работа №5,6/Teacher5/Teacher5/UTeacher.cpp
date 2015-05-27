#include"UTeacher.h"
#include"String.h"
#include<iostream>
using namespace std;

UTeacher::UTeacher() : Person()
{
	count_works = 0;
	max_num_of_works = sizeof(this->scientific_works) / sizeof(String);
}

UTeacher::UTeacher(const UTeacher & tmp)
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
}

UTeacher::~UTeacher()
{
}

void operator << (std::ostream & os,UTeacher & tmp)
{
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl;
	os << "Должность:" << tmp.official_capacity << endl;
	os << "Специальность:" << tmp.specialty << endl;
	os << "Список научных работ:" << endl;
	for(int i = 0;i < tmp.count_works;i++)
	{
		os << "   " << tmp.scientific_works[i] << endl;
	}
	os << "num_max_of_works:" << tmp.max_num_of_works << endl;
	os << "count_works:" << tmp.count_works << endl;
}

void operator >> (std::istream & is,UTeacher & tmp)
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
}

void UTeacher::operator = (const UTeacher & tmp)
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
}


