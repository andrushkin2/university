#ifndef STACK_H
#define STACK_H

template <typename StackDatType> class stack {
	struct StackEl {
		StackDatType dat;
		StackEl* next;
	} *top;

public:
	stack() { top = NULL; }
	stack(const StackDatType dat);
	stack(const stack<StackDatType> &CopyFrom);
	~stack();
	stack<StackDatType> operator=(const stack<StackDatType> CopyFrom);
	bool IsEmpty();
	void push(const StackDatType dat);
	StackDatType pop();
	StackDatType pick() { return top->dat; }
	void reverse();
};

template <typename StackDatType> bool stack<StackDatType>::IsEmpty() {
	return !top ? true : false;
}

template<typename StackDatType> stack<StackDatType>::stack(const stack<StackDatType> &CopyFrom) {
	StackEl *tmp = CopyFrom.top;
	while(tmp) {
		this->push(tmp->dat);
		tmp = tmp->next;
	}
	this->reverse();
}

template<typename StackDatType> stack<StackDatType> stack<StackDatType>::operator=(const stack<StackDatType> CopyFrom) {
	if(&CopyFrom == this) {
		return *this;
	}
	StackEl *tmp = CopyFrom.top;
	while(tmp) {
		this->push(tmp->dat);
		tmp = tmp->next;
	}
	this->reverse();
	return *this;
}

//Конструктор инициализирует стек и кладёт в него символ
template<typename StackDatType> stack<StackDatType>::stack(const StackDatType dat) {
	top=NULL;
	StackEl* new_e = new StackEl;
	new_e->dat=dat;
	new_e->next=top;
	top=new_e;
}

//Переворот стека
template<typename StackDatType> void stack<StackDatType>::reverse() {
	StackEl *prev=NULL, *temp;
	for(;;) {
		temp=top->next;
		top->next=prev;
		if(!temp) break;
		prev=top;
		top=temp;
	}
}

//Помещение в стек
template<typename StackDatType> void stack<StackDatType>::push(StackDatType dat) {
	StackEl* new_e = new StackEl;
	new_e->dat=dat;
	new_e->next=top;
	top=new_e;
}

//Извлечение из стека
template<typename StackDatType> StackDatType stack<StackDatType>::pop() {
	StackDatType dat=top->dat;
	StackEl* temp=top;
	top=top->next;
	delete temp;
	return dat;
}

//Удаление стека
template<typename StackDatType> stack<StackDatType>::~stack() {
	StackEl* temp;
	while(top) {
		temp=top;
		top=temp->next;
		delete temp;
	}
}

#endif /*STACK*/