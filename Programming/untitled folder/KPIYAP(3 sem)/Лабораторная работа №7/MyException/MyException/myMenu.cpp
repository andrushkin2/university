#include"myMenu.h"

void MyMenu()
{
	// ����������
	Queue<Person> data1;
	Queue<UTeacher> data2;
	Queue<Committeeman> data3;
	Queue<TCMember> data4;
	// ������� ������ ������ � �������
	TextFileClass file1;
	TextFileClass file2;
	
	while(1)
	{
		system("cls");
		cout << "1 - �������� ����������(����� Person)" << endl;
		cout << "2 - �������� ����������(����� Person)" << endl;
		cout << "3 - ������� ����������(����� Person)" << endl << endl;
		
		cout << "4 - �������� ����������(����� UTeacher)" << endl;
		cout << "5 - �������� ����������(����� UTeacher)" << endl;
		cout << "6 - ������� ����������(����� UTeacher)" << endl << endl;

		cout << "7 - �������� ����������(����� Committeeman)" << endl;
		cout << "8 - �������� ����������(����� Committeeman)" << endl;
		cout << "9 - ������� ����������(����� Committeeman)" << endl << endl;

		cout << "a - �������� ����������(����� TCMember)" << endl;
		cout << "b - �������� ����������(����� TCMember)" << endl;
		cout << "c - ������� ����������(����� TCMember)" << endl << endl;

		cout << "d - �������� ���������� �� �����(����� Person)" << endl;
		cout << "e - �������� ���������� �� �����(����� UTeacher)" << endl;
		//cout << "f - �������� ���������� �� �����(����� Committeeman)" << endl;
		//cout << "g - �������� ���������� �� �����(����� TCMember)" << endl << endl;
		cout << "0 - �����" << endl;
		cout << "   �������� �������:";
		cin.sync();
		switch(cin.get())
		{
		case '1' :
			{
				system("cls");
				Person tmp1;
				cin >> tmp1;
				data1.Push(tmp1);
				file1.WritePerson(data1);
				break;
			}
		case '2' :
			{
				system("cls");
				data1.Show();
				system("pause");
				break;
				
			}
		case '3' :
			{
				system("cls");
				data1.Delete();
				system("pause");
				break;
			}

		case '4' :
			{
				system("cls");
				UTeacher tmp2;
				cin >> tmp2;
				data2.Push(tmp2);
				file2.WriteUTeacher(data2);
				break;
			}
		case '5' :
			{
				system("cls");
				data2.Show();
				system("pause");
				break;
			}
		case '6' :
			{
				system("cls");
				data2.Delete();
				system("pause");
				break;
			}
		case '7' :
			{
				system("cls");
				Committeeman tmp3;
				cin >> tmp3;
				data3.Push(tmp3);
				break;
			}
		case '8' :
			{
				system("cls");
				data3.Show();
				system("pause");
				break;
			}
		case '9' :
			{
				system("cls");
				data3.Delete();
				system("pause");
				break;
			}
		case 'a' :
			{
				system("cls");
				TCMember tmp4;
				cin >> tmp4;
				data4.Push(tmp4);
				break;
			}
		case 'b' :
			{
				system("cls");
				data4.Show();
				system("pause");
				break;
			}
		case 'c' :
			{
				system("cls");
				data4.Delete();
				system("pause");
				break;
			}
			//����� ���������� �� ������
		case 'd' :
			{
				system("cls");
				Queue<String> *Person_storage = new Queue<String>;
				file1.ReadPerson(Person_storage);
				Person_storage->Show();
				delete Person_storage;
				system("pause");
				break;
			}
		case 'e' :
			{
				system("cls");
				Queue<String> *UTeacher_storage = new Queue<String>;
				file2.ReadUTeacher(UTeacher_storage);
				UTeacher_storage->Show();
				delete UTeacher_storage;
				system("pause");
				break;
			}
		case '0' :
			{
				return ;
			}
		}
	}
}