#ifndef COMPMASHINE_H
#define COMPMASHINE_H

#include <iostream>

class CompMashine {
    unsigned int ram_size;
    unsigned int hdd_size;
    unsigned int processor_freq_Hz;
    /*bool have_ssd;
    char processor_name[64];
    char chipset_name[32];
    char os_name[64];*/

public:
    //CompMashine();
    //~CompMashine();
    void SetRamSize(const unsigned int);
    void SetHddSize(const unsigned int);
    void SetProcessorFreq(const unsigned int);
    /*void SetSSD(bool);
    void SetProcessorName(const char* const);
    void SetChipsetName(const char* const);
    void SetOsName(const char* const);*/

    unsigned int GetRamSize() const;
    unsigned int GetHddSize() const;
    unsigned int GetProcessorFreq() const;
    /*bool GetSSD() const;
    char* GetProcessorName() const;
    char* GetChipsetName() const;
    char* GetOsName() const;*/

	virtual void GetAll() {
		std::cout<<*this;
	}
	virtual void SetAll() {
		std::cin>>*this;
	}

    friend std::istream &operator>>(std::istream &stream, CompMashine &in);
    friend std::ostream &operator<<(std::ostream &stream, CompMashine &out);
};

#endif // COMPMASHINE_H
