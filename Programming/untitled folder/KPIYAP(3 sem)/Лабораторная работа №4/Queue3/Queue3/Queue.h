#pragma once
//#include<iostream>
template<typename T>class Queue
{
private:
	struct Node
	{
		T node;
		Node *next;
	} *data;
	Node *first;
	Node *last;
	int size;
public:
	Queue();
	~Queue();
	void Push(T tmp);
	void Show();
	void Delete();
	inline int GetSize() { return this->size; };
	
	class Iterator
	{
	//private: tut pomenyal potom chutj chno ubratj
	public:
		Node *ptr;
	public:
		Iterator()
		{
			ptr = NULL;
		}
		Iterator(Node * tmp) : ptr(tmp)
		{
		}
		~Iterator()
		{
		}
		void operator ++ ()
		{
			if(ptr->next == NULL)
			{
				//cout << "����������� ����������!" << endl;
				ptr = NULL;
				return;
			}
			
			ptr = ptr->next;
		}
		T operator * ()
		{
			return ptr->node;
		}
		Node * operator & ()
		{
			return ptr;
		}
		bool operator == (const Iterator & other) { return ptr == other.ptr; }
		bool operator != (const Iterator & other) { return ptr != other.ptr; }
	};
	Node * Begin()
	{
		return last;
	}
	Node * End()
	{
		return first->next;
	}
};
template<typename T>
Queue<T>::Queue()
{
	data = NULL;
	first = NULL;
	last = NULL;
	size = 0;
}
template<typename T>
Queue<T>::~Queue()
{
	if(data == NULL)
		return;
	if(size == 1)
	{
		Node *tmp_del = this->data;
		delete tmp_del;
	    data = first = last =NULL;
	    size = 0;
		return;
	}
	Node *tmp_del = last;
	while(1)
	{
		last = last->next;
		delete tmp_del;
		tmp_del = last;
		if(last->next == NULL)
			break;
	}
	delete first;
	data = last = first = NULL;
	size = 0;
}
template<typename T>
void Queue<T>::Push(T tmp)
{
	if(data == NULL)                      //���� ��������� ������ ������� �������
	{
		data = new Node;                  //�������� ������ ��� ������ �������
		data->node = tmp;                 //����������� �������� ���������� � ������� ��������
		first = last = data;              //������������ ��������� ������� � ���������� �������� � ���������� ������� ��������
		data->next = NULL;                //�������� ��������� ������� �������� �� ���������
		size++;                           //����������� ������� �����
	}
	else                                  //���� ��������� ����������� ��������
	{
		Node *tmp1 = new Node;            //�������� ������ ��� �������
		tmp1->node = tmp;                 //����������� �������� ��������
		tmp1->next = last;                //���������� � ��������� ��������� �� ��������� �������
		last = tmp1;                      //���������� � last ��������� ������ ��� ���������� ��������
		size++;                           //����������� ������� �����
	}
}
template<typename T>
void Queue<T>::Show()
{
	if(data == NULL)
	{
		cout << "������� �����!" << endl;
		return;
	}
	Node *tmp = new Node;                 //�������� ������ ��� ��������� ���������� tmp
	tmp = last;
	while(tmp != NULL)                    //���� �������� �� �������
	{
		cout << tmp->node << endl;        //������ �������� �������
		tmp = tmp->next;                  //������������ ��������� �� ��������� �������
	}
	delete tmp;                           //����������� ������ �� ����� ��������� ����������
}
template<typename T>
void Queue<T>::Delete()
{
	if(data == NULL) // ���� ������� �����
	{
		cout << "������� �����!�������� ����������!" << endl;
		return;
	}
	if(size == 1) // ���� � ������� ���� �������
	{
		Node *tmp_del = last;
		delete tmp_del;
	    data = first = last = NULL;
	    size = 0;
		cout << "������� ������!" << endl;
		return;
	}
	// ���� � ������� ������ ������ ��������
	Node *tmp_del = NULL;
	Node *tmp_prev = last;
	int count = size;
	while(1)
	{
		count--;
		if(count == 1)
			break;
		tmp_prev = tmp_prev->next;	
	}
	tmp_del = tmp_prev->next;
	tmp_prev->next = NULL;
	first = tmp_prev;
	if(tmp_prev->next != NULL)
	delete tmp_del;
	size--;
	cout << "������� ������!" << endl;
}