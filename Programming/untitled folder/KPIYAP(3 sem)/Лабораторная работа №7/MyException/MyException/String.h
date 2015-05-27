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
	//inline char * GetString() const { return this->mystring; };
	inline String GetString() const { return *this; };
	friend std::ostream & operator << (std::ostream & os,String & str);
	friend std::istream & operator >> (std::istream & is,String & str);
	void operator = (const String & tmp);
	void operator = (char * str);
	void operator = (const char str[]);           // ��� ����������� �����
	bool operator == (const String & tmp) const;
	bool operator == (const char * tmp) const;
	void operator += (char *str)
	{
		int len = this->length + strlen(str);
		char *tmp_str = new char [this->length + 1];
		strcpy(tmp_str,this->mystring);
		if(this->length != 0 )
			delete this->mystring;
		mystring = new char [len + 1];
		strcpy(mystring,tmp_str);
		strcat(mystring,str);
		this->length = len;
	}
};
//����������� �� ��������� �������������
//����������� ����������� �������������
//���������� �������������
//������������� �������� ������ �������������
//������������� �������� ����� �������������
//������������� ��������� ������������ ��������������
//������������� �������� ��������� �� ��������� �������������

#endif