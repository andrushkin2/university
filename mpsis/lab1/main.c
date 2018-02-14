#include <msp430.h>


// InitLeds
static void InitLeds() {
    //set ports to OUT mode
    P8DIR |= BIT1;
    P1DIR |= BIT0;
    P8DIR |= BIT2;
}

// InitButtons
static void InitButtons() {
    //set port to IN
    P1DIR &= !(BIT7);
    P2DIR &= !(BIT2);

    //enable pull-up
    P1OUT |= BIT7; // set button 1 to output
    P1REN |= BIT7; // enable pull-up

    P2OUT |= BIT2;
    P2REN |= BIT2;
}

// TurnLedsOn
static void TurnLedsOn() {
    P1OUT |= BIT0;
    P8OUT |= BIT1;
    P8OUT |= BIT2;
}

// TurnLedsOff
static void TurnLedsOff() {
    P1OUT &= ~(BIT0);
    P8OUT &= ~(BIT1);
    P8OUT &= ~(BIT2);
}

int main() {
    volatile unsigned int buttonS2;
    volatile unsigned int buttonS1;
    volatile unsigned int buttonS2MouseDown;
    volatile unsigned int buttonS1MouseDown;

    volatile unsigned int i = 0;
    volatile unsigned int j = 0;
    volatile unsigned int delay = 0;
    volatile unsigned int enabled = 0;

    // WDTCTL = WDTPW | WDTHOLD;   // Stop watchdog timer
    InitLeds();
    InitButtons();

    while (1) {
        // read buttons states
        buttonS1 = (P1IN & BIT7);
        buttonS2 = (P2IN & BIT2);

        if (j > 0 && i > 0 && enabled == 1) {
            P8OUT ^= BIT1;
            P1OUT ^= BIT0;
            P8OUT ^= BIT2;
            enabled = 0;
        }
        else if (j > 0 && i > 0) {
            TurnLedsOn();
            enabled = 1;
        }
        else if (j == 0 && i > 0) {
            TurnLedsOn();
            enabled = 1;
        } else {
            TurnLedsOff();
            enabled = 0;
        }

        // process button 2 logic
        if (buttonS2MouseDown == 1 && buttonS2 != 0) {
            if (i == 0) {
                i++;
                TurnLedsOn();
            } else if (i > 0) {
                i--;
                TurnLedsOff();
            }
            buttonS2MouseDown = 0;
        } else if (buttonS2 == 0) {
            buttonS2MouseDown = 1;
        }

        // process button 1 logic
        if (buttonS1MouseDown == 1 && buttonS1 != 0) {
            if (j == 0) {
                j++;
            } else if (j > 0) {
                j--;
            }

            buttonS1MouseDown = 0;
        } else if (buttonS1 == 0 && i > 0) {
            buttonS1MouseDown = 1;
        }

        // time delay
        delay = 10000;
        do
            delay--;
        while (delay != 0);
    }
}
