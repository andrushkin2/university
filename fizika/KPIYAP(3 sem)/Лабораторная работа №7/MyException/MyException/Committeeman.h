#ifndef _COMMITTEEMAN_H_
#define _COMMITTEEMAN_H_
#include"Person.h"
#include"String.h"
#include"InpException.h"
#include<iostream>
using namespace std;

class Committeeman : virtual public Person
{
protected:
	String name_com;
	String biogr;
public:
	Committeeman();
	Committeeman(const Committeeman & tmp);
	~Committeeman();
	
	//методы доступа к данным
	inline String GetNameCom() const { return this->name_com; };
	inline String GetBiogr() const { return this->biogr; };
	//методы изменения данных
	inline void SetNameCom(const String & _name_com) { this->name_com = _name_com; };
	inline void SetBiogrCom(const String & _biogr) { this->biogr = _biogr; };
	inline void SetNameCom(const char * _name_com) { this->name_com = _name_com; };
	inline void SetBiogrCom(const char * _biogr) { this->biogr = _biogr; };
	//перегруженные операторы
	friend void operator << (std::ostream & os,Committeeman & tmp);
	friend void operator >> (std::istream & is,Committeeman & tmp);
	void operator = (Committeeman & tmp);
};

#endif