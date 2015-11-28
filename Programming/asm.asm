
data segment
    pkey    db "Press any key...$"    
    InpReq  db "Input string: ", 10, 13, "> $"
    split   db 6, ' ', '.', ',', 9, 10, 13
    str_buf db 200, 200 dup(0)
ends

stack segment
    dw   128  dup(0)
ends

code segment
    
;=============================================================
start:
    mov ax, data
    mov ds, ax
    mov es, ax
    mov ax, stack
    mov ss, ax

    lea dx, InpReq      ; input text show
    mov ah, 9
    int 21h 
    
    lea dx, str_buf     ; fill string buffer by user
    mov ah, 0ah
    int 21h
    
    lea di, str_buf+1     ; put dollar to string end for correct print
    lea si, str_buf+2
    xor cx, cx
    mov cl, [di]
    add si, cx
    mov [si], '$'      
    
    lea di, str_buf+2
mainFunc:
    cmp [di], '$'
    je mainExit
    cmp [di], ' '
    je incToNext
    call getFirstSymbol
    mov si, di
    call findEndOfWorld
    mov bp, di
    dec bp
    call reversWord
    jmp mainFunc       

mainExit:              
    
    call toNewLine

    lea dx, str_buf+2  ; result string show
    mov ah, 9
    int 21h          
    
    call toNewLine
                   
    lea dx, pkey   ; Press any key text show
    mov ah, 9
    int 21h    
                                                  
    mov ah, 1  ; wait for any key....
    int 21h
    
    mov ax, 4c00h ; exit to operating system.
    int 21h
    
;==============================================================

;--------------------------------------------------------------
;input:     di - pointer to first symbol in word
;output:    di - pointer to first symbol after word
findEndOfWorld: 
    cmp [di], '$'      ; if string end
    je endOfWorldExit        ; exit
    mov al, [di]       ; else load in al symbol
    call checkIsSplitter  ; and check him for splitter
    jc endOfWorldExit          ; if al is splitter, we'v find word end
    inc di               ; else moving di to next symbol
    jmp findEndOfWorld    ; end repeat
endOfWorldExit:    
    ret

;--------------------------------------------------------------
;input:     di - pointer to symbol in string
;output:    di - pointer to first symbol in word
getFirstSymbol:
    push ax
findFirstSymbol:
    mov al, [di]
    call checkIsSplitter
    jnc findFirstSymbolExit
    inc di
    jmp findFirstSymbol
findFirstSymbolExit:
    pop ax
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
;input:     si - pointer to first symbol in word
;           bp - pointer to last symbol in word
;output:    registers not touch
reversWord:
    push si
    push di
    push bx
    push ax
    
    mov di, bp
    mov ax, bp
    sub ax, si  
    inc ax      ; now in ax - word length
    mov bx, 2
    div bl    
    cmp ah, 1 ; in ah - remainder after divide
    je reversIfOddAmount 
    
reversIfEvenAmount:
    mov bl, [si]
    xchg [di], bl  ;swap analog
    mov [si], bl
    inc si
    dec di
    mov ax, di
    sub ax, si
    jns reversIfEvenAmount
    jmp reversExit   
    
reversIfOddAmount:
    mov bl, [si]
    xchg [di], bl
    mov [si], bl
    inc si
    dec di
    mov ax, di
    sub ax, si
    cmp ax, 0
    jne reversIfEvenAmount
    
reversExit:
    pop ax
    pop bx   
    pop di
    pop si
    ret    

;___________________________________________
;move to a new line
toNewLine:
    push ax
    push dx
    
    mov ah, 2
    mov dl, 10
    int 21h
    mov dl, 13
    int 21h

    pop dx
    pop ax
    ret   

incToNext:
    inc di
    jmp mainFunc
    
ends                                     

end start
