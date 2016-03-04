name "Lab4"

.model tiny
.code
.startup
 
    jmp begin 

        filename            db "file2.txt",0
        outbuf              db 0
        count               dw 0 
        readHandle          dw 0
        buf                 db 200, 199 dup('$')
        pkey                db "press any key...$"
        old_cs              dw 0
        old_ip              dw 0 
    
        
new_keyb_int  proc  far
    
    push ax
    push bx
    push cx
    push dx
    push ds 
    push es
 
    mov bx, cs     ; our data stored in code segment
    mov ds, bx 

    ; wait for any key....    
    mov ah, 01h
    int 21h  
    
    pop es    
    pop ds
    pop dx
    pop cx
    pop bx
    pop ax
              
    jmp dword ptr cs:old_cs
    
new_keyb_int  endp

;======================================================

begin proc
    
    mov bx, cs
    mov ds, bx

    mov ah, 35h ; function for getting vector
    mov al, 23h ; vector number
    int 21h
    mov old_ip, bx ; save interval
    mov old_cs, es ; save segment

    push ds 
    mov dx, offset new_keyb_int ; set interval of procedure to DX
    mov bx, seg new_keyb_int ; segment of procedure
    mov ds, bx ; 
    mov ah, 25h ; function to set vector
    mov al, 23h ; vector number
    int 21h ; change to new vector
    pop ds  

    ;open file for reading 
    mov ah, 3Dh
    mov al, 2         
    lea dx, filePath      
    int 21h
    jc exit    
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

exit:    
    lea dx, begin
    int 27h 
  

begin endp


end                    	


