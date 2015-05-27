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
	os << "���:" << tmp.fname << endl;
	os << "�������:" << tmp.lname << endl;
	os << "�������:" << tmp.age << endl;
	os << "���������:" << tmp.official_capacity << endl;
	os << "�������������:" << tmp.specialty << endl;
	os << "������ ������� �����:" << endl;
	for(int i = 0;i < tmp.count_works;i++)
	{
		os << "   " << tmp.scientific_works[i] << endl;
	}
	os << "num_max_of_works:" << tmp.max_num_of_works << endl;
	os << "count_works:" << tmp.count_works << endl;
}

void operator >> (std::istream & is,UTeacher & tmp)
{
	cout << "������� ���:";
	is >> tmp.fname;
	cout << "������� �������:";
	is >> tmp.lname;
	cout << "������� �������:";
	is >> tmp.age;
	cout << "������� ���������:";
	is >> tmp.official_capacity;
	cout << "������� �������������:";
	is >> tmp.specialty;
	String tmp_cin;
	cout << "   ���� ������ ������� �����:" << endl;
	for(int i = 0;i < tmp.max_num_of_works;i++)
	{
		cout << "������� ������� ������ #" << i + 1 << ":";
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


