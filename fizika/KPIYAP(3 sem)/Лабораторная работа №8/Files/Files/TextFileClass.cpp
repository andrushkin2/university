#include"TextFileClass.h"

void TextFileClass::WritePerson(Queue<Person> * tmp)
{
	ofstream myfile;
	myfile.open("Person_storage.txt");
	// ���� ������ ������ ���� ��� ������� ��� ��� � ���� ������ �������� ������ �������
	if(tmp->GetSize() == 0)
	{
		system("cls");
		cout << "������ �������� ������ �������!" << endl;
		return;
	}
	Queue<Person>::Iterator myiterator = tmp->Begin(); // �������� ��� �������� �� �������
	while(myiterator != tmp->End()) // ���� �� ����� �������
	{
		myfile << myiterator.ptr->node.GetFname() << endl; // ����� � ���� ���
		myfile << myiterator.ptr->node.GetLname() << endl; // ����� � ���� �������
		myfile << myiterator.ptr->node.GetAge(); // ����� � ���� �������
		myiterator++;
		if(myiterator != tmp->End()) //��� ���� ����� � ����� ����� ��
			myfile << endl;          //��������� ������ � ����� ����� ����
		                             //������������ ����������� ����������
		                             //�� �����
	}

	myfile.close(); // ��������� �����
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
	// ���� ������ ������ ���� ��� ������� ��� ��� � ���� ������ �������� ������ �������
	if(tmp->GetSize() == 0)
	{
		system("cls");
		cout << "������ �������� ������ �������!" << endl;
		return;
	}
	Queue<UTeacher>::Iterator myiterator = tmp->Begin(); // �������� ��� ������� �� �������
	while(myiterator != tmp->End()) // ���� �� ����� �������
	{
		myfile << myiterator.ptr->node.GetFname() << endl;                                   // ����� � ���� ���
		myfile << myiterator.ptr->node.GetLname() << endl;                                   // ����� � ���� �������
		myfile << myiterator.ptr->node.GetAge() << endl;                                     // ����� � ���� �������
		myfile << myiterator.ptr->node.GetOfficialCapacity() << endl;                        // ����� � ���� ���������
		myfile << myiterator.ptr->node.GetSpecialty() << endl;                               // ����� � ���� �������������
		myfile << myiterator.ptr->node.GetCountWorks() << endl;                              // ����� � ���� ���������� ������� �����
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
		if(myiterator != tmp->End()) //��� ���� ����� � ����� ����� ��
			myfile << endl;          //��������� ������ � ����� ����� ����
		                             //������������ ����������� ����������
		                             //�� �����
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