#define _CRT_SECURE_NO_WARNINGS
#ifndef _STRING_H_
#define _STRING_H_
#include<iostream>

class String
{
private:
	char *mystring;          //������
	int length;              //����� ������
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
	void operator = (const char str[]);           // ��� ����������� �����
	bool operator == (const String & tmp) const;
	bool operator == (const char * tmp) const;
};
//����������� �� ��������� �������������
//����������� ����������� �������������
//���������� �������������
//������������� �������� ������ �������������
//������������� �������� ����� �������������
//������������� ��������� ������������ ��������������
//������������� �������� ��������� �� ��������� �������������

#endif