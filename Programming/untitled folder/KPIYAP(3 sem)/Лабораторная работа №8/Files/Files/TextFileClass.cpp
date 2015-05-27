#include"TextFileClass.h"

void TextFileClass::WritePerson(Queue<Person> * tmp)
{
	ofstream myfile;
	myfile.open("Person_storage.txt");
	// если убрать нижний блок все полетит так как в файл нельзя записать пустую очередь
	if(tmp->GetSize() == 0)
	{
		system("cls");
		cout << "Нельзя записать пустую очередь!" << endl;
		return;
	}
	Queue<Person>::Iterator myiterator = tmp->Begin(); // итератор для проходки по очереди
	while(myiterator != tmp->End()) // пока не конец очереди
	{
		myfile << myiterator.ptr->node.GetFname() << endl; // пишем в файл имя
		myfile << myiterator.ptr->node.GetLname() << endl; // пишем в файл фамилию
		myfile << myiterator.ptr->node.GetAge(); // пишем в файл возраст
		myiterator++;
		if(myiterator != tmp->End()) //для того чтобы в конце файла не
			myfile << endl;          //печатался пробел и чтобы легче было
		                             //организовать последующее считывание
		                             //из файла
	}

	myfile.close(); // закрываем поток
}

void TextFileClass::ReadPerson(Queue<Person> * tmp)
{
	ifstream myfile;
	myfile.open("Person_storage.txt");
	while(!myfile.eof())
	{
		Person man;
		char buf[128];
		int _age = 0;
		myfile.getline(buf,sizeof buf);
		man.SetFname(buf);
		myfile.getline(buf,sizeof buf);
		man.SetLname(buf);
		myfile.getline(buf,sizeof buf);
		_age = atoi(buf);
		man.SetAge(_age);
		tmp->Push(man);
	}
	myfile.close();
}

bool TextFileClass::EmptyPersonFile()
{
	ifstream myfile;
	myfile.open("Person_storage.txt");
	char buf[50];
	myfile.getline(buf,sizeof buf);
	if(!strcmp(buf,""))
		return true;
	else
		return false;
}

bool TextFileClass::EmptyUTeacherFile()
{
	ifstream myfile;
	myfile.open("UTeacher_storage.txt");
	char buf[50];
	myfile.getline(buf,sizeof buf);
	if(!strcmp(buf,""))
		return true;
	else
		return false;
}

void TextFileClass::WriteUTeacher(Queue<UTeacher> * tmp)
{
	ofstream myfile;
	myfile.open("UTeacher_storage.txt");
	// если убрать нижний блок все полетит так как в файл нельзя записать пустую очередь
	if(tmp->GetSize() == 0)
	{
		system("cls");
		cout << "Нельзя записать пустую очередь!" << endl;
		return;
	}
	Queue<UTeacher>::Iterator myiterator = tmp->Begin(); // итератор для прохода по очереди
	while(myiterator != tmp->End()) // пока не конец очереди
	{
		myfile << myiterator.ptr->node.GetFname() << endl;                                   // пишем в файл имя
		myfile << myiterator.ptr->node.GetLname() << endl;                                   // пишем в файл фамилию
		myfile << myiterator.ptr->node.GetAge() << endl;                                     // пишем в файл возраст
		myfile << myiterator.ptr->node.GetOfficialCapacity() << endl;                        // пишем в файл должность
		myfile << myiterator.ptr->node.GetSpecialty() << endl;                               // пишем в файл специальность
		myfile << myiterator.ptr->node.GetCountWorks() << endl;                              // пишем в файл количество научных работ
		int count = myiterator.ptr->node.GetCountWorks();

		for(int i = 0;i < count;i++)
		{
			if(i == count - 1)
			{
				myfile << myiterator.ptr->node[i];
				break;
			}
			myfile << myiterator.ptr->node[i] << endl;
		}
		myiterator++;
		if(myiterator != tmp->End()) //для того чтобы в конце файла не
			myfile << endl;          //печатался пробел и чтобы легче было
		                             //организовать последующее считывание
		                             //из файла
	}
	myfile.close();
}

void TextFileClass::ReadUTeacher(Queue<UTeacher> * tmp)
{
	ifstream myfile;
	myfile.open("UTeacher_storage.txt");
	while(!myfile.eof())
	{
		UTeacher uteacher;
		char buf[128];
		int _age = 0;
		int _count = 0;

		myfile.getline(buf,sizeof buf);
		uteacher.SetFname(buf);

		myfile.getline(buf,sizeof buf);
		uteacher.SetLname(buf);

		myfile.getline(buf,sizeof buf);
		_age = atoi(buf);
		uteacher.SetAge(_age);

		myfile.getline(buf,sizeof buf);
		uteacher.SetOfficialCapacity(buf);

		myfile.getline(buf,sizeof buf);
		uteacher.SetSpecialty(buf);

		myfile.getline(buf,sizeof buf);
		_count = atoi(buf);
		uteacher.SetCountWorks(_count);

		for(int i = 0;i < _count;i++)
		{
			myfile.getline(buf,sizeof buf);
			uteacher.scientific_works[i] = buf;
		}
		tmp->Push(uteacher);
	}
	myfile.close();
}