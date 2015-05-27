#define _CRT_SECURE_NO_WARNINGS
#ifndef _STRING_H_
#define _STRING_H_
#include<iostream>

class String
{
private:
	char *mystring;          //строка
	int length;              //длина строки
public:
	String(int _length = 100);
	String(char str[]);
	String(const String & str);
	~String();
	inline int GetLength() const { return this->length; };
	friend std::ostream & operator << (std::ostream & os,String & str);
	friend std::istream & operator >> (std::istream & is,String & str);
	void operator = (const String & tmp);
	void operator = (char * str);
	void operator = (const char str[]);           // для константных строк
	bool operator == (const String & tmp) const;
	bool operator == (const char * tmp) const;
};
//конструктор по умолчанию протестирован
//конструктор копирования протестирован
//деструктор протестирован
//перегруженный оператор вывода протестирован
//перегруженный оператор ввода протестирован
//перегруженные операторы присваивания протестированы
//перегруженный оператор сравнения на равенство протестирован

#endif