#pragma once

#include"String.h"
#include"InpException.h"
#include<iostream>
using namespace std;

class Person
{
public:
	String fname;
	String lname;
	int age;
public:
	Person();
	Person(char *_fname,char *_lname,int _age);
	Person(const Person & tmp);
	~Person();
	//methods-accessors
	inline String GetFname() const { return this->fname; };
	inline char * GetFnameChar() const { return fname.GetStringChar(); };
	inline String GetLname() const { return this->lname; };
	inline char * GetLnameChar() const { return lname.GetStringChar(); };
	inline int GetAge() const { return this->age; };
	//
	//set-methods
	void SetFname(const String & _fname) { this->fname = _fname; };
	void SetLname(const String & _lname) { this->lname = _lname; };
	void SetFname(const char * _fname) { this->fname = _fname; };
	void SetLname(const char * _lname) { this->lname = _lname; };
	void SetAge(const int _age) { this->age = _age; };
	//
	friend void operator << (std::ostream & os,Person & tmp);
	friend void operator >> (std::istream & is,Person & tmp);
	void operator = (const Person & tmp);
};