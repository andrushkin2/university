#include"MyMenu.h"

void MyMenu()
{
	// �������-���������� ��� �������� ����������
	Queue<Person> *data1 = new Queue<Person>;
	Queue<UTeacher> *data2 = new Queue<UTeacher>;
	//Queue<Person> *databin = new Queue<Person>;

	// ������� ��� ����������� ������ � �������
	TextFileClass file1;
	TextFileClass file2;
	//BinaryFileClass file3;

	while(1)
	{
		system("cls");
		cout << "1 - ������ ����������(����� Person)" << endl;
		cout << "2 - �������� ����������(����� Person)" << endl;
		cout << "3 - ������� ����������(����� Person)" << endl << endl;

		cout << "4 - �������� ����������(����� UTeacher)" << endl;
		cout << "5 - �������� ����������(����� UTeacher)" << endl;
		cout << "6 - ������� ����������(����� UTeacher)" << endl << endl;

		cout << "0 - �����" << endl;
		cout << "�������� �������:";
		cin.sync();
		switch(cin.get())
		{
		case '1' :
			{
				system("cls");
				//�������� ���������� ����� �������� ������� ����� ����������� ���������� �� ��� � ����
				data1->~Queue();
				if(!file1.EmptyPersonFile()) // ���� ���� �� ������ �� ��������� ���� � �������
					file1.ReadPerson(data1);
				// ��� ��������������� ���������� ����
				Person tmp;
				cin >> tmp;
				data1->Push(tmp);
				file1.WritePerson(data1);
				break;
			}
		case '2' :
			{
				system("cls");
				data1->~Queue();
				file1.ReadPerson(data1);
				BorderStylePerson();
                data1->Show();
				DnoPerson();
				system("pause");
				break;
			}
		case '3' :
			{
				system("cls");
				data1->Delete();
				file1.WritePerson(data1);
				system("pause");
				break;
			}
		case '4' :
			{
				system("cls");
				//�������� ���������� ����� �������� ������� ����� ����������� ���������� �� ��� � ����
				data2->~Queue();
				if(!file2.EmptyUTeacherFile()) // ���� ���� �� ������ �� ��������� ���� � �������
					file2.ReadUTeacher(data2);
				UTeacher tmp;
				cin >> tmp;
				data2->Push(tmp);
				file2.WriteUTeacher(data2);
				break;
			}
		case '5' :
			{
				system("cls");
				data2->~Queue();
				file2.ReadUTeacher(data2);
				data2->Show();
				system("pause");
				break;
			}
		case '6' :
			{
				system("cls");
				data2->Delete();
				file2.WriteUTeacher(data2);
				system("pause");
				break;
			}
		case '0' :
			{
				return;
			}
		}
	}
	delete data1;
	delete data2;
	//delete databin;
}

void BorderStylePerson()
{
	cout <<"|------------------------|---------------------------|-------------------|" << endl;
	cout <<"|          ���           |          �������          |       �������     |" << endl;
	cout <<"|------------------------|---------------------------|-------------------|" << endl;
}

void DnoPerson()
{
	cout <<"--------------------------------------------------------------------------" << endl;
}