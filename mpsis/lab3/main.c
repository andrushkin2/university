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

static const unsigned int STEP = 4096;
static volatile int phaseValue = 0;
static volatile unsigned int periodValue = 32768;

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

// Init timers state
static void InitTimers()
{
    TA0CCTL0 = CCIE;    // enable interrupt on compare
    TA0CCR0 = periodValue; // set timer period
    TA0CTL = TASSEL_2 + MC_1 + TACLR + ID__8;
}

// Enable interrupts for buttons ports
static void EnableInterrupts()
{
    P1IES &= ~(BIT7); // Enable interrupt Low-High
    P1IE |= BIT7;     // Enable interrupts for the first port

    P2IES &= ~(BIT2); // Enable interrupt Low-High
    P2IE |= BIT2;     // Enable interrupts for the second port
}

int main(void)
{

    WDTCTL = WDTPW | WDTHOLD;

    // init states of controls
    InitLeds();
    // turn leds off
    TurnLedsOn();

    InitButtons();
    // enable interrupts
    EnableInterrupts();

    // init timers
    InitTimers();

    __bis_SR_register(GIE); // Enable processing of interrupts
    __no_operation();
}

// timer interrupt
#pragma vector = TIMER0_A0_VECTOR
__interrupt void Timer0_A0()
{
    TurnLedsToOppositeState();

    if (phaseValue) {
        phaseValue = 0;
        TA0CCR0 = 65535 - periodValue;
    } else {
        phaseValue = 1;
        TA0CCR0 = periodValue;
    }
}

//Interrupt event for the S1 button
#pragma vector = PORT1_VECTOR
__interrupt void PORT1_ISR(void)
{
    int i;
    // waiting for noise canceling
    for (i = 0; i < 50; i++);

    // load button S1 state
    if (P1IN & BIT7) {
        if (periodValue < 65535 - STEP) {
            periodValue += STEP
        }
    }

    // Reset interrupt flag
    P1IFG = 0;
}

//Interrupt event for the S2 button
#pragma vector = PORT2_VECTOR
__interrupt void PORT2_ISR(void)
{
    int i;
    // waiting for noise canceling
    for (int i = 0; i < 50; i++);

    // load button S2 state
    if (P1IN & BIT7) {
        if (periodValue > STEP) {
            periodValue -= STEP;
        }
    }

    // Reset interrupt flag
    P2IFG = 0;
}
