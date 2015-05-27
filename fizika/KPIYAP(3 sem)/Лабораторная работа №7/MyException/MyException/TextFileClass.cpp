#include"TextFileClass.h"

void TextFileClass::WritePerson(Queue<Person> & tmp)
{
	Queue<Person>::Iterator iter = tmp.Begin();
	ofstream out_stream;
	out_stream.open("Person_data.txt");
	while(iter != tmp.End())
	{
		out_stream << *iter;
		iter++;
	}
	out_stream.close();
}
void TextFileClass::ReadPerson(Queue<String> * tmp)
{
	ifstream inp_stream;
	inp_stream.open("Person_data.txt");
	while(!inp_stream.eof())
	{
		String m_tmp;
		char buf[256];
		inp_stream.getline(buf,sizeof buf);
		m_tmp = buf;
		m_tmp += "\n";
		tmp->Push(m_tmp);
	}	
}
void TextFileClass::WriteUTeacher(Queue<UTeacher> & tmp1)
{
	Queue<UTeacher>::Iterator iter = tmp1.Begin();
	ofstream out_stream;
	out_stream.open("UTeachear.txt");
	while(iter != tmp1.End())
	{
		out_stream << *iter;
		iter++;
	}
	out_stream.close();
}
void TextFileClass::ReadUTeacher(Queue<String> * stopka)
{
	ifstream inp_stream;
	inp_stream.open("UTeachear.txt");
	while(!inp_stream.eof())
	{
		String m_tmp;
		char buf[256];
		inp_stream.getline(buf,sizeof buf);
		m_tmp = buf;
		m_tmp += "\n";
		stopka->Push(m_tmp);
	}	
}