---
title: "OpenMP Clauses"
sidebar_position: 6
tags:
  - parallelism
  - lecture
---

## Variable Scope

### Privatization

### Reduction

## Scheduling

### Chunk Size

> [!ABSTRACT] Chunk Size in OpenPM
> The chunk size in OpenMP scheduling refers to the number of loop iterations assigned to a thread at one time. It is a parameter that can be specified with both static and dynamic scheduling strategies. In static scheduling, the chunk size determines the fixed number of consecutive iterations assigned to each thread in a cyclic manner. In dynamic scheduling, the chunk size determines how many iterations a thread will process before requesting more work, allowing for more flexible load balancing.

Consider code below and different scheduling configuration(different chunk size)

![Pasted image 20240904152921](./imgs/Pasted%20image%2020240904152921.png)

The threads will be occupied during the tasks are being executed(until the last one finish).
In this example, key points here are:

- **Load balance**: each thread gets different tasks, the thread who gets larger chunk of data will use more time to finish while others may have finished and idled. Thats load imbalance.

### Static and Dynamic

> [!ABSTRACT] Static Scheduling in OpenMP
> In OpenMP, static scheduling divides loop iterations into chunks of a specified size and assigns these chunks to threads in a predetermined, fixed manner before the loop execution begins. The assignment is typically done in a round-robin fashion. If no chunk size is specified, the iterations are divided as equally as possible among the available threads. This scheduling is best suited for loops where each iteration takes approximately the same amount of time, as it minimizes the overhead of assigning iterations during runtime.

> [!ABSTRACT] Dynamic Scheduling in OpenMP
> In OpenMP, dynamic scheduling assigns iterations to threads on-the-fly during the loop execution. The loop iterations are divided into chunks (as specified by the chunk size), and when a thread finishes processing its current chunk, it dynamically requests the next available chunk. This approach is beneficial for loops where the execution time of iterations varies significantly, as it helps in balancing the load across threads by redistributing work from busier threads to idle ones.

![Pasted image 20240904153514](./imgs/Pasted%20image%2020240904153514.png)

In code above OMP provides different parallelism schemes, include:

- **default**: no parallelism
- **static**: split the tasks into small sets of size `chunk size`
- **dynamic**: when a thread done for its own task, it dynamically gets a new task to do until the task queue is empty

![Pasted image 20240904152538](./imgs/Pasted%20image%2020240904152538.png)

Table above shows time consumption of different settings.
Key points are:

- Dynamic scheduling is time consuming. In dynamic scheduling settings, there are more works during runtime while in static settings there are less.

## Synchronization

### Critical Section (OpenMP)

### Barrier (OpenMP)
