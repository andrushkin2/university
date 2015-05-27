#ifndef QUEUE_H
#define QUEUE_H

#include <cstddef>

template <typename QueueDatType> class queue {
	struct Qu_El {
		QueueDatType dat;
		Qu_El* next;
		Qu_El* prev;
	} *begin, *end;

public:
	queue() { begin = end = NULL; }
	queue(const queue<QueueDatType> &CopyFrom);
	~queue();
	bool IsEmpty();
	void PushToEnd(const QueueDatType dat);
	void PushToBegin(const QueueDatType dat);
	QueueDatType PopFromBegin();
	QueueDatType PopFromEnd();
	QueueDatType PickFromBegin();
	QueueDatType PickFromEnd();
	queue<QueueDatType> operator=(const queue<QueueDatType> CopyFrom);
};

template <typename QueueDatType> queue<QueueDatType>::queue(const queue<QueueDatType> &CopyFrom) {
	Qu_El *new_item = new Qu_El, *tmp = CopyFrom.begin;
	new_item->dat = tmp->dat;
	new_item->next = new_item->prev = NULL;
	begin = end = new_item;
	tmp=tmp->next;
	
	for(; tmp; tmp=tmp->next) {
		new_item = new Qu_El;
		new_item->dat = tmp->dat;
		new_item->next = NULL;
		new_item->prev = end;
		end->next = new_item;
		end = new_item;
	}
}

template <typename QueueDatType> queue<QueueDatType> queue<QueueDatType>::operator=(const queue<QueueDatType> CopyFrom) {
	if(&CopyFrom == this) {
		return *this;
	}
	Qu_El *new_item = new Qu_El, *tmp = CopyFrom.begin;
	new_item->dat = tmp->dat;
	new_item->next = new_item->prev = NULL;
	begin = end = new_item;
	tmp=tmp->next;
	
	for(; tmp; tmp=tmp->next) {
		new_item = new Qu_El;
		new_item->dat = tmp->dat;
		new_item->next = NULL;
		new_item->prev = end;
		end->next = new_item;
		end = new_item;
	}
	return *this;
}

template <typename QueueDatType> void queue<QueueDatType>::PushToEnd(const QueueDatType dat) {
	Qu_El *new_item = new Qu_El;
	new_item->dat = dat;
	if ((!begin) && (!end)) {
		new_item->next = new_item->prev = NULL;
		begin = end = new_item;
	} else {
		new_item->next = NULL;
		new_item->prev = end;
		end->next = new_item;
		end = new_item;
	}
}

template <typename QueueDatType> void queue<QueueDatType>::PushToBegin(const QueueDatType dat) {
	Qu_El *new_item = new Qu_El;
	new_item->dat = dat;
	if ((!begin) && (!end)) {
		new_item->next = new_item->prev = NULL;
		begin = end = new_item;
	} else {
		new_item->prev = NULL;
		new_item->next = begin;
		begin->prev = new_item;
		begin = new_item;
	}
}

template <typename QueueDatType> QueueDatType queue<QueueDatType>::PopFromBegin() {
	QueueDatType res = begin->dat;
	if( begin != end ) {
		Qu_El *tmp = begin;
		begin = begin->next;
		begin->prev = NULL;
		delete tmp;
	} else {
		delete begin;
		begin = end = NULL;
	}
	return res;
}

template <typename QueueDatType> QueueDatType queue<QueueDatType>::PopFromEnd() {
	QueueDatType res = end->dat;
	if( begin != end ) {
		Qu_El *tmp = end;
		end = end->prev;
		end->next = NULL;
		delete tmp;
	} else {
		delete end;
		begin = end = NULL;
	}
	return res;
}

template <typename QueueDatType> QueueDatType queue<QueueDatType>::PickFromBegin() {
	return begin->dat;
}

template <typename QueueDatType> QueueDatType queue<QueueDatType>::PickFromEnd() {
	return end->dat;
}

template <typename QueueDatType> bool queue<QueueDatType>::IsEmpty() {
	return (!begin)&&(!end) ? true : false;
}

template <typename QueueDatType> queue<QueueDatType>::~queue() {
	Qu_El* temp;
	while(begin) {
		temp = begin;
		begin = temp->next;
		delete temp;
	}
}

#endif /* QUEUE */