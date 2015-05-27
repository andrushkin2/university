#pragma once

//класс для работы с контейнером
#include"Queue.h"

//классы содержащие информацию
#include"Person.h"
#include"UTeacher.h"

//системные библиотеки
#include<fstream>
#include<iostream>
using namespace std;

class TextFileClass
{
private:

public:
	TextFileClass() {}
	~TextFileClass() {}

	void WritePerson(Queue<Person> * tmp);
	void ReadPerson(Queue<Person> * tmp);

	void WriteUTeacher(Queue<UTeacher> * tmp);
	void ReadUTeacher(Queue<UTeacher> * tmp);

	bool EmptyPersonFile();
	bool EmptyUTeacherFile();
};
