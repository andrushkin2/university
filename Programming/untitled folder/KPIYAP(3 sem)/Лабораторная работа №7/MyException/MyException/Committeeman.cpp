#include"Committeeman.h"

Committeeman::Committeeman() : Person()
{
}

Committeeman::Committeeman(const Committeeman & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
}

Committeeman::~Committeeman()
{
}

void operator << (std::ostream & os,Committeeman & tmp)
{
	os << "���:" << tmp.fname << endl;
	os << "�������:" << tmp.lname << endl;
	os << "�������:" << tmp.age << endl;
	os << "�������� ��������:" << tmp.name_com << endl;
	os << "���������:" << tmp.biogr << endl << endl;
}

void operator >> (std::istream & is,Committeeman & tmp)
{
	bool flag1,flag2,flag3,flag4,flag5,flag10; // ���������� ��� ������� �� ������ �����
	// ���� �����
	do
	{
		try
		{
			cout << "������� ���:";
			is >> tmp.fname;
			flag1 = true;
			if(tmp.fname == "")
				throw InpException(1);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag1 = false;
		}
	}while(!flag1);
	// ���� �������
	do
	{
		try
		{
			cout << "������� �������:";
			is >> tmp.lname;
			flag2 = true;
			if(tmp.lname == "")
				throw InpException(2);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag2 = false;
		}
	}while(!flag2);
	// ���� ��������
	do
	{
		try
		{
			do
			{
				try
				{
					cout << "������� �������:";
					is >> tmp.age;
					flag10 = true;
					flag3 = true;
					if (!is || is.peek() != '\n')
						throw InpException(10);	
				}
				catch(InpException & exc)
				{
					cout << exc;
					flag10 = false;
					is.clear();
					is.sync();
				}
			}while(!flag10);
			if(tmp.age < 0 || tmp.age > 100)
				throw InpException(3);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag3 = false;
		}
	}while(!flag3);
	// ���� ����� ��������
	do
	{
		try
		{
			cout << "������� ��� ��������:";
			is >> tmp.name_com;
			flag4 = true;
			if(tmp.name_com == "")
				throw InpException(7);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag4 = false;
		}
	}while(!flag4);
	// ���� ���������
	do
	{
		try
		{
			cout << "������� ���������:";
			is >> tmp.biogr;
			flag5 = true;
			if(tmp.biogr == "")
				throw InpException(8);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag5 = false;
		}
	}while(!flag5);
}

void Committeeman::operator = (Committeeman & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
}