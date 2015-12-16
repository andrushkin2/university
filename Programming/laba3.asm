
 include emu8086.inc   

data segment  
    HANDLE dw 0 
    HANDLE1 dw 0       
    count dw 0    
    PATH    db   200, 199 dup('$') ;'C:\emuread.txt',0
    PATH_RES    db    'C:\result.txt',0   
    buf     db 200, 199 dup('$')    
    key     db 200, 199 dup('$')
    pkey db "press any key...$"
ends

stack segment
    dw   128  dup(0)
ends

code segment
start:
; set segment registers:
    mov ax, data
    mov ds, ax
    mov es, ax

    ;enter a path to file with data
    PRINT 'Enter PATH:'
    lea di,PATH
    mov dx,200
    CALL GET_STRING  

    ;enter a key for searching
    PRINT 'Enter key:'
    lea dx, key
    mov ah, 0ah
    int 21h 
    
    ;set symbol $ to the end of key
    lea di, key+1  ; calculate adress of the last symbol in string
    lea si, key+2
    xor cx, cx
    mov cl, [di]
    add si, cx
    mov [si], '$'    ; replace last symbol to $ for correct print by ah=9 dos function 
    
    ;open file for writing    
    mov ah,3Ch              
    lea dx,PATH_RES       
    xor cx,cx               
    int 21h                 
    jc onError               
    mov [HANDLE1],ax 

    ;open file for reading 
    mov ah, 3Dh
    mov al,2         
    lea dx,PATH      
    int 21h
    jc onError    
    mov HANDLE, ax   
    
    mov bx,ax       
    xor cx,cx
    xor dx,dx 
    xor di,di
    mov ax,4200h
    int 21h 
; mark for reading next one symbol from file
readNextSymbol:   
    mov bx, count
    mov ah,3fh      
    mov cx,1
    xor dx,dx       
    lea dx,buf[bx]
    mov bx,HANDLE
    int 21h
    
    mov bx, count           
    cmp buf[bx],0ah
    je searchKeyInRow
    ;if end of file -> exit    
    cmp ax,cx       
    jnz exit
    ;increment counter and repeat reading a new symbol
    inc count  
    jmp readNextSymbol   
    
; mark for searching key in read row          
searchKeyInRow:
    ;if end of row -> exit
    cmp [key+1], 0
    je exit 
    
    call clear_screen
    ; set into di pointer to the first symbol in row 
    lea di, buf
searchLoop: 
    ;if end of row -> jump to reading a new line   
    cmp [di], '$'
    je clearRow

    mov dx, di 
    ;in si pointer to first symbol in row      
    lea si, key+2 
    xor cx, cx
    ; in cx - length of string that we conld find
    mov cl, key[1]
    ;run repe for searching is row include key  
    repe cmpsb        
    ; if find out key in row -> write it to file
    je writeToFile
    ; else repeat until end of row    
    jmp searchLoop
   
; mark for writing found row to file   
writeToFile:   
    ;increment count
    inc count 

    ;open result file for writing
    mov ah, 3Dh
    mov al,2         
    lea dx,PATH_RES      
    int 21h
    jc  onError        
    mov HANDLE1, ax         
    mov bx,ax   
    mov ah, 42h
    mov al,2        
    mov dx,0
    xor cx,cx 
    mov bx,HANDLE1
    int 21h 

    ;write to file row 
    mov ah,40h              
    lea dx,buf           
    mov cx,[count]         
    int 21h
    jc onError     
              
;close file opened for writing 
closeFile:
    mov ah,3Eh              
    mov bx,[HANDLE1]         
    int 21h                 
    jnc clearRow                

; clear previous row and rewrite new 
clearRow:     
    cld
    lea di, buf 
    mov al,'$'
    mov cx, 200
    rep stosb 

    xor bx,bx 
    xor cx,cx
    mov ah, 42h
    mov al,1
    mov dx,10  
    int 21h
  
    ;reset count to 0 and jump to read a new line in file
    mov count,0
    jmp readNextSymbol
 
; mark of exit program   
exit:            
    mov ah,4ch
    int 21h    
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

;mark of some error      
onError:
    PRINT 'ERROR' 
    lea dx, pkey
    mov ah, 9
    int 21h    
    
    ; wait for any key....    
    mov ah, 1
    int 21h
    
    mov ax, 4c00h ; exit to operating system.
    int 21h      
    
    ;define function for working with string
    DEFINE_GET_STRING
    DEFINE_CLEAR_SCREEN
    DEFINE_PRINT_STRING  
    
    
    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;   
ends

end start ; set entry point and stop the assembler.
    ;output message ot press any key    
    lea dx, pkey
    mov ah, 9
    int 21h 
    
    ; wait for any key....    
    mov ah, 1
    int 21h
    ; exit to operating system.
    mov ax, 4c00h
    int 21h    
ends

end start ; set entry point and stop the assembler.
