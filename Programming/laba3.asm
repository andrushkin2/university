include "emu8086.inc"

data segment
	inputOpenFileText  db "Open file: ", 10, 13, "$"
	inputWriteFile  db "Write to file: ", 10, 13, "$"
    inputWord  db "Enter the word for searching: ", 10, 13, "$"
    split   db 6, ' ', '.', ',', 9, 10, 13
    errorOnOpenText  db "Error on open file!", 10, 13, "$"
    buf  db 255, 255 dup('$')
    iterator dw 0
    handle dw ?


    file1 db "file1.txt", 0
    file2 db "C:\emu8086\newfile.txt", 0

    ;buf = 'asd asdasd asd asd $$$$$$$'
    ;buf = '$$$$$$$$$$$$'
    ; first and second :
    interestWord db 255, 255 dup('$')
    index dw 0
    foundWord db 255, 255 dup('$')
    foundWordIterator dw 0
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
    ;call clearBuf
;--------------------------------------------------------------
;reset Word    
out_str:
    mov bx, iterator
    mov ah, 3fh      ; read form the file
    mov cx, 1        ; a byte
    ;xor dx, dx
    lea dx, buf[bx]      ; set read symbol to the buf variable
    mov bx, handle
    int 21h 
    mov bx, iterator
    cmp buf[bx], 0Dh
    je workWithRow 
    cmp buf[bx], 0Ah
    je incIterator  
    cmp ax, cx       ; if EoF or reading error
    jnz quit   
    ;inc w.[iterator]    
    ;mov dl, buf
    ;mov ah, 2        ; output the symbol in dl
    ;int 21h  
incIterator:    
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
;--------------------------------------------------------------
;reset Word
workWithRow:
    push si
    push di
    push ax
    push bx
    push cx
    ;body
    mov index, 0
workWithRowStart:
    call getWord
    lea di, interestWord
    lea si, foundWord
    ;if find end of string, then exit and load next row
    cmp [si], '$'
    je workWithRowEnd
    
    ;mov bx, 0
checkByte:
    mov al, [di]

    cmp al, [si]
    je nextByte

    jmp workWithRowStart

nextByte:
    inc di
    inc si
    jmp checkByte
    ;if equal -> write to file
    ;;cmp
    ;if not eqaul -> workWithRowStart(find next word) 
    ;body end
    ;interestWord
workWithRowEnd:
    pop cx
    pop bx
    pop ax
    pop di
    pop si
    ;go back to loading file
    ret
;--------------------------------------------------------------
;get next word from string
;output: foundWord contained a word
getWord:
    push bx
    push si
    push di
    push ax
    push cx
    push dx

    call clearFoundWord
    mov dx, foundWord
getWordStart:
    mov bx, index
    mov al, buf[bx]
    call checkIsSplitter
    jnc getWordEnd
    inc index
    mov [di], al
    jmp getWordStart
    ;
    ;mov al, [di]
    ;call checkIsSplitter
    ;jnc findFirstSymbolExit
    ;
getWordEnd:
    pop dx
    pop cx
    pop ax
    pop di
    pop si
    pop bx
    ret
    
;--------------------------------------------------------------
;reset foundWord variable
clearFoundWord:
    push si
    push di
    push ax
    push cx
    ;body
    cld
    mov al, '$'
    lea di, foundWord
    mov cx, 255
    rep stosb       ;set to variable symbols "$" 
    ;body end
    mov foundWordIterator, 0
    pop cx
    pop ax
    pop di
    pop si
    ;go back to loading file
    ret

;--------------------------------------------------------------
;input:     al - symbol
;output:    C flag set if symbol is splitter
checkIsSplitter:
    push di
    push cx
    lea di, split
    xor cx, cx
    mov cl, [di] ; load amount bytes to compare
    inc di
isSplitter:
    cmp al, [di]
    je setAsFound
    inc di
    loop isSplitter   
    clc
    jmp setAsNotFound
setAsFound:    
    stc
setAsNotFound:   
    pop cx
    pop di
    ret
;--------------------------------------------------------------
;reset clear variable
clearBuf:
    push si
    push di
    push ax
    push cx
    ;body
    cld
    mov al, '$'
    lea di, buf
    mov cx, 255
    rep stosb       ;set to variable symbols "$" 
    ;body end
    mov iterator, 0
    pop cx
    pop ax
    pop di
    pop si
    ;go back to loading file
    ret
ends

end start