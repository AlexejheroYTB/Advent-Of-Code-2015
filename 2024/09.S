.data
    input_file: .asciz "input.txt"
    new_line: .asciz "\n"
.bss
    disk_map: .space 20000
    blocks: .space 400000
    part2_flag: .space 1
.text
.global main
main:
    push $input_file
    call open
    pop %rbx

    push %rbx
    push $disk_map
    push $20000
    call read_len
    pop %rcx ## length of disk_map

    mov $0, %rdi # index into blocks
    mov $0, %rax # index into disk_map
    mov $blocks, %r8
    read_disk_map:
        cmp %rcx, %rax
        jge read_disk_map_end

        mov $0, %rdx
        mov $disk_map, %rsi
        movb (%rsi, %rax, 1), %dl
        sub $48, %rdx

        mov $0, %rbx
        write_blocks:
            cmp %rdx, %rbx
            jge write_blocks_end
            
            test $0x1, %rax
            jnz write_space
                mov %rax, %rsi
                shr $1, %rsi
                movw %si, (%r8, %rdi, 2)
                jmp write_space_end
            write_space:
                movw $0xffff, (%r8, %rdi, 2)
            write_space_end:

            inc %rdi

            inc %rbx
            jmp write_blocks
        write_blocks_end:
        
        inc %rax
        jmp read_disk_map
    read_disk_map_end:

    cmpb $0, part2_flag
    jne main_part2

        mov $0, %rax # left pointer
        dec %rdi ## right pointer

        move_blocks:
            advance_left_pointer:
                cmp %rax, %rdi
                je move_blocks_end

                cmpw $0xffff, (%r8, %rax, 2)
                je advance_left_pointer_end
                inc %rax
                jmp advance_left_pointer
            advance_left_pointer_end:

            advance_right_pointer:
                cmp %rax, %rdi
                je move_blocks_end

                cmpw $0xffff, (%r8, %rdi, 2)
                jne advance_right_pointer_end
                dec %rdi
                jmp advance_right_pointer
            advance_right_pointer_end:

            movw (%r8, %rdi, 2), %r9w 
            movw %r9w, (%r8, %rax, 2)
            movw $0xffff, (%r8, %rdi, 2)

            jmp move_blocks
        move_blocks_end:    

        mov $0, %rbx # pointer
        mov $0, %rcx # sum
        calculate_hash:
            cmpw $0xffff, (%r8, %rbx, 2)
            je calculate_hash_end

            mov $0, %rax
            movw (%r8, %rbx, 2), %ax
            mul %rbx
            add %rax, %rcx

            inc %rbx
            jmp calculate_hash
        calculate_hash_end:

        push $1
        push %rcx
        call write_int

        push $new_line
        call stdout

        movb $1, part2_flag
        jmp main

    main_part2:

        dec %rdi ## right-right pointer
        mov %rdi, %r15 # right-left pointer

        move_blocks_2:
            cmp $0, %rdi
            je move_blocks_2_end

            advance_right_pointer_2:
                cmpw $0xffff, (%r8, %rdi, 2)
                jne advance_right_pointer_2_end
                dec %rdi
                dec %r15
                jmp advance_right_pointer_2
            advance_right_pointer_2_end:

            extend_right_pointer_2:
                mov $0, %rsi
                movw -2(%r8, %r15, 2), %si
                cmpw %si, (%r8, %rdi, 2)
                jne extend_right_pointer_2_end
            
                cmp $0, %r15
                jne extend_right_pointer_2_skip
                    mov $0, %rdi
                    jmp move_blocks_2
                extend_right_pointer_2_skip:
                dec %r15
                jmp extend_right_pointer_2
            extend_right_pointer_2_end:

            mov %rdi, %r11
            sub %r15, %r11

            inc %r11 ## required size

            mov $0, %rax # left-left pointer

            advance_left_pointer_2:
                cmp %rax, %rdi
                jne advance_left_pointer_2_skip
                    dec %r15
                    mov %r15, %rdi
                    jmp move_blocks_2
                advance_left_pointer_2_skip:

                mov %rax, %r14 # left-right pointer
                mov $1, %r10 # empty size
            
                cmpw $0xffff, (%r8, %rax, 2)
                je extend_left_pointer_2
                inc %rax
                inc %r14
                jmp advance_left_pointer_2

                extend_left_pointer_2:
                    cmp %r10, %r11
                    je pointer_good

                    cmpw $0xffff, 2(%r8, %r14, 2)
                    je extend_left_pointer_2_continue
                        mov %r14, %rax
                        inc %rax
                        jmp advance_left_pointer_2 ## not enough space
                    extend_left_pointer_2_continue:
                    inc %r14
                    inc %r10

                    jmp extend_left_pointer_2

            pointer_good:
                mov $0, %rsi
                movw (%r8, %rdi, 2), %si
                movw %si, (%r8, %rax, 2)
                cmp %rax, %r14
                je pointer_good_end
                inc %rax
                cmp %rax, %r14
                jne pointer_good
            pointer_good_end:
            movw %si, (%r8, %rax, 2)
            inc %rax

            fill_blank:
                cmp %rdi, %r15
                je fill_blank_end
                movw $0xffff, (%r8, %rdi, 2)
                dec %rdi
                cmp %rdi, %r15
                jne fill_blank
            fill_blank_end:
            movw $0xffff, (%r8, %rdi, 2)
            dec %rdi        

            jmp move_blocks_2
        move_blocks_2_end:

        mov $0, %rbx # pointer
        mov $0, %rcx # sum
        calculate_hash_2:
            cmp $199999, %rbx
            jge calculate_hash_2_end

            cmpw $0xffff, (%r8, %rbx, 2)
            je calculate_hash_2_skip

            mov $0, %rax
            movw (%r8, %rbx, 2), %ax
            mov $0, %rdx
            mul %rbx
            cmp $0, %rdx
            add %rax, %rcx

            calculate_hash_2_skip:
            inc %rbx
            jmp calculate_hash_2
        calculate_hash_2_end:

        push $1
        push %rcx
        call write_int

    call exit


# Abstractions

.bss
    rip: .space 8

# push [file_descriptor]
# push [int]
# call write_int
.bss
    write_int_param_fd: .space 8
    write_int_param_int: .space 8
    write_int_local_buf_rev: .space 20
.text
.global write_int
write_int:
    pop rip
    pop write_int_param_int
    pop write_int_param_fd
    push rip

    call pusha
        mov write_int_param_int, %rax
        mov $10, %rbx
        mov $0, %rdx
        
        mov $write_int_local_buf_rev, %rdi
        mov $0, %rsi

        write_int_load_int_rev:
            div %rbx
            add $48, %rdx
            movb %dl, (%rdi, %rsi, 1)
            
            mov $0, %rdx
            inc %rsi
            cmp $0, %rax
            jne write_int_load_int_rev
        
        write_int_print:
            dec %rsi

            lea (%rdi, %rsi, 1), %r9

            push write_int_param_fd
            push %r9
            push $1
            call write_len

            cmp $0, %rsi
            jne write_int_print
    call popa

    ret

# push *[string]
# call string_length
# popl [length]
.bss
    string_length_param_string: .space 8
    string_length_return_length: .space 8
.text
.global string_length
string_length:
    pop rip
    pop string_length_param_string
    push rip

    push string_length_param_string
    push $0xffffffffffffffff
    call string_length_with_max
    pop string_length_return_length

    pop rip
    push string_length_return_length
    push rip
    ret

# push *[string]
# push [max_length]
# call string_length_with_max
# popl [length]
.bss
    string_length_with_max_param_string: .space 8
    string_length_with_max_param_max_length: .space 8
    string_length_with_max_return_length: .space 8
.text
.global string_length_with_max
string_length_with_max:
    pop rip
    pop string_length_with_max_param_max_length
    pop string_length_with_max_param_string
    push rip

    push %rax
    push %rbx
        mov $0, %rax # length
        mov string_length_with_max_param_string, %rbx

        string_length_with_max_loop:
            inc %rax
            cmp string_length_with_max_param_max_length, %rax
            jae string_length_with_max_loop_end
            cmpb $0, (%rbx, %rax, 1)
            jne string_length_with_max_loop
        string_length_with_max_loop_end:

        mov %rax, string_length_with_max_return_length
    pop %rbx
    pop %rax

    pop rip
    push string_length_with_max_return_length
    push rip
    ret

# push *[file_name]
# call open
# pop [file_descriptor]
.data
    open_err_msg_1: .asciz "open failed, file "
    open_err_msg_2: .asciz " \n"
.bss
    open_param_file_name: .space 8
    open_return_fd: .space 8
.text
.global open
open:
    pop rip
    pop open_param_file_name
    push rip

    call pusha
        mov $5, %rax # open
        mov open_param_file_name, %rbx
        mov $0, %rcx # O_RDONLY
        mov $0, %rdx
        int $0x80
        mov %rax, open_return_fd
    call popa

    cmpq $0, open_return_fd
    jge open_end
        push $open_err_msg_1
        call stdout
        push open_param_file_name
        call stdout
        push $open_err_msg_2
        call stdout
        call exit
    open_end:

    pop rip
    push open_return_fd
    push rip
    ret

# push [file_descriptor]
# call close
.bss
    close_param_fd: .space 8
.text
.global close
close:
    pop rip
    pop close_param_fd
    push rip

    call pusha
        mov $6, %rax # close
        mov close_param_fd, %rbx
        int $0x80
    call popa

    ret

# push [string]
# call stdout
.bss
    stdout_param_string: .space 8
.text
.global stdout
stdout:
    pop rip
    pop stdout_param_string
    push rip

    push $1
    push stdout_param_string
    call write

    ret

# push [fd]
# push *[data_str]
# call write
.bss
    write_param_fd: .space 8
    write_param_data: .space 8
    write_local_length: .space 8
.text
.global write
write:
    pop rip
    pop write_param_data
    pop write_param_fd
    push rip

    push write_param_data
    call string_length
    pop write_local_length

    push write_param_fd
    push write_param_data
    push write_local_length
    call write_len

    ret

# push [fd]
# push *[data_str]
# push [length]
# call write_len
.bss
    write_len_param_fd: .space 8
    write_len_param_data: .space 8
    write_len_param_length: .space 8
.text
.global write_len
write_len:
    pop rip
    pop write_len_param_length
    pop write_len_param_data
    pop write_len_param_fd
    push rip

    call pusha
        mov $4, %rax # write
        mov write_len_param_fd, %rbx
        mov write_len_param_data, %rcx
        mov write_len_param_length, %rdx
        int $0x80
    call popa

    ret

# push [file_descriptor]
# push *[buffer]
# push [max_length]
# call read_len
# popl [length]
.data
    read_len_err_msg: .asciz "read_len failed, length returned 0\n"
.bss
    read_len_param_fd: .space 8
    read_len_param_buffer: .space 8
    read_len_param_max_length: .space 8
    read_len_return_length: .space 8
.text
.global read_len
read_len:
    pop rip
    pop read_len_param_max_length
    pop read_len_param_buffer
    pop read_len_param_fd
    push rip

    call pusha
        mov $3, %rax # read
        mov read_len_param_fd, %rbx
        mov read_len_param_buffer, %rcx
        mov read_len_param_max_length, %rdx
        int $0x80
        mov %rax, read_len_return_length
    call popa

    cmpq $0, read_len_return_length
    jge read_len_end
        push $read_len_err_msg
        call stdout
        call exit
    read_len_end:

    pop rip
    push read_len_return_length
    push rip
    ret

# call exit
.text
.global exit
exit:
    mov $1, %rax # exit
    mov $0, %rbx
    int $0x80

# call pusha
.bss
    pusha_rip: .space 8
.text
.global pusha
pusha:
    pop pusha_rip
    push %rax
    push %rbx
    push %rcx
    push %rdx
    push %rsi
    push %rdi
    push %r8
    push %r9
    push %r10
    push %r11
    push %r12
    push %r13
    push %r14
    push %r15
    push pusha_rip
    ret

# call popa
.bss
    popa_rip: .space 8
.text
.global popa
popa:
    pop popa_rip
    pop %r15
    pop %r14
    pop %r13
    pop %r12
    pop %r11
    pop %r10
    pop %r9
    pop %r8
    pop %rdi
    pop %rsi
    pop %rdx
    pop %rcx
    pop %rbx
    pop %rax
    push popa_rip
    ret
