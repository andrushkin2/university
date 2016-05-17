
#include<stdio.h>
#include<stdlib.h>
#include<dos.h>

//  declarations for the old interrupts
void interrupt (*old8Interrupt)(...);
void interrupt (*old9Interrupt)(...);
void interrupt (*old10Interrupt)(...);
void interrupt (*old11Interrupt)(...);
void interrupt (*old12Interrupt)(...);
void interrupt (*old13Interrupt)(...);
void interrupt (*old14Interrupt)(...);
void interrupt (*old15Interrupt)(...);
void interrupt (*old70Interrupt)(...);
void interrupt (*old71Interrupt)(...);
void interrupt (*old72Interrupt)(...);
void interrupt (*old73Interrupt)(...);
void interrupt (*old74Interrupt)(...);
void interrupt (*old75Interrupt)(...);
void interrupt (*old76Interrupt)(...);
void interrupt (*old77Interrupt)(...);
//  declarations for the new interrupts
void interrupt new8Interrupt(...);
void interrupt new9Interrupt(...);
void interrupt new10Interrupt(...);
void interrupt new11Interrupt(...);
void interrupt new12Interrupt(...);
void interrupt new13Interrupt(...);
void interrupt new14Interrupt(...);
void interrupt new15Interrupt(...);
void interrupt new70Interrupt(...);
void interrupt new71Interrupt(...);
void interrupt new72Interrupt(...);
void interrupt new73Interrupt(...);
void interrupt new74Interrupt(...);
void interrupt new75Interrupt(...);
void interrupt new76Interrupt(...);
void interrupt new77Interrupt(...);
//  another function declarations
void printDataToScreen(char* str, int x, int y, unsigned char attribute);
void convertByteToString(unsigned char temp, char *str);
void printInterrupt();

void main()
{       
    //  for timer
    old8Interrupt = getvect(0x8);
    setvect(0x78, new8Interrupt);
    //  for keyboard
    old9Interrupt = getvect(0x9);
    setvect(0x79, new9Interrupt);
    //  cascading
    old10Interrupt = getvect(0xA);
    setvect(0x7A, new10Interrupt);
    //  COM2 port
    old11Interrupt = getvect(0xB);
    setvect(0x7B, new11Interrupt);
    //  COM1 port
    old12Interrupt = getvect(0xC);
    setvect(0x7C, new12Interrupt);
    //  hard drive interrupt for XT
    old13Interrupt = getvect(0xD);
    setvect(0x7D, new13Interrupt);
    //  floppy interrupt
    old14Interrupt = getvect(0xE);
    setvect(0x7E, new14Interrupt);
    //  printer interrupt
    old15Interrupt = getvect(0xF);
    setvect(0x7F, new15Interrupt);
    //  RTC interrupt
    old70Interrupt = getvect(0x70);
    setvect(0x80, new70Interrupt);
    //  EGA controller interrupt
    old71Interrupt = getvect(0x71);
    setvect(0x81, new71Interrupt);
    //  IRQ10 interrupt
    old72Interrupt = getvect(0x72);
    setvect(0x82, new72Interrupt);
    //  IRQ11 interrupt
    old73Interrupt = getvect(0x73);
    setvect(0x83, new73Interrupt);
    //  IRQ12 interrupt
    old74Interrupt = getvect(0x74);
    setvect(0x84, new74Interrupt);
    //  math so-processor
    old75Interrupt = getvect(0x75);
    setvect(0x85, new75Interrupt);
    //  HDD controller
    old76Interrupt = getvect(0x76);
    setvect(0x86, new76Interrupt); 
    //  IRQ15 interrupt
    old77Interrupt = getvect(0x77);
    setvect(0x87, new77Interrupt);

    //  initialization master controller
    //  save register of masks
    unsigned char value = inp(0x21); 
    outp(0x20, 0x11);
    outp(0x21, 0x78);
    outp(0x21, 0x04);
    outp(0x21, 0x01);
    //  reset register of masks
    outp(0x21, value);
    //  initialization slave controller
    //  save register of masks
    value = inp(0xA1);
    outp(0xA0, 0x11);
    outp(0xA1, 0x80);
    outp(0xA1, 0x02);
    outp(0xA1, 0x01);
    //  reset register of masks
    outp(0xa1, value);
    //  keep the app as resident
    _dos_keep(0, (_DS - _CS) + (_SP / 16) + 1);
}

