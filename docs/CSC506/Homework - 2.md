---
title: "Homework 2"
sidebar_position: 18
tags:
  - lecture
---

![Pasted image 20241104213141](./imgs/Pasted%20image%2020241104213141.png)

Homework 2 form: [homework-2](homeworks/homework-2.pdf)

T3 code:

```python
a = b = c = d = 0

def S1():
    global a
    global b
    global c
    global d
    a = 1

def S2():
    global a
    global b
    global c
    global d
    c = d + b

def S3():
    global a
    global b
    global c
    global d
    if a > 0:
        pass

def S4():
    global a
    global b
    global c
    global d
    if a > 0:
        d = 4

def S5():
    global a
    global b
    global c
    global d
    b = a + 1

search_result_sq = [
    [1, 2, 6, 4],
    [1, 2, 0, 0],
    [1, 2, 0, 4],
    [1, 1, 5, 4],
    [1, 2, 4, 4],
    [1, 1, 1, 0],
]

statements = [S1, S2, S3, S4, S5]
# run all possible order
for i in range(5):
    for j in range(5):
        for k in range(5):
            for l in range(5):
                for m in range(5):
                    # i,j,k,l,m must be unique
                    if len(set([i, j, k, l, m])) < 5:
                        continue
                    a = b = c = d = 0
                    orders = [i, j, k, l, m]
                    s1 = statements[i]
                    s2 = statements[j]
                    s3 = statements[k]
                    s4 = statements[l]
                    s5 = statements[m]
                    # run the statements
                    s1()
                    s2()
                    s3()
                    s4()
                    s5()
                    if (
                        orders.index(0) < orders.index(1)
                        and orders.index(2) < orders.index(3)
                        and orders.index(3) < orders.index(4)
                    ):
                        if [a, b, c, d] in search_result_sq:
                            print(
                                f"Order: {s1.__name__}, {s2.__name__}, {s3.__name__}, {s4.__name__}, {s5.__name__}. Result: {a,b,c,d}",
                                end="",
                            )
                            print(f" - SC,SQMatch", end="")
                            print("")
                            # remove the result from the search result, only one match is needed
                            search_result_sq.remove([a, b, c, d])

```

T4 code

```asm
// LL&SC lock
lock:
    LL  R1, &lockvar    // read lockvar to R1, LinkReg = &lockvar
    bnz R1, lock        // if R1 !=0 go back to lock label
    add R1, R1, #1      // R1 = 1
    SC  &lockvar, R1    // store R1 to lockvar, if success, R1 = 1
    bnzq   R1, lock     // if SC fail go back to lock label
    ret                 // return
unlock:
    st &lockvar, #0     // store 0 to lockvar
    ret                 // return

// atomic exchange
exchange:
    LL  R1, &exchvar    // read exchvar to R1, LinkReg = &exchvar
    SC  &exchvar, R2    // store R2 to exchvar, if success, R1 = R2
    bnzq   R1, exchange // if SC fail go back to exchange label
    ret                 // return

// atomic compare and swap. CAS R1, R2, casvar
cas:
    LL  R3, &casvar    // read casvar to R3, LinkReg = &casvar
    cmp R3, R1         // compare R3 and R1
    bnz casend         // if R3 != R1, go to casend
    SC  &casvar, R2    // store R2 to casvar, if success, R3 = R2
    bnzq   R3, casend  // if SC fail go to casend
    mov R2, R1         // R2 = R1
casend:
    ret                // return
```
