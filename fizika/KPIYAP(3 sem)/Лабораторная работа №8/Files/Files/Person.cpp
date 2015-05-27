#include"Person.h"

Person::Person()
{
	this->age = 0;
}

Person::Person(char *_fname,char *_lname,int _age)
{
	this->fname = _fname;
	this->lname = _lname;
	this->age = _age;
}

Person::Person(const Person & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
}

Person::~Person()
{
}

void operator << (std::ostream & os,Person & tmp)
{
	//����������� ������������������ ������� � ����������� �� ����� ����� � ������ ��� ������� �����

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ��� ������ ������������ ����� � ������������
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	int num_of_symbols = 24 - tmp.fname.GetLength(); // �������� ���������� �� ������ ������� ������� �� ���������� ������� ���� /���/
	String string_with_spaces1(25); //��������� ������ ��� �������� ���-�� ��������
	for(int i = 0;i < num_of_symbols;i++) // � ����� ��������� ��������� ���������� String ���������
	{
		if(i == num_of_symbols - 1)
		{
			string_with_spaces1 += "|"; // � ��������� ������ ���� ������ ���������� |
			break;
		}
		string_with_spaces1 += " "; // ���������� �������
	}
	os << "|"; // �������������� ������ ����� �� ���� /���/
	os << " "; // ��������� ������ �� ����� ������� ����� ������������ ������ �� ���� /���/
	os << tmp.fname; // �������� ���
	os << string_with_spaces1; // ����� �������� ������ � ���������
	os << " "; // ������ �� ������ ������ ���������� �� ���� /�������/
	os << tmp.lname; // �������� �������
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ��� ������ ������������ ����� � ������������
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	int num_of_symbols2 = 52 - 25 - tmp.lname.GetLength();
	String string_with_spaces2(59);
	for(int i = 0;i < num_of_symbols2;i++) // � ����� ��������� ��������� ���������� String ���������
	{
		if(i == num_of_symbols2 - 1)
		{
			string_with_spaces2 += "|"; // � ��������� ������ ���� ������ ���������� |
			break;
		}
		string_with_spaces2 += " "; // ���������� �������
	}
	os << string_with_spaces2;
	os << " ";
	int num_of_chisel = 0; // ���������� ��� ���� ����� ��� ������ � ������� ��������� ��������������� ���
	if(tmp.age != 0) // �������� ��� ���� ����� ����� ����� ��������� ���� ��� �� ����������
	{
		os << tmp.age;
	}
	else // � ������� ����� ������� ������ ����� ��������� ���������
		num_of_chisel += 1;
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ��� ������� ������������ ����� � ������������
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	                   // ����������� � ���������� ������
	if(tmp.age >= 0 && tmp.age < 10)
		num_of_chisel += 1;
	int num_of_symbols3 = 68 - num_of_symbols - num_of_symbols2 - tmp.fname.GetLength() - tmp.lname.GetLength() + num_of_chisel;
	String string_with_spaces3(80);

	for(int i = 0;i < num_of_symbols3;i++) // � ����� ��������� ��������� ���������� String ���������
	{
		if(i == num_of_symbols3 - 1)
		{
			string_with_spaces3 += "|"; // � ��������� ������ ���� ������ ���������� |
			break;
		}
		string_with_spaces3 += " "; // ���������� �������
	}
	cout << string_with_spaces3;
	os << endl;
}

void operator >> (std::istream & is,Person & tmp)
{
	bool flag1,flag2,flag3,flag10; // ��� ������� �� ������ �����
	do
	{
		try
		{
			cout << "������� ���:";
			is >> tmp.fname;
			flag1 = true;
			if(tmp.fname.GetLength() == 0)
				throw InpException(1);
		}
		catch(InpException &exc)
		{
			cout << exc;
			flag1 = false;
		}
	}
	while(!flag1);
	do
	{
		try
		{
			cout << "������� �������:";
			is >> tmp.lname;
			flag2 = true;
			if(tmp.lname.GetLength() == 0)
				throw InpException(2);
		}
		catch(InpException &exc)
		{
			cout << exc;
			flag2 = false;
		}
	}
	while(!flag2);
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
			flag3 = true;
			if(tmp.age < 0 || tmp.age > 100)
				throw InpException(3);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag3 = false;
		}
	}while(!flag3);
}

void Person::operator = (const Person & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
}