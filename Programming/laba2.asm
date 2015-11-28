include "emu8086.inc"

data segment
	inputAText  db "Input a number A: ", 10, 13, "$"
	inputBText  db "Input a  number B: ", 10, 13, "$"
    resultText db  "The result of calculations is:", 10, 13, "$" 
    inputOperator db "Enter the operator:    +  -  *  /     : ", 10, 13, "$"
    err1 db  "Wrong operator DETECTED :( !", 10, 13, "$"  
    pressAnyKey db  "Press any key...", 10, 13, "$"
    smth db  " Some interest caused :/ ", 10, 13, "$"
    opr db '?'

    ; first and second number:
    num1 dw ?
    num2 dw ?
    operation db 1, 1 dup("$")
ends

stack segment
    dw   128  dup(0)
ends

code segment
;=========================================
start:
	mov ax, data
    mov ds, ax
    mov es, ax
    mov ax, stack
    mov ss, ax

    ; input text show
    lea dx, inputAText
    mov ah, 9
    int 21h 

    ;get first number and move it to num1 variable
    call scan_num
    mov num1, cx

    ; input text show
    lea dx, inputBText
    mov ah, 9
    int 21h

    ;get second number and move it to num1 variable
    call scan_num
    mov num2, cx

    ;let's start working with operator
    lea dx, inputOperator
    mov ah, 09h     ; output string at ds:dx
    int 21h  


    ; get operator:
    mov ah, 1   ; single char input to AL.
    int 21h
    mov opr, al
    
    putc 0Ah
    putc 0Dh

    cmp opr, 'q'      ; q - exit in the middle.
    je quit

    cmp opr, '*'
    jb wrong_opr
    cmp opr, '/'
    ja wrong_opr

    ;just do it - calculations
    cmp opr, '+'
    je do_plus

    cmp opr, '-'
    je do_minus

    cmp opr, '*'
    je do_mult

    cmp opr, '/'
    je do_div

    jmp exit


do_plus:
    mov ax, num1
    add ax, num2
    call print_num    ; print ax value.
    jmp exit    

do_minus:
    mov ax, num1
    sub ax, num2
    call print_num    ; print ax value.
    jmp exit

do_mult:
    mov ax, num1
    imul num2 ; (dx ax) = ax * num2. 
    call print_num    ; print ax value.
   
    jmp exit

do_div:
    cmp num2, 0
    je wrong_opr
    mov dx, 0
    mov ax, num1
    idiv num2  ; ax = (dx ax) / num2.
    cmp dx, 0
    jnz approx
    call print_num    ; print ax value.
    jmp exit

approx:
    call print_num    ; print ax value.
    putc 20h
    mov ax, dx 
    call print_num
    putc 2fh
    mov ax, num2
    call print_num  
    lea dx, smth  
    mov ah, 09h    ; output string at ds:dx
    int 21h  
    jmp exit

; wrong operator detected
wrong_opr:
    lea dx, err1
    mov ah, 09h     ; output string at ds:dx
    int 21h
    jmp exit  

 exit:
    putc 0Ah
    putc 0Dh  
    
    lea dx, pressAnyKey
    mov ah, 9
    int 21h
 
    ; wait for any key...
    mov ah, 0
    int 16h
              
    jmp start
    ;ret  ; return back to os.  

quit:
    mov ax, 4c00h
    int 21h

ends

DEFINE_SCAN_NUM
DEFINE_PRINT_NUM
DEFINE_PRINT_NUM_UNS

end start



