#ifndef _ARRAY_H_
#define _ARRAY_H_
#include<iostream>

class Array
{
private:
	int *mas;                                                           // массив элементов
	int n;                                                              // кол-во элементов
public:
	~Array();                                                           // деструктор
	Array(int _n=0);                                                    // конструктор инициализации размера массива
	Array::Array( Array & a);                                           // конструктор копирования
	void Input();                                                       // ввод массива
	void Show() const;                                                  // показ массива
	int Min() const;                                                    // нахождение и минимального элемента
	int Max() const;                                                    // нахождение и максимального элемента
	// перегруженные операторы
	Array operator = (Array a);                                     // перегруженный оператор присваивания
	void operator += (Array a);                                       // перегруженный сокращенный оператор суммы
	Array operator + (Array a);                                     // перегруженный оператор суммы
	friend std::ostream & operator << (std::ostream & os,Array & a);    // перегруженный оператор вывода в поток
};

#endif