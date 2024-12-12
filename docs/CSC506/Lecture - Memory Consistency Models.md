---
title: "Memory Consistency Models"
tags:
  - parallelism
  - lecture
---

## Sequential Consistency (SC)

> [!important] Concept: Sequential Consistency (SC)
> Memory operations from a processor should be performed in program order, and each should be performed atomically. This model is called **Sequential Consistency (SC)**.

![Pasted image 20241007155231](./imgs/Pasted%20image%2020241007155231.png)
![Pasted image 20241007155239](./imgs/Pasted%20image%2020241007155239.png)

> [!important] Definition: Lamport's Definition of Sequential Consistency
> A multiprocessor is sequentially consistent if the **result of any execution** is the same as if the operations of all the processors were executed in some sequential order, and the operations of each individual processor occur in this sequence in the order specified by its program.

> [!example]
> ![Pasted image 20241007155822](./imgs/Pasted%20image%2020241007155822.png)

> [!example]
> ![Pasted image 20241007155833](./imgs/Pasted%20image%2020241007155833.png)

## Relaxed Memory Consistency

Recall types of consistency in [Lecture - Consistency and Synchronization Problems](Lecture%20-%20Consistency%20and%20Synchronization%20Problems.md):

- **Sequential Consistency** is the strongest consistency that ensures all memory operations appear to execute in a single, global order called program order, and each of the memory operation should be performed atomically.
- **Weak Consistency** (related to **barrier** a.k.a. **fence**) divides operations into _synchronization_ and _data_ operations. It ensures consistency only at synchronization points. It's faster than sequential consistency but requires explicit synchronization.
- **Release Consistency** (related to **critical section**) extends weak consistency by splitting synchronization into _acquire_ (before critical section) and _release_ (after critical section). It provides finer-grained control over memory synchronization, improving performance. It only ensures consistency only between acquire and release operations.

### Fence (Barrier) Instruction (Safety Net)

(Memory) **Fence Instruction** prohibits the execution of the memory accesses following the fence until all memory accesses preceding the fence have performed.

- **Store fence/barrier**: If the fence only applies to stores, in which case it imposes ordering only between stores that precede it and stores that follow it, and it is referred to as store fence/barrier.
- **Load fence/barrier**: If the fence only applies to loads, in which case it imposes ordering only between loads that precede it and loads that follow it, and it is referred to as load fence/barrier.
- **Full fence/barrier**: applies on both loads and stores

> [!note]
> Note that fence instruction will not directly stall the processor, it only prevents load and stores.

> [!example]
> Thread 1:
>
> ```c
> x = 1;  // (Store to x)
> r1 = y; // (Load from y)
> ```
>
> Thread 2:
>
> ```c
> y = 1;  // (Store to y)
> r2 = x; // (Load from x)
> ```
>
> The desired outcome is to ensure that:
>
> - `x = 1` happens-before `r2 = x`.
> - `y = 1` happens-before `r1 = y`.
>
> Without fences, a relaxed consistency model might reorder these operations. This could lead to an outcome where both `r1` and `r2` are `0`, violating a program's desired dependency.
>
> Minimal fencing:
> Thread 1:
>
> ```c
> x = 1;        // (Store to x)
> SFENCE;       // Ensure store to x is visible
> r1 = y;       // (Load from y)
> ```
>
> Thread 2:
>
> ```c
> y = 1;        // (Store to y)
> SFENCE;       // Ensure store to y is visible
> r2 = x;       // (Load from x)
> ```

### Weak Ordering

Allow any kind of loads and stores and whatever ordering, **except at synchronization point**.

Rules:

- Before synchronization operation can be issued to memory, all previous memory ops must be performed.
- No later memory operations can be issued to memory until synchronization operation is performed.

> [!tip]
> Weak ordering is a kind of Fence Instruction combined with load and store.
> You can put two fences both before and after the target instruction to achieve same effect as weak ordering.

> [!example]
> For `P0`, S1 must be executed before S2; For `P1`, things after S1 are not allowed to happen before S1 is executed.
> ![Pasted image 20241210140736](./imgs/Pasted%20image%2020241210140736.png)

![Pasted image 20241210141058](./imgs/Pasted%20image%2020241210141058.png)

### Release Consistency

Release consistency is controlled by two types of synchronization events: `release` and `acquire`:

- **`release`**: prior memory operations must be complete. (can't move LD/ST downward, past release point)
- **`acquire`**: later memory operations should not be issued. (can't move LD/St upward, prior to acquire point)

> [!example]
> ![Pasted image 20241210140920](./imgs/Pasted%20image%2020241210140920.png)

![Pasted image 20241210141021](./imgs/Pasted%20image%2020241210141021.png)
