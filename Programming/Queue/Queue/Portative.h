#ifndef PORTATIVE_H
#define PORTATIVE_H

#include "CompMashine.h"
#include <iostream>

class Portative : public CompMashine {
   // char type[64];
    char manufacturer[64];
    char model[64];
public:
    //Portative();
    //~Portative();
    /*char Gettype() { return type; }
    void Settype(char val) { type = val; }*/
    char* Getmanufacturer() { return manufacturer; }
    void Setmanufacturer(const char * const val);
    char* Getmodel() { return model; }
    void Setmodel(const char * const val);
	void GetAll() {
		std::cout<<*this;
	}
	void SetAll() {
		std::cin>>*this;
	}
    friend std::istream &operator>>(std::istream &stream, Portative &in);
    friend std::ostream &operator<<(std::ostream &stream, Portative &out);
};

#endif // PORTATIVE_H
