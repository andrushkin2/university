//
//  queueTemplate.h
//  laba4
//
//  Created by Andrei Kozyakov on 01.06.15.
//  Copyright (c) 2015 Andrei Kozyakov. All rights reserved.
//

#ifndef __laba4__queueTemplate__
#define __laba4__queueTemplate__

#include <stdio.h>
#include <cstddef>


template <typename T> struct queueStruct
{
    T dat;
    queueStruct* next;
    queueStruct* prev;
};
template <typename T> class queue
{
    queueStruct<T> *begin, *end;
    
public:
    queue() { begin = end = NULL; }
    ~queue();
    bool IsEmpty();
    void Push(const T dat);
    T Pop();
    T Pick();
};

template <typename T> void queue<T>::Push(const T dat)
{
    queueStruct<T> *new_item = new queueStruct<T>;
    new_item->dat = dat;
    if (!begin && !end)
    {
        new_item->next = new_item->prev = NULL;
        begin = end = new_item;
    }
    else
    {
        new_item->next = NULL;
        new_item->prev = end;
        end->next = new_item;
        end = new_item;
    }
}

template <typename T> T queue<T>::Pop()
{
    T res = begin->dat;
    if( begin != end )
    {
        queueStruct<T> *tmp = begin;
        begin = begin->next;
        begin->prev = NULL;
        delete tmp;
    }
    else
    {
        delete begin;
        begin = end = NULL;
    }
    return res;
}

template <typename T> T queue<T>::Pick()
{
    return begin->dat;
}

template <typename T> bool queue<T>::IsEmpty()
{
    return !begin && !end;
}

template <typename T> queue<T>::~queue()
{
    queueStruct<T> * temp;
    while(begin)
    {
        temp = begin;
        begin = temp->next;
        delete temp;
    }
}

#endif /* defined(__laba4__queueTemplate__) */
