#include"myMenu.h"

void MyMenu()
{
	// контейнеры
	Queue<Person> data1;
	Queue<UTeacher> data2;
	Queue<Committeeman> data3;
	Queue<TCMember> data4;
	// объекты класса работы с файлами
	TextFileClass file1;
	TextFileClass file2;
	
	while(1)
	{
		system("cls");
		cout << "1 - Добавить информацию(класс Person)" << endl;
		cout << "2 - Показать информацию(класс Person)" << endl;
		cout << "3 - Удалить информацию(класс Person)" << endl << endl;
		
		cout << "4 - Добавить информацию(класс UTeacher)" << endl;
		cout << "5 - Показать информацию(класс UTeacher)" << endl;
		cout << "6 - Удалить информацию(класс UTeacher)" << endl << endl;

		cout << "7 - Добавить информацию(класс Committeeman)" << endl;
		cout << "8 - Показать информацию(класс Committeeman)" << endl;
		cout << "9 - Удалить информацию(класс Committeeman)" << endl << endl;

		cout << "a - Добавить информацию(класс TCMember)" << endl;
		cout << "b - Показать информацию(класс TCMember)" << endl;
		cout << "c - Удалить информацию(класс TCMember)" << endl << endl;

		cout << "d - Показать информацию из файла(класс Person)" << endl;
		cout << "e - Показать информацию из файла(класс UTeacher)" << endl;
		//cout << "f - Показать информацию из файла(класс Committeeman)" << endl;
		//cout << "g - Показать информацию из файла(класс TCMember)" << endl << endl;
		cout << "0 - Выход" << endl;
		cout << "   Выберите команду:";
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
			//показ информации из файлов
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