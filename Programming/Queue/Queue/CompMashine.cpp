#include "CompMashine.h"

/*CompMashine::CompMashine()
{
    //ctor
}

CompMashine::~CompMashine()
{
    //dtor
}*/

void CompMashine::SetRamSize(const unsigned int size) {
    ram_size = size;
}

void CompMashine::SetHddSize(const unsigned int size) {
    hdd_size = size;
}

void CompMashine::SetProcessorFreq(const unsigned int freq) {
    processor_freq_Hz = freq;
}

unsigned int CompMashine::GetRamSize() const {
    return ram_size;
}

unsigned int CompMashine::GetHddSize() const {
    return hdd_size;
}

unsigned int CompMashine::GetProcessorFreq() const {
    return processor_freq_Hz;
}

std::istream &operator>>(std::istream &stream, CompMashine &in) {
    std::cout<<"Введите объём оперативной памяти: ";
    stream>>in.ram_size;
    std::cout<<"Введите объём жёсткого диска: ";
    stream>>in.hdd_size;
    std::cout<<"Введите частоту процесора: ";
    stream>>in.processor_freq_Hz;
    return stream;
}

std::ostream &operator<<(std::ostream &stream, CompMashine &out) {
    stream<<"Тип: вычислительная машина"<<std::endl;
    stream<<"Объём оперативной памяти: ";
    stream<<out.ram_size<<std::endl;
    stream<<"Объём жёсткого диска: ";
    stream<<out.hdd_size<<std::endl;
    stream<<"Частота процесора: ";
    stream<<out.processor_freq_Hz<<std::endl;
    return stream;
}
