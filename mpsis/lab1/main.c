#include <msp430.h>

/*
====================================== Config =======================================
*/
static const int LED_BLINK_TIMEOUT = 1500;


static const int S1_PIN_NUM = 7;
static const int S2_PIN_NUM = 2;

#define S1_PORT_NAME            P1
#define S2_PORT_NAME            P2


static const int LED1_PIN_NUM = 1;
static const int LED2_PIN_NUM = 2;

#define LED1_PORT_NAME          P8
#define LED2_PORT_NAME          P8

/*
=====================================================================================
*/

#define CONCAT2(x, y)     y ## x
#define CONCAT(x, y)      CONCAT2(x, y)

#define B1_DIR            CONCAT(DIR, S1_PORT_NAME)
#define B1_REN            CONCAT(REN, S1_PORT_NAME)
#define B1_IN             CONCAT(IN,  S1_PORT_NAME)

#define B2_DIR            CONCAT(DIR, S2_PORT_NAME)
#define B2_REN            CONCAT(REN, S2_PORT_NAME)
#define B2_IN             CONCAT(IN,  S2_PORT_NAME)

#define LED1_DIR          CONCAT(DIR, LED1_PORT_NAME)
#define LED1_OUT          CONCAT(OUT, LED1_PORT_NAME)

#define LED2_DIR          CONCAT(DIR, LED2_PORT_NAME)
#define LED2_OUT          CONCAT(OUT, LED2_PORT_NAME)

enum ButtonEvent {
    BE_NONE,
    BE_S1_UP,
    BE_S2_UP
};

struct ProgramState {
    int enable;
    enum ButtonEvent buttonEvent;
    int enableBlink, blinkCounter;
    int isLedsOn;
};

/*
==================
InitLeds
==================
*/
static void InitLeds() {
    //set both port to OUT mode
    LED1_DIR |= (1 << LED1_PIN_NUM);
    LED2_DIR |= (1 << LED2_PIN_NUM);
}

/*
==================
InitButtons
==================
*/
static void InitButtons() {
    //set port to IN
    B1_DIR &= ~(1 << S1_PIN_NUM);
    //enable pull-up
    B1_REN |= (1 << S1_PIN_NUM);

    B2_DIR &= ~(1 << S2_PIN_NUM);
    B2_REN |= (1 << S2_PIN_NUM);
}

/*
==================
TurnLedsOn
==================
*/
static void TurnLedsOn() {
    LED1_OUT |= (1 << LED1_PIN_NUM);
    LED2_OUT |= (1 << LED2_PIN_NUM);
}

/*
==================
TurnLedsOff
==================
*/
static void TurnLedsOff() {
    LED1_OUT &= ~(1 << LED1_PIN_NUM);
    LED2_OUT &= ~(1 << LED2_PIN_NUM);
}

/*
==================
UpdateLedsBlinking
==================
*/
static void UpdateLedsBlinking(struct ProgramState * state) {
    if (state->enable && state->enableBlink) {
        if (++state->blinkCounter == LED_BLINK_TIMEOUT) {
            if (state->isLedsOn) {
                TurnLedsOff();
                state->isLedsOn = 0;
            } else {
                TurnLedsOn();
                state->isLedsOn = 1;
            }
            state->blinkCounter = 0;
        }
    }
}

/*
==================
ReadButtonsStates
==================
*/
static void ReadButtonsStates(struct ProgramState * state) {
    static int buttonReadDelayCounter = 0;
    static int s1PrevState = 1, s2PrevState = 1;

    if (++buttonReadDelayCounter == 500) {
        buttonReadDelayCounter = 0;
        const int s1NewState = (B1_IN & (1 << S1_PIN_NUM)) ? 1 : 0;
        const int s2NewState = (B2_IN & (1 << S2_PIN_NUM)) ? 1 : 0;

        if (s1NewState == 1 && s1PrevState == 0) {
            state->buttonEvent = BE_S1_UP;
        }
        if (s2NewState == 1 && s2PrevState == 0) {
            state->buttonEvent = BE_S2_UP;
        }

        s1PrevState = s1NewState;
        s2PrevState = s2NewState;
    }
}

/*
==================
ProcessButtons
==================
*/
static void ProcessButtons(struct ProgramState * state) {
    if (state->buttonEvent == BE_S1_UP) {
        if (state->enable) {
            state->enable = state->enableBlink = state->isLedsOn = state->blinkCounter = 0;
            TurnLedsOff();
        } else {
            state->enable = state->isLedsOn = 1;
            TurnLedsOn();
        }
    } else if (state->buttonEvent == BE_S2_UP && state->enable) {
        if (state->enableBlink) {
            state->enableBlink = state->blinkCounter = 0;
            TurnLedsOn();
            state->isLedsOn = 1;
        } else {
            state->enableBlink = 1;
        }
    }
}

/*
==================
main

    Initialization and main loop.
==================
*/
int main() {
    struct ProgramState state = {
        .enable = 0,
        .buttonEvent = BE_NONE,
        .enableBlink = 0,
        .blinkCounter = 0,
        .isLedsOn = 0
    };

    // WDTCTL = WDTPW | WDTHOLD;   // Stop watchdog timer
    InitLeds();
    InitButtons();

    while (1) {
        ReadButtonsStates(&state);

        if(state.buttonEvent != BE_NONE) {
            ProcessButtons(&state);
            state.buttonEvent = BE_NONE;
        }

        UpdateLedsBlinking(&state);
    }
}
