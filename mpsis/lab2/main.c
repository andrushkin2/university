#include <msp430.h>

/*
 Программа для микроконтроллера макетной платы MSP-EXP430F5529
 
 Алгоритм работы программы:
 - по отпусканию кнопки S2 переключать своё состояние между «выключено» и «включено».
 При переходе в состояние «выключено» программа должна перестать реагировать на кнопку S1, а светодиоды должны погаснуть.
 При переходе в состояние «включено» разрешается работа кнопки S1, а светодиоды должны зажечься и гореть непрерывно.
 - по отпусканию кнопки S1 должен переключаться режим работы светодиодов между «мерцанием» и «непрерывным горением»
 
 Условия:
 - не допускается подвисание устройства при нажатии и удерживании кнопок
 - не должны использоваться прерывания и аппаратные таймеры
*/


/*
 ==========  Initial variables  ==========
 */
volatile unsigned int enabled = 0;
volatile unsigned int blinking = 0;
volatile unsigned int delay = 0;

/*
 =========================================
 */

// InitLeds
static void InitLeds()
{
    //set ports to OUT mode
    P8DIR |= BIT1;
    P1DIR |= BIT0;
    P8DIR |= BIT2;
}

// InitButtons
static void InitButtons()
{
    //set port to IN
    P1DIR &= !(BIT7);
    P2DIR &= !(BIT2);

    //enable pull-up
    P1OUT |= BIT7; // set button 1 to output
    P1REN |= BIT7; // enable pull-up

    P2OUT |= BIT2;
    P2REN |= BIT2;
}

// Turn leds to opposite state
static void TurnLedsToOppositeState()
{
    P8OUT ^= BIT1;
    P1OUT ^= BIT0;
    P8OUT ^= BIT2;
}

// Turn leds On
static void TurnLedsOn()
{
    P1OUT |= BIT0;
    P8OUT |= BIT1;
    P8OUT |= BIT2;
}

// Turn leds Off
static void TurnLedsOff()
{
    P1OUT &= ~(BIT0);
    P8OUT &= ~(BIT1);
    P8OUT &= ~(BIT2);
}

// Enable interrupts for buttons ports
static void EnableInterrupts()
{
    P1IES &= ~(BIT7); // Enable interrupt Low-High
    P1IE |= BIT7;     // Enable interrupts for the first port

    P2IES &= ~(BIT2); // Enable interrupt Low-High
    P2IE |= BIT2;     // Enable interrupts for the second port

    __bis_SR_register(GIE); // Enable processing of interrupts
}

static void processBlinking()
{
    if (--delay == 0)
    {
        if (blinking > 0 && enabled > 0) {
            // blinking is ON -> switch leds to opposite state
            TurnLedsToOppositeState();
        } else if (blinking == 0 && enabled > 0) {
            //blinking is OFF -> leds is ON
            TurnLedsOn();
        } else {
            //Programm is OFF -> lights is OFF
            TurnLedsOff();
        }

        delay = 6000;
    }
}

int main(void)
{

    WDTCTL = WDTPW | WDTHOLD;

    // init states of controls
    InitLeds();
    InitButtons();

    // turn leds off
    TurnLedsOff();

    // enable interrupts
    EnableInterrupts();

    while (1)
    {
        // process the programm state
        processBlinking();
    }
}

//Interrupt event for the S1 button
#pragma vector = PORT1_VECTOR
__interrupt void PORT1_ISR(void) {
    for (int i = 0; i < 30; i++);

    // load button S1 state
    if (P1IN & BIT7) {
        if (enabled == 0) {
            // If programm is OFF -> set programm to ON state
            enabled = 1;
        } else if (enabled == 1) {
            // If programm is ON -> set programm to OFF state, blinking is OFF
            enabled = 0;
            blinking = 0;
        }
    }

    // Reset interrupt flag
    P1IFG = 0;
}

//Interrupt event for the S2 button
#pragma vector = PORT2_VECTOR
__interrupt void PORT2_ISR(void) {
    for (int i = 0; i < 30; i++);

    // load button S2 state
    if (P1IN & BIT7) {
        if (blinking == 0 && enabled == 1) {
            // If programm is ON and blinking is OFF -> set blinking to ON state
            blinking = 1;
        } else if (blinking == 1 && enabled == 1) {
            // If programm is ON and blinking is ON -> set blinking to OFF state
            blinking = 0;
        }
    }

    // Reset interrupt flag
    P2IFG = 0;
}
