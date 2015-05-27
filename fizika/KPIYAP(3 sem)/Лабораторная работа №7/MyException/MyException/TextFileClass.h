#ifndef _TEXTFILECLASS_H_
#define _TEXTFILECLASS_H_
#include"Queue.h"
#include"Person.h"
#include"UTeacher.h"
#include<fstream>

class TextFileClass
{
private:

public:
	TextFileClass() {}
	~TextFileClass() {}

	void WritePerson(Queue<Person> & tmp);
	void ReadPerson(Queue<String> * tmp);
	
	void WriteUTeacher(Queue<UTeacher> & tmp1);
	void ReadUTeacher(Queue<String> * stopka);
};

#endif