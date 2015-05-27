#pragma once

//����� ��� ������ � �����������
#include"Queue.h"

//������ ���������� ����������
#include"Person.h"
#include"UTeacher.h"

//��������� ����������
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