//  convert byte value to string
void convertByteToString(unsigned char byteValue, char *stringPointer)
{
    int i;
    stringPointer[8] = 0;
    i = 7;
    while(byteValue) {
        stringPointer[i] = '0' + byteValue % 2;
        byteValue = byteValue / 2;
        i--;
    }
    for(; i > -1; i--) {
        stringPointer[i] = '0';
    }
}

void printDataToScreen(char* stringPointer, int x, int y, unsigned char attribute)
{
    char far* start = (char far*)0xb8000000;
    start += x + 160 * y;
    int i = 0;
    while(stringPointer[i] != 0)
    {
        *start = stringPointer[i];
        start++;
        *start = attribute;
        start++;
        i++;
    }               
}
void printInterrupt()
{
    //  Interrupt Mask Register 
    unsigned char imrMaster, imrSlave;
    //  Interrupt Service Register
    unsigned char isrMaster, isrSlave; 
    //  Interrupt Request Register
    unsigned char irrMaster, irrSlave;
    //  get values for IMR
    imrMaster = inp(0x21);
    imrSlave = inp(0xA1);
    //  get values for ISR
    outp(0x20, 0x0A);
    irrMaster = inp(0x20);
    outp(0x20, 0x0B);
    isrMaster = inp(0x20);
    //  get values for IRR
    outp(0xA0,0x0A);
    irrSlave = inp(0xA0);
    outp(0xA0,0x0B);
    isrSlave = inp(0xA0);
    char str[9];        
    printDataToScreen("MASTER:  ISR: ",0, 0, 0x6E);
    convertByteToString(isrMaster, str);
    printDataToScreen(str, 44, 0, 0x6E);
    
    printDataToScreen("  ||  IRR: ",60, 0, 0x6E);
    convertByteToString(irrMaster, str);
    printDataToScreen(str, 80, 0, 0x6E);   

    printDataToScreen("  ||  IMR: ", 96, 0, 0x6E);
    convertByteToString(imrMaster, str);
    printDataToScreen(str, 116, 0, 0x6E);  
    
    printDataToScreen("SLAVE:  ISR: ", 0, 1, 0x1E);
    convertByteToString(isrSlave, str);
    printDataToScreen(str, 44, 1, 0x1E);
    
    printDataToScreen("  ||  IRR: ", 60, 1, 0x1E);
    convertByteToString(irrSlave, str);
    printDataToScreen(str, 80, 1, 0x1E);   

    printDataToScreen("  ||  IMR: ",96, 1, 0x1E);
    convertByteToString(imrSlave, str);
    printDataToScreen(str, 116, 1, 0x1E);  
}

void interrupt new8Interrupt(...)
{
    printInterrupt();
    (*old8Interrupt)();
}

void interrupt new9Interrupt(...)
{
    printInterrupt();
    (*old9Interrupt)();
}
void interrupt new10Interrupt(...)
{
    printInterrupt();
    (*old10Interrupt)();
}

void interrupt new11Interrupt(...)
{
    printInterrupt();
    (*old11Interrupt)();
}
void interrupt new12Interrupt(...)
{
    printInterrupt();
    (*old12Interrupt)();
}
void interrupt new13Interrupt(...)
{
    printInterrupt();
    (*old13Interrupt)();
}
void interrupt new14Interrupt(...)
{
    printInterrupt();
    (*old14Interrupt)();
}
void interrupt new15Interrupt(...)
{
    printInterrupt();
    (*old15Interrupt)();
}
void interrupt new70Interrupt(...)
{
    printInterrupt();
    (*old70Interrupt)();
}
void interrupt new71Interrupt(...)
{
    printInterrupt();
    (*old71Interrupt)();
}
void interrupt new72Interrupt(...)
{
    printInterrupt();
    (*old72Interrupt)();
}
void interrupt new73Interrupt(...)
{
    printInterrupt();
    (*old73Interrupt)();
}
void interrupt new74Interrupt(...)
{
    printInterrupt();
    (*old74Interrupt)();
}
void interrupt new75Interrupt(...)
{
    printInterrupt();
    (*old75Interrupt)();
}
void interrupt new76Interrupt(...)
{
    printInterrupt();
    (*old76Interrupt)();
}
void interrupt new77Interrupt(...)
{
    printInterrupt();
    (*old77Interrupt)();
}
