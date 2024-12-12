---
title: "Parallel Programming Models"
sidebar_position: 3
tags:
  - parallelism
  - lecture
aliases:
---

## Programming Models

![Pasted image 20241009093649](./imgs/Pasted%20image%2020241009093649.png)

> [!NOTE]
> in the figure above shared memory mechanism takes place in user space, while the message passing sends messages via a channel in kernel space(only send and recv are handled in user space).

|     Scheme      | Data Distribution                                                                                                    | Communication                                                                                         | Synchronization                                                                                                     |
| :-------------: | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
|  Shared Memory  | Partition the data among threads, each thread processes a portion of the data                                        | Communication is implicit through shared variables, threads read and write to shared memory locations | barriers among thread to check if they reach the same point, or locks when accessing critical section               |
| Message Passing | Distribute data to each process, often by sending data over a network, each process works on its local data segment. | Use message passing functions to send and receive data. Communication is explicit                     | Synchronization occurs through message exchanges. Processes may use barriers or collective communication operations |

## Shared Memory

![Pasted image 20240820113936](./imgs/Pasted%20image%2020240820113936.png)

> [!NOTE]
> **Pros:**
>
> 1. Fast Communication:
>    - Processes can directly read and write to the shared memory, which typically results in **faster data access** and communication.
> 2. Ease of Data Sharing:
>    - Shared memory **allows easy sharing of large data structures (like arrays)** between processes without the need to copy or serialize data.
> 3. Low Overhead:
>
>    - Since processes or threads can access the same memory space, there's **no overhead associated with sending or receiving messages**.
>
> 4. Suitable for Multi-threading:
>    - Shared memory is **well-suited for multi-threading within a single machine**, where all threads naturally share the same memory space.
>
> **Cons:**
>
> 1. Complex Synchronization:
>
>    - Managing access to shared memory requires synchronization mechanisms like locks, semaphores, or monitors to prevent race conditions, which can be complex and error-prone.
>
> 2. Scalability Issues:
>
>    - Shared memory doesn't scale well across multiple machines in a distributed system since physical memory can't be shared across different systems.
>
> 3. Potential for Bugs:
>
>    - Bugs like deadlocks, race conditions, and data corruption are common issues when improper synchronization is used.
>
> 4. Limited to Single System:
>    - Shared memory is typically confined to a single system or node, limiting its use in distributed environments.

## Message Passing

![Pasted image 20240825194949](./imgs/Pasted%20image%2020240825194949.png)

> [!NOTE]
> in message-passing schemes:
>
> - **Send** can be either blocking or non-blocking.
> - **Recv** is required to actually receive the data sent, but send operations do not necessarily need recv to be called immediately, especially in non-blocking modes.

> [!NOTE]
> **Pros:**
>
> 1. **Scalability:**
>
>    - **Message passing scales well across distributed systems and clusters**, as processes can run on different machines and communicate over a network.
>
> 2. **Clear Separation:**
>
>    - Communication via message passing enforces a clear separation between processes, reducing the risk of accidental interference or shared data corruption.
>
> 3. **Simpler Debugging:**
>
>    - Because there’s no shared state, it's often easier to debug programs using message passing since **the interaction between processes is explicitly defined**.
>
> 4. **Better for Distributed Systems:**
>    - **Message passing is inherently designed for distributed systems**, making it suitable for applications running on multiple nodes or in the cloud.
>
> **Cons:**
>
> 1. **Higher Overhead:**
>
>    - Sending and receiving messages introduces overhead, especially with large amounts of data or in high-frequency communication scenarios.
>
> 2. **Complexity in Data Sharing:**
>
>    - Sharing complex data structures requires serialization and deserialization, which can add to the complexity and time consumption.
>
> 3. **Latency Issues:**
>
>    - In distributed environments, message passing can be slower due to network latency, particularly for systems spread across long distances.
>
> 4. **Increased Programming Effort:**
>    - Designing a system around message passing can be more complex as it requires explicitly defining the communication protocols and handling message errors or losses.

> [!NOTE]
> The difference:
>
> - **Shared memory** is faster and simpler for intra-machine communication but requires careful synchronization and is limited to single systems.
> - **Message passing** is more scalable and suitable for distributed systems but introduces additional overhead and complexity.
>
> The choice between shared memory and message passing depends on the specific requirements of the application, such as performance, scalability, and ease of programming.
