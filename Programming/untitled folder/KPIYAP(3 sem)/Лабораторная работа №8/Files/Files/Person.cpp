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
	//реализовано автоформатирование таблицы в зависимости от длины строк в данных или размере числа

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// для первой вертикальной линии и выравнивания
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	int num_of_symbols = 24 - tmp.fname.GetLength(); // замеряем расстояние от второй полоски бордюра до последнего символа поля /имя/
	String string_with_spaces1(25); //объявляем строку для хранения кол-ва пробелов
	for(int i = 0;i < num_of_symbols;i++) // в цикле заполняем временную переменную String пробелами
	{
		if(i == num_of_symbols - 1)
		{
			string_with_spaces1 += "|"; // в последний символ этой строки записываем |
			break;
		}
		string_with_spaces1 += " "; // записываем пробелы
	}
	os << "|"; // горизонтальная полоса слева от поля /имя/
	os << " "; // небольшой отступ от самой крайней левой вертикальной полосы до поля /имя/
	os << tmp.fname; // печатаем имя
	os << string_with_spaces1; // вслед печатаем строку с пробелами
	os << " "; // отступ от второй полосы центрльной до поля /фамилия/
	os << tmp.lname; // печатаем фамилию
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// для второй вертикальной линии и выравнивания
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	int num_of_symbols2 = 52 - 25 - tmp.lname.GetLength();
	String string_with_spaces2(59);
	for(int i = 0;i < num_of_symbols2;i++) // в цикле заполняем временную переменную String пробелами
	{
		if(i == num_of_symbols2 - 1)
		{
			string_with_spaces2 += "|"; // в последний символ этой строки записываем |
			break;
		}
		string_with_spaces2 += " "; // записываем пробелы
	}
	os << string_with_spaces2;
	os << " ";
	int num_of_chisel = 0; // переменная для того чтобы при печати в таблице корректно прорисовывалось при
	if(tmp.age != 0) // проверка для того чтобы когда число равняется нулю оно не печаталось
	{
		os << tmp.age;
	}
	else // а граница самой крайней правой рамки корректно смещалась
		num_of_chisel += 1;
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// для третьей вертикальной линии и выравнивания
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	                   // однозначных и двузначных числах
	if(tmp.age >= 0 && tmp.age < 10)
		num_of_chisel += 1;
	int num_of_symbols3 = 68 - num_of_symbols - num_of_symbols2 - tmp.fname.GetLength() - tmp.lname.GetLength() + num_of_chisel;
	String string_with_spaces3(80);

	for(int i = 0;i < num_of_symbols3;i++) // в цикле заполняем временную переменную String пробелами
	{
		if(i == num_of_symbols3 - 1)
		{
			string_with_spaces3 += "|"; // в последний символ этой строки записываем |
			break;
		}
		string_with_spaces3 += " "; // записываем пробелы
	}
	cout << string_with_spaces3;
	os << endl;
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