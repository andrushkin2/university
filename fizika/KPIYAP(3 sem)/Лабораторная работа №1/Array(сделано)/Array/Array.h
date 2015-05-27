#ifndef _ARRAY_H_
#define _ARRAY_H_
#include<iostream>

class Array
{
private:
	int *mas;                                                           // ������ ���������
	int n;                                                              // ���-�� ���������
public:
	~Array();                                                           // ����������
	Array(int _n=0);                                                    // ����������� ������������� ������� �������
	Array::Array( Array & a);                                           // ����������� �����������
	void Input();                                                       // ���� �������
	void Show() const;                                                  // ����� �������
	int Min() const;                                                    // ���������� � ������������ ��������
	int Max() const;                                                    // ���������� � ������������� ��������
	// ������������� ���������
	Array operator = (Array a);                                     // ������������� �������� ������������
	void operator += (Array a);                                       // ������������� ����������� �������� �����
	Array operator + (Array a);                                     // ������������� �������� �����
	friend std::ostream & operator << (std::ostream & os,Array & a);    // ������������� �������� ������ � �����
};

#endif