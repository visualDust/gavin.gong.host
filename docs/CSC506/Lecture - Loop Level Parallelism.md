---
title: "Loop Level Parallelism"
sidebar_position: 5
tags:
  - parallelism
  - lecture
---

## Loop Level Parallelism

![Pasted image 20240828150440](./imgs/Pasted%20image%2020240828150440.png)

### DOALL Parallelism

> [!IMPORTANT]
> Concept: DOALL
> In Do-All parallelism, all tasks are independent of each other and can be executed simultaneously. Each task does not depend on the outcome or results of any other task.

> [!NOTE]
> ![Pasted image 20240828150814](./imgs/Pasted%20image%2020240828150814.png)

> [!NOTE]
> do-all is kind of data parallelism because data is split into parts for each $i$.
> It's great for loops without dependency. For the code above it has no dependency on the first level $i$ loop.

> [!NOTE]
>
> ```cpp
> for(size_t i=1; i<N; i++){
> 	A[i] = B[i-1] + C[i]*2;
> }
> ```

### DOACROSS Parallelism

> [!IMPORTANT]
> Concept: DOACROSS
> DOACROSS parallelism is a technique used to parallelize loops that have loop-carried dependencies (i.e., an iteration depends on the result of a previous iteration). It allows iterations to execute in parallel but introduces synchronization mechanisms to ensure correct execution order where dependencies exist.

> [!NOTE]
> ![Pasted image 20241003220723](./imgs/Pasted%20image%2020241003220723.png)
> In do-across, some parts are parallel, but tasks need to wait on each other.

### DOPIPE Parallelism

> [!IMPORTANT]
> Concept: DOPIPE
> Do-Pipe (or Pipeline Parallelism) involves breaking a task into a series of stages, where each stage can be executed in parallel, often using a pipeline architecture. Each stage passes its result to the next stage.

> [!NOTE]
> ![Pasted image 20240902112431](./imgs/Pasted%20image%2020240902112431.png)

### Loop-Distribution Parallelism

> [!IMPORTANT]
> Concept: Loop Distribution
> Loop distribution (also known as loop fission) involves splitting a loop into multiple loops over the same index range but with non-dependent computations separated. This technique exposes parallelism by isolating independent operations, allowing them to be parallelized using DOALL parallelism (where iterations are independent).

> [!NOTE]
>
> ```cpp
> // Original loop with independent operations
> for (int i = 0; i < N; i++) {
>     A[i] = B[i] + C[i];
>     D[i] = E[i] * F[i];
> }
> ```
>
> Apply loop distribution:
>
> ```cpp
> // First independent loop
> #pragma omp parallel for
> for (int i = 0; i < N; i++) {
>     A[i] = B[i] + C[i];
> }
>
> // Second independent loop
> #pragma omp parallel for
> for (int i = 0; i < N; i++) {
>     D[i] = E[i] * F[i];
> }
> ```

> [!NOTE]
> ![Pasted image 20240902113626](./imgs/Pasted%20image%2020240902113626.png)

## Variable Scopes and Synchronization

Commonly seen variable usage in code with loops:

|                   Variable usage                   | Concept                                                                                                                                                                                                                                                                                                   | Scope                      | Example                                                                       |
| :------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------- |
|                     Read Only                      | Variables that are only read inside the loop and not modified can be safely declared as **shared**. Since their values remain constant, multiple threads can access them concurrently without causing data inconsistencies.                                                                               | Shared                     | Constants, input arrays that are not modified.                                |
|                Loop Index Variables                | Loop index variables are inherently thread-specific in OpenMP parallel loops and are considered **private** by default. Each thread works on its own set of iterations, so the loop index should not be shared.                                                                                           | Private                    | The variable i in `for (i = 0; i < N; i++)`.                                  |
|            Temporary Variables in Loop             | Variables that are defined and used within the loop body and do not need to retain their value between iterations should be **private**. This ensures that each thread has its own instance, preventing interference between threads.                                                                     | Private                    | Temporary computation variables, accumulators used within a single iteration. |
|                Reduction Variables                 | Variables that accumulate results across iterations (like sums or products) require special handling. They should be declared in a reduction clause to ensure that each thread maintains a private copy during execution, which are then combined at the end.                                             | Private (Reduction)        | A variable sum used to accumulate results.                                    |
| Modified Shared Variable with Proper Data Parallel | Variables (usually elements inside array) that are assigned to threads, each thread only access a specific part of the data. Each thread will only access their own parts, and will not access element assigned to other threads.                                                                         | Shared (Data Parallel)     | Array elements `A[i]` being written in `for (i = 0; i < N; i++)`.             |
|             Modified Shared Variables              | Variables that are written by multiple threads and need to maintain a consistent state across threads should generally be avoided or protected using synchronization mechanisms (like critical sections or atomic operations). If possible, redesign the algorithm to minimize shared writable variables. | Private (Critical Section) | Shared data structures that threads need to update                            |

> [!NOTE]
> ![Pasted image 20240828153029](./imgs/Pasted%20image%2020240828153029.png)
> Explained:
>
> - conflicts will be there for $i$ or $j$ if $i$ or $j$ loop is parallel;
> - $a$ and $b$ are being written so they are not read-only;
>   - if $j$ loop is parallel,

### Variable Privatization (OpenMP)

To solve the conflicts for a variable, there are some conditions to refer to:

1. (x) Variable written by a task before being read by the same task.
2. (o) Variable can be initialized for each task independently (without waiting for a previous task).

### Reduction (OpenMP)

![Pasted image 20240828155148](./imgs/Pasted%20image%2020240828155148.png)

Variable reduction in parallel programming models adds up different parts of `A[i]` on different processors. Say, we have unlimited processors, therefore:

1. `A[i]` is split into $250$ pairs of them, each of the pair is sum up by a processor and produce $1$ result, that means $250$ different `ave`s are produced during the first step
2. For the $250$ produced `ave`s, $125$ processors add up each pair of them, and produce $125$ results
3. Repeat the process until there is only one ave left

**Synchronization** is needed on each level of reduction, to make sure the previous parallel step has already finished. But you do not need a Barrier operation(see below) here, the synchronization mechanism should be at system level not program level in OpenMP(while in CUDA programming you need manual synchronization within the reduce kernel).

### Critical Section (OpenMP)

![Pasted image 20240828160254](./imgs/Pasted%20image%2020240828160254.png)

Critical section creates some kind of "lock" on variable that it only one thread is allowed to execute a statement on such a variable,

### Barrier (OpenMP)

![Pasted image 20240828160501](./imgs/Pasted%20image%2020240828160501.png)

Barriers are something like thread synchronization, it asks every thread to reach the barrier point before they continue.
