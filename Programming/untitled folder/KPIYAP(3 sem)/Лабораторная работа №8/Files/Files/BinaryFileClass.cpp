#include"BinaryFileClass.h"
#include<stdlib.h>
void BinaryFileClass::WPersonBin(Queue<Person> * tmp1)
{
	fstream file("bin",ios::out);
	Queue<Person>::Iterator myiter = tmp1->Begin();
	while(myiter != tmp1->End())
	{
		char buf[50];
		strcpy(buf,myiter.ptr->node.fname.GetStringChar());
		file.write(buf,sizeof buf);
		char buf2[50];
		strcpy(buf2,myiter.ptr->node.lname.GetStringChar());
		file.write(buf2,sizeof buf2);
		char tmp[5];
		char buf3[50];
		itoa(myiter.ptr->node.GetAge(),tmp,sizeof tmp);
		strcpy(buf3,tmp);
		file.write(buf3,sizeof buf3);
		myiter++;
	}
	file.close();
}

void BinaryFileClass::RPersonBin(Queue<Person> * tmp2)
{
	fstream file("bin",ios::in | ios::binary);
	while(!file.eof())
	{
		Person my_tmp;
		char buf[50];
		file.read(buf,sizeof buf);
		my_tmp.SetFname(buf);

		char buf2[50];
		file.read(buf2,sizeof buf);
		my_tmp.SetLname(buf);

		char buf3[50];
		file.read(buf3,sizeof buf);
		my_tmp.SetAge(atoi(buf3));

		tmp2->Push(my_tmp);
	}
}