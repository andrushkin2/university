#include"TCMember.h"

TCMember::TCMember()
{
	count_works_in_com = 0;
	max_num_of_works_in_com = sizeof(this->scientific_works_in_com) / sizeof(String);
}

TCMember::TCMember(const TCMember & tmp)
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
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
	this->count_works_in_com = tmp.count_works_in_com;
	this->max_num_of_works_in_com = tmp.max_num_of_works_in_com;
	for(int i = 0;i < this->max_num_of_works_in_com;i++)
		this->scientific_works_in_com[i] = tmp.scientific_works_in_com[i];
}

TCMember::~TCMember()
{
}

void operator << (std::ostream & os,TCMember & tmp)
{
	os << "Имя:" << tmp.fname << endl;
	os << "Фамилия:" << tmp.lname << endl;
	os << "Возраст:" << tmp.age << endl;

	os << "Должность:" << tmp.official_capacity << endl;
	os << "Специальность:" << tmp.specialty << endl;
	os << "Список научных работ:" << endl;
	for(int i = 0;i < tmp.count_works;i++)
	{
		os << "Работа №" << i + 1 << ":" << tmp.scientific_works[i] << endl;
	}
	os << "num_max_of_works:" << tmp.max_num_of_works << endl;
	os << "count_works:" << tmp.count_works << endl;
	os << "Название комиссии:" << tmp.name_com << endl;
	os << "Биография:" << tmp.biogr << endl;
	os << "Список научных работ в комиссии:" << endl;
	for(int i = 0;i < tmp.count_works_in_com;i++)
	{
		os << "Работа №" << i + 1 << ":" << tmp.scientific_works_in_com[i] << endl;
	}
	os << endl;
}

void operator >> (std::istream & is,TCMember & tmp)
{
	bool flag1,flag2,flag3,flag4,flag5,flag6,flag7,flag8,flag9,flag10;
	//////////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////////////
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
		catch(InpException & exc)
		{
			cout << exc;
			flag2 = false;
		}
	}while(!flag2);
	/////////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////////////
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
	//////////////////////////////////////////////////////////////////////////////////////
	// ввод списка работ
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
	//////////////////////////////////////////////////////////////////////////////////////
	// ввод имени комиссии
	do
	{
		try
		{
			cout << "Введите имя комиссии:";
			is >> tmp.name_com;
			flag7 = true;
			if(tmp.name_com == "")
				throw InpException(7);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag7 = false;
		}
	}while(!flag7);
	///////////////////////////////////////////////////////////////////////////////////////
	// ввод биографии
	do
	{
		try
		{
			cout << "Введите биографию:";
			is >> tmp.biogr;
			flag8 = true;
			if(tmp.biogr == "")
				throw InpException(8);
		}
		catch(InpException & exc)
		{
			cout << exc;
			flag8 = false;
		}
	}while(!flag8);
	////////////////////////////////////////////////////////////////////////////////////////
	// ввод списка научных работ в комиссии
	String tmp_cin2;
	cout << "   Ввод списка научных работ в комиссии:" << endl;
	for(int i = 0;i < tmp.max_num_of_works_in_com;i++)
	{
		do
		{
			try
			{
				cout << "Введите научную работу #" << i + 1 << ":";
				is >> tmp_cin2;
				flag9 = true;
				if(tmp_cin2 == "")
					throw InpException(9);
			}
			catch(InpException & exc)
			{
				cout << exc;
				flag9 = false;
			}
		}while(!flag9);
		if(tmp_cin2 == "end")
			break;
		tmp.scientific_works_in_com[i] = tmp_cin2;
		tmp.count_works_in_com++;
	}
}

void TCMember::operator = (const TCMember & tmp)
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
	this->name_com = tmp.name_com;
	this->biogr = tmp.biogr;
	this->count_works_in_com = tmp.count_works_in_com;
	this->max_num_of_works_in_com = tmp.max_num_of_works_in_com;
	for(int i = 0;i < this->max_num_of_works_in_com;i++)
		this->scientific_works_in_com[i] = tmp.scientific_works_in_com[i];
}