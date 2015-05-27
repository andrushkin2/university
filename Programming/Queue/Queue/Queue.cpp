// Queue.cpp: определяет точку входа для консольного приложения.
//

#include "queue.h"
#include "stack.h"
#include "CompMashine.h"
#include "Portative.h"
#include "Stationar.h"
#include <fstream>
#include <iostream>

typedef CompMashine *basePtr;

void print(queue<basePtr> q) {
	while(!q.IsEmpty()) {
		q.PopFromBegin()->GetAll();
		std::cout<<std::endl;
	}
}

int main() {
	queue<basePtr> qu1;
	int select;
	basePtr tmp;

	for(int i = 0; i<3; i++) {
		std::cout<<"Выберите тип компьютера: 1 - общий, 2 - портативный, 3 - стационарный > ";
		std::cin>>select;
		switch (select) {
		case 1:
			tmp = new CompMashine;
			break;
		case 2:
			tmp = new Portative;
			break;
		case 3:
			tmp = new Stationar;
			break;
		default:
			std::cout<<"Ошибка ввода!";
			return 1;
		}
		tmp->SetAll();
		qu1.PushToEnd(tmp);
	}

	std::cout<<std::endl<<"Result:"<<std::endl<<std::endl;
	print(qu1);

	return 0;
}

