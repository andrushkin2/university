include "emu8086.inc"

data segment
	inputOpenFileText  db "Open file: ", 10, 13, "$"
	inputWriteFile  db "Write to file: ", 10, 13, "$"
    inputWord  db "Enter the word for searching: ", 10, 13, "$"
    errorOnOpenText  db "Error on open file!", 10, 13, "$"
    buf  db 255, 255 dup('$')
    iterator dw 0
    handle dw ?

    file1 db "file1.txt", 0
    file2 db "C:\emu8086\newfile.txt", 0

    ;buf = 'asd asdasd asd asd $$$$$$$'
    ;buf = '$$$$$$$$$$$$'
    ; first and second :
    interestWord dw ?
ends

stack segment
    dw   128  dup(0)
ends

code segment
===============================================

start:
    mov ax, data
    mov ds, ax
    mov es, ax
    mov ax, stack
    mov ss, ax

    ; input text show
    lea dx, inputOpenFileText
    mov ah, 9
    int 21h 

    mov ah, 3Dh     ; open the file1.txt
    mov cx, 0
    mov dx, offset file1
    mov al, 2
    int 21h
    jc errorOnOpen

    mov [handle], ax       ; set to bx link to the opened file
    xor cx, cx
    xor dx, dx
    mov ax, 4200h    ; go to the start of file
    int 21h  

      ; input text show
    lea dx, inputWord
    mov ah, 9
    int 21h 

    lea dx, interestWord     ; enter a word for searching in file row
    mov ah, 0ah
    int 21h 

    ;xor bx, bx
    ;lea dx, buf[]
out_str:
    mov bx, iterator
    mov ah, 3fh      ; read form the file
    mov cx, 1        ; a byte
    lea dx, buf[bx]      ; set read symbol to the buf variable
    mov bx, handle
    int 21h 
    ;cmp dl, 0Dh
    ;jmp ra-ta-ta        
    cmp ax, cx       ; if EoF or reading error
    jnz quit   
    ;inc w.[iterator]    
    ;mov dl, buf
    ;mov ah, 2        ; output the symbol in dl
    ;int 21h  
    inc iterator
    inc dx 
    jmp out_str

errorOnOpen:
    lea dx, errorOnOpenText
    mov ah, 9
    int 21h 
    jmp quit

quit:
    mov ax, 4c00h
    int 21h

ends

end start