#ifndef _UTEACHER_H_
#define _UTEACHER_H_
#include"Person.h"
#include"String.h"
#include<iostream>
using namespace std;

class UTeacher : virtual public Person
{
protected:
	String official_capacity;
	String specialty;
	int count_works;
	int max_num_of_works;
public:
	String scientific_works[50];
	//конструкторы
	UTeacher();
	UTeacher(const UTeacher & tmp);
	~UTeacher();
	//methods-accessors
	inline String GetOfficialCapacity() const { return this->official_capacity; };
	inline String GetSpecialty() const { return this->specialty; };
	inline int GetCountWorks() const { return this->count_works; };
	inline int GetMaxNumOfWorks() const { return this->max_num_of_works; };
	//
	//set-methods
	inline void SetOfficialCapacity(const String & _official_capacity) { this->official_capacity = _official_capacity; };
	inline void SetSpecialty(const String & _specialty) { this->specialty = _specialty; };
	inline void SetOfficialCapacity(const char * _official_capacity) { this->official_capacity = _official_capacity; };
	inline void SetSpecialty(const char * _specialty) { this->specialty = _specialty; };
	inline void SetCountWorks(const int _count_of_works) { this->count_works = _count_of_works; };
	//перегруженные операторы
	friend void operator << (std::ostream & os,UTeacher & tmp);
	friend void operator >> (std::istream & is,UTeacher & tmp);
	void operator = (const UTeacher & tmp);

	String operator [] (int i)
	{
		// дописать тут потом проверку на границы массива
		return scientific_works[i];
	}
	//
};

#endif