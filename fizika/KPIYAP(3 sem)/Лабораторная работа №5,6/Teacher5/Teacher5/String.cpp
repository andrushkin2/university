#define _CRT_SECURE_NO_WARNINGS
#include"String.h"
#include<cstring>
#include<iostream>
using namespace std;
//конструктор по умолчанию
String::String(int _length)
{
	this->length = _length;
	this->mystring = new char [this->length];
	strcpy(this->mystring,"");
	//cout << "Конструктор отработал!" << endl;
}
//конструктор
String::String(char str[]) // здесь вначале не нужен деструктор вроде //delete [] this->mystring;
{
	this->length = strlen(str);
	this->mystring = new char [this->length + 1];
	strcpy(this->mystring,str);
}
//конструктор копирования
String::String(const String & str) // здесь вначале не нужен деструктор вроде //delete [] this->mystring;
{
	this->length = str.GetLength();
	this->mystring = new char [this->length + 1];
	strcpy(this->mystring,str.mystring);
}
//деструктор
String::~String()
{
	delete [] this->mystring;
	//cout << "Деструктор отработал!" << endl;
}
//перегруженный оператор вывода
ostream & operator << (ostream & os,String & str)
{
	return os << str.mystring;
}
//перегруженный оператор ввода

istream & operator >> (istream & is,String & str)
{

	delete [] str.mystring;
	char buf[256];
	is.sync();
	is.getline(buf,sizeof buf);
	str.length = strlen(buf);
	str.mystring = new char [str.length + 1];
	strcpy(str.mystring,buf);
	return is;
}


//перегруженный оператор присваивания String - String
void String::operator = (const String & tmp)
{
	delete [] this->mystring;
	this->length = tmp.GetLength();
	this->mystring = new char [this->length + 1];
	strcpy(this->mystring,tmp.mystring);
}
//перегруженный оператор присваивания String - char *
void String::operator = (char * str)
{
	delete [] this->mystring;
	this->length = strlen(str);
	this->mystring = new char [this->length + 1];
	strcpy(this->mystring,str);
}
//перегруженный оператор присваивания String - char str[]
void String::operator = (const char str[])
{
	delete [] this->mystring;
	this->length = strlen(str);
	this->mystring = new char [this->length + 1];
	strcpy(this->mystring,str);
}
//перегруженный оператор сравнени на равенство String - String
bool String::operator == (const String & tmp) const
{
	if(!strcmp(this->mystring,tmp.mystring))
		return true;
	else
		return false;
}
//перегруженный оператор сравнени на равенство String - char
bool String::operator == (const char * tmp) const
{
	if(!strcmp(this->mystring,tmp))
		return true;
	else
		return false;
}