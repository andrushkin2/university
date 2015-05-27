#ifndef STATIONAR_H
#define STATIONAR_H

#include "CompMashine.h"
#include <iostream>

class Stationar : public CompMashine {
    unsigned int monitor_diag;
    char form_factor[64];
    /*char motherboard_model[64];
    char vga_model[64];*/
public:
    //Stationar();
    //~Stationar();
    unsigned int Getmonitor_diag() const { return monitor_diag; }
    void Setmonitor_diag(const unsigned int val) { monitor_diag = val; }
    char* Getform_factor() { return form_factor; }
    void Setform_factor(const char * const val);
	void GetAll() {
		std::cout<<*this;
	}
	void SetAll() {
		std::cin>>*this;
	}
    friend std::istream &operator>>(std::istream &stream, Stationar &out);
    friend std::ostream &operator<<(std::ostream &stream, Stationar &in);
};

#endif // STATIONAR_H
