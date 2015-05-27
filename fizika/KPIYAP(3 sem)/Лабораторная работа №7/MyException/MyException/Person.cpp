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
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl << endl;
}

void operator >> (std::istream & is,Person & tmp)
{
	bool flag1,flag2,flag3,flag10; // для выходов из циклов ввода
	do
	{
		try
		{
			cout << "Введите имя:";
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
			cout << "Введите фамилию:";
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
					cout << "Введите возраст:";
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