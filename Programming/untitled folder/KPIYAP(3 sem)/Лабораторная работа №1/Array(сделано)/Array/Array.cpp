#include"Array.h"
#include<iostream>
using namespace std;

Array::~Array()
{
	delete [] mas;
	//cout << endl << "=====Destructor=====" << endl;
}

Array::Array(int _n)
{
	this->n = _n;
	this->mas = new int [_n];
	//cout << endl << "=====Default Constructor=====" << endl;
}

Array::Array( Array & a)
{
	this->n = a.n;
	int *resArray = new int[n];
	for ( int i = 0; i < n; i++)
		resArray[ i ] = a.mas[i];
	this->mas = resArray;
	cout << endl << "=====Copy Constructor=====" << endl;
}

void Array::Input()
{
	if(n == 0)
	{
		cout << "Ввод невозможен!Вы неинициализировали размер массива в объекте!" << endl;
		return;
	}
	cout << "Введите массив из " << n << " элементов: ";
	for(int i = 0;i < n;i++)
		cin >> mas[i];
}

void Array::Show() const
{
	if(n == 0)
	{
		cout << "Показ невозможен!Вы неинициализировали размер массива в объекте!" << endl;
		return;
	}
	cout << "Массив: ";
	for(int i = 0;i < n;i++)
		cout << mas[i] << " ";
	cout << endl;
}

int Array::Min() const
{
	if(n == 0)
	{
		cout << "Невозможено найти минимальный элемент!Вы неинициализировали размер массива в объекте!" << endl;
		return 0;
	}
	int min = mas[0];
	for(int i = 0;i < n;i++)
		if(min > mas[i])
			min = mas[i];
	return min;
}

int Array::Max() const
{
	if(n == 0)
	{
		cout << "Невозможено найти минимальный элемент!Вы неинициализировали размер массива в объекте!" << endl;
		return 0;
	}
	int max = mas[0];
	for(int i = 0;i < n;i++)
		if(max < mas[i])
			max = mas[i];
	return max;
}

Array Array::operator = (Array a)
{
	if(this == &a)
		return *this;
	delete [] this->mas;
	this->mas = new int [a.n];
	this->n = a.n;
	for(int i = 0;i < this->n;i++)
		this->mas[i] = a.mas[i];
	return *this;
}

void Array::operator += (Array a)
{
	*this = *this + a;
}

Array Array::operator + (Array a)
{
	if(this->n > a.n || this->n == a.n)
	{
		for(int i = 0;i < a.n;i++)
			this->mas[i] += a.mas[i];
	}
	else if(this->n < a.n)
	{
		Array tmp = *this;
		delete [] this->mas;
		this->mas = new int [a.n];
		this->n = a.n;
		for(int i = 0;i < a.n;i++)
			this->mas[i] = 0;
		for(int i = 0;i < tmp.n;i++)
			this->mas[i] = tmp.mas[i];
		for(int i = 0;i < a.n;i++)
			this->mas[i] += a.mas[i];
	}
	return *this;
}

ostream & operator << (ostream & os,Array & a)
{
	if(a.n == 0)
	{
		cout << "Показ невозможен!Вы неинициализировали размер массива в объекте!" << endl;
		return os;
	}
	cout << "Массив: ";
	for(int i = 0;i < a.n;i++)
		os << a.mas[i] << " ";
	os << endl;
	return os;
}


