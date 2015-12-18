 include emu8086.inc   

data segment  
    readHandle      dw 0
    count           dw 0    
    filePath        db 200, 199 dup('$') ;'C:\file2.txt',0
    buf             db 200, 199 dup('$')
    pkey            db "press any key...$"
    old_cs dw 0
    old_ip dw 0 
ends

stack segment
    dw   128  dup(0)
ends
;======================================================================    
code segment

NEW_INT PROC FAR
    push ax;сохраняем все изменяемые регистры
    push dx
    ; wait for any key....    
    mov ah, 1
    int 21h

    pop dx ;восстанавливаем регистры
    pop ax
    iret
NEW_INT ENDP 


start:
; set segment registers:
    mov ax, data
    mov ds, ax
    mov es, ax

    mov ah, 35h ; функция получения вектора
    mov al, 23h ; номер вектора
    int 21h
    mov old_ip, bx ; запоминание смещения
    mov old_cs, es ; и сегмента

    push ds
    mov dx, offset NEW_INT ; смещение для процедуры в DX
    mov ax, seg NEW_INT ; сегмент процедуры
    mov ds, ax ; помещаем в DS
    mov ah, 25h ; функция установки вектора
    mov al, 23h ; номер вектора
    int 21h ; меняем прерывание
    pop ds

    ;enter a filePath to file with data
    PRINT 'Enter path to a file:'
    lea di, filePath
    mov dx, 200
    CALL GET_STRING  

    ;open file for reading 
    mov ah, 3Dh
    mov al, 2         
    lea dx, filePath      
    int 21h
    jc onError    
    mov readHandle, ax  

    mov bx, ax       
    xor cx, cx
    xor dx, dx 
    xor di, di
    mov ax, 4200h
    int 21h
;======================================================================
; mark for reading next one symbol from file
readNextSymbol: 
	;read next one symbol from file  
    mov bx, count
    mov ah, 3fh      
    mov cx, 1
    xor dx, dx       
    lea dx, buf[bx]
    mov bx, readHandle
    int 21h
    
    mov bx, count          
    ;if end of file -> exit    
    cmp ax, cx       
    jnz exit
    ;print symbol to console
    lea dx, buf[bx]
    mov ah, 9
    int 21h   
    ;increment counter and repeat reading a new symbol
    inc count  
    jmp readNextSymbol     
;======================================================================
;mark of some error      
onError:
    PRINT 'Something is wrong! :(' 
    
;======================================================================     
; mart for exit program
exit: 
    cli
    push ds ;DS будет разрушен
    mov dx, old_ip ;подготовка к восстановлению
    mov ax, old_cs ;
    mov ds, ax ;подготовка к восстановлению
    mov ah, 25h ;функция установки вектора
    mov al, 23h ;номер вектора
    int 21h ;восстанавливаем вектор
    pop ds ;восстанавливаем DS
    sti

    ;prinit waiting message            
    lea dx, pkey
    mov ah, 9
    int 21h       
    
    ; wait for any key....    
    mov ah, 1
    int 21h
    
    ; exit to operating system.
    mov ax, 4c00h 
    int 21h     
    
    ;define function for working with string
    DEFINE_GET_STRING
    DEFINE_CLEAR_SCREEN
    DEFINE_PRINT_STRING  
    
    
    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;   
ends

end start
   