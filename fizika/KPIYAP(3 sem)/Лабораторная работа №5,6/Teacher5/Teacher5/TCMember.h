#ifndef _TCMEMBER_H_
#define _TCMEMBER_H_
#include"Committeeman.h"
#include"UTeacher.h"
#include"String.h"
#include<iostream>

class TCMember : public UTeacher,public Committeeman
{
protected:
	String scientific_works_in_com[50];
	int count_works_in_com;
	int max_num_of_works_in_com;
public:
	TCMember();
	TCMember(const TCMember & tmp);
	~TCMember();
	friend void operator << (std::ostream & os,TCMember & tmp);
	friend void operator >> (std::istream & is,TCMember & tmp);
	void operator = (const TCMember & tmp);
};

#endif