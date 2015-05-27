#include"UTeacher.h"

UTeacher::UTeacher() : Person()
{
	count_works = 0;
	max_num_of_works = sizeof(this->scientific_works) / sizeof(String);
}

UTeacher::UTeacher(const UTeacher & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->official_capacity = tmp.official_capacity;
	this->specialty = tmp.specialty;
	this->count_works = tmp.count_works;
	this->max_num_of_works = tmp.max_num_of_works;
	for(int i = 0;i < this->max_num_of_works;i++)
		this->scientific_works[i] = tmp.scientific_works[i];
}

UTeacher::~UTeacher()
{
}

void operator << (std::ostream & os,UTeacher & tmp)
{
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl;
	os << "Должность:" << tmp.official_capacity << endl;
	os << "Специальность:" << tmp.specialty << endl;
	os << "Список научных работ:" << endl;
	for(int i = 0;i < tmp.count_works;i++)
	{
		os << "   " << tmp.scientific_works[i] << endl;
	}
	os << "num_max_of_works:" << tmp.max_num_of_works << endl;
	os << "count_works:" << tmp.count_works << endl;
}

void operator >> (std::istream & is,UTeacher & tmp)
{
	//переделать объект исключений так чтобы передавался номер,а причина выбиралась сама
	bool flag1,flag2,flag3,flag4,flag5,flag6,flag10; // переменные для выхода из циклов ввода
	// ввод имени
	do
	{
		try
		{
			cout << "Введите имя:";
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
	// ввод фамилии
	do
	{
		try
		{
			cout << "Введите фамилию:";
			is >> tmp.lname;
			flag2 = true;
			if(tmp.lname == "")
				throw InpException(2);
		}
		catch(InpException & exc1)
		{
			cout << exc1;
			flag2 = false;
		}
	}while(!flag2);
	// ввод возраста
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
					flag3 = true;
					if (!is/* || is.peek() != '\n'*/)
						throw InpException(10);	
				}
				catch(InpException & exc1)
				{
					cout << exc1;
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
	// ввод должности
	do
	{
		try
		{
			cout << "Введите должность:";
			is >> tmp.official_capacity;
			flag4 = true;
			if(tmp.official_capacity == "")
				throw InpException(4);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag4 = false;
		}
	}while(!flag4);
	// ввод специальности
	do
	{
		try
		{
			cout << "Введите специальность:";
			is >> tmp.specialty;
			flag5 = true;
			if(tmp.specialty == "")
				throw InpException(5);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag5 = false;
		}
	}while(!flag5);
	// начинается ввод списка работ
	String tmp_cin;
	cout << "   Ввод списка научных работ:" << endl;
	for(int i = 0;i < tmp.max_num_of_works;i++)
	{
		do
		{
			try
			{
				cout << "Введите научную работу #" << i + 1 << ":";
				is >> tmp_cin;
				flag6 = true;
				if(tmp_cin == "")
					throw InpException(6);
			}
			catch(InpException & exc)
			{
				cout << exc;
				flag6 = false;
			}
		}while(!flag6);
		if(tmp_cin == "end")
			break;
		tmp.scientific_works[i] = tmp_cin;
		tmp.count_works++;
	}
}

void UTeacher::operator = (const UTeacher & tmp)
{
	this->fname = tmp.fname;
	this->lname = tmp.lname;
	this->age = tmp.age;
	this->official_capacity = tmp.official_capacity;
	this->specialty = tmp.specialty;
	this->count_works = tmp.count_works;
	this->max_num_of_works = tmp.max_num_of_works;
	for(int i = 0;i < this->max_num_of_works;i++)
		this->scientific_works[i] = tmp.scientific_works[i];
}


