#include "Portative.h"

/*Portative::Portative()
{
    //ctor
}

Portative::~Portative()
{
    //dtor
}*/

void Portative::Setmodel(const char * const val) {
    for(unsigned int i = 0; val[i]; model[i] = val[i]);
}

void Portative::Setmanufacturer(const char * const val) {
    for(unsigned int i = 0; val[i]; manufacturer[i] = val[i]);
}

std::istream &operator>>(std::istream &stream, Portative &in) {
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
    std::cout<<"Введите имя производителя: ";
    stream>>in.manufacturer;
    std::cout<<"Введите название модели: ";
    stream>>in.model;
    return stream;
}

std::ostream &operator<<(std::ostream &stream, Portative &out) {
    stream<<"Тип: портативный ПК"<<std::endl;
    stream<<"Объём оперативной памяти: ";
    stream<<out.GetRamSize()<<std::endl;
    stream<<"Объём жёсткого диска: ";
    stream<<out.GetHddSize()<<std::endl;
    stream<<"Частота процесора: ";
    stream<<out.GetProcessorFreq()<<std::endl;
    stream<<"Имя производителя: ";
    stream<<out.manufacturer<<std::endl;
    stream<<"Название модели: ";
    stream<<out.model<<std::endl;
    return stream;
}
