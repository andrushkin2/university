#include "Stationar.h"

/*Stationar::Stationar()
{
    //ctor
}

Stationar::~Stationar()
{
    //dtor
}*/

void Stationar::Setform_factor(const char * const val) {
    for(unsigned int i = 0; val[i]; form_factor[i] = val[i]);
}

std::istream &operator>>(std::istream &stream, Stationar &in) {
	int tmp;
    std::cout<<"Введите объём оперативной памяти: ";
    stream>>tmp;
	in.SetRamSize(tmp);
    std::cout<<"Введите объём жёсткого диска: ";
    stream>>tmp;
	in.SetHddSize(tmp);
    std::cout<<"Введите частоту процесора: ";
    stream>>tmp;
	in.SetProcessorFreq(tmp);
    std::cout<<"Введите форм-фактор: ";
    stream>>in.form_factor;
	std::cout<<"Введите диагональ монитора: ";
    stream>>in.monitor_diag;
    return stream;
}

std::ostream &operator<<(std::ostream &stream, Stationar &out) {
    stream<<"Тип: стационарный ПК"<<std::endl;
    stream<<"Объём оперативной памяти: ";
    stream<<out.GetRamSize()<<std::endl;
    stream<<"Объём жёсткого диска: ";
    stream<<out.GetHddSize()<<std::endl;
    stream<<"Частота процесора: ";
    stream<<out.GetProcessorFreq()<<std::endl;
    stream<<"Форм-фактор: ";
    stream<<out.form_factor<<std::endl;
	stream<<"Диагональ экрана: ";
    stream<<out.monitor_diag<<std::endl;
    return stream;
}
