---
title: "Interconnection Network Architecture"
sidebar_position: 16
tags:
  - lecture
---

## Message and Granularity

The fabric that interconnects multiple processors must have low **latency** and high **bandwidth**.
The requirements of interconnection fabric performance stands for:

- messages are very short. Many messages are coherence protocol requests and responses not containing data, while some messages contain a small amount (cache-block size) of data
- messages are generated frequently, since each read or write miss potentially generates coherence messages involving several nodes
- message is generated due to a processor read or write event, the ability of the processor to hide the message communication delay is relatively low

> [!IMPORTANT]
> Concept: Link and phit
> A **link** is a set of wires that connect two nodes. The minimum amount of data that can be transmitted in one cycle is called a **phit**. A **phit** is typically determined by the width of the link.
> The maximum rate at which a packet can be streamed through a link is referred to as the **link bandwidth**.

![Pasted image 20241104134926](./imgs/Pasted%20image%2020241104134926.png)

> [!IMPORTANT]
> Concept: Packet
> Large message is fragmented and encapsulated into **packets**. Each part of the message becomes a packet **payload**, which is encapsulated by a **header**(h) and **trailer**(t). The fragmentation allows a message to be transmitted in parts independently of one another, and the header and trailer ensure reliable delivery of the message and contain sufficient information to reassemble the packets into the original message at the **destination**.
> If the packet header is designed to ft the size of a fit, the fit that contains the header is referred to as the header fit, the same for trailer fit. The packet payload is broken into body fits.

## Link Level Flow Control

A fit worth of data can be accepted or rejected at the receiver, depending on the amount of buffering available at the receiver and the **flow control protocol** used. The flow control mechanism works at the link level to ensure that data is not accepted too fast that it overflows the buffer at the receiving router.

Lossy and lossless network:

- In a lossy network, overflowing a buffer results in fits being dropped and the dropped fits require retransmission in the future.
- For latency reasons, a lossless network is preferred, in which fits should not be dropped and retransmitted.

> [!NOTE]
> stop/go protocol
> A sender router sends fits of a packet to a receiver router as long as the receiver asserts a “go” signal:
>
> ![Pasted image 20241201121014](./imgs/Pasted%20image%2020241201121014.png)
>
> The stop/go threshold is determined by the round-trip latency between sender and receiver, such that there is no risk of overflowing the buffer.

> [!NOTE]
> credit-based protocol
> credit-based flow control requires the receiver to send out the precise number of entries available in its buffer. The sender uses this number to decide whether to send more fits or not.

## Message Latency

Sending a single message of size $L$ over a channel in a network with bandwidth $B$, is considered as the transfer as being composed of the latency of the first bit being transmitted to the destination (referred to as the header latency $T_{h}$), plus the latency for the remaining portion of the message trailing behind the first bit (referred to as the serialization latency $T_{s}$). Putting it together, the latency for sending the message is:

$$
\begin{align}
T&=T_{h}+T_{s}\\
&=H\times T_{r} + \frac{L}{B}
\end{align}
$$

Where the first bit has to travel through $H$ hops and each hop incurs a routing latency of $T_r$, then the header latency is $H\times T_r$, and the serialization latency is $\frac{L}{B}$.
Reducing the routing latency is difficult. However, the hop count can easily be increased or decreased by changing the overall topology of the network.

## Network Topology

![Pasted image 20241201152647](./imgs/Pasted%20image%2020241201152647.png)

The **k-ary d-mesh** (a.k.a. k-ary n-dimensional mesh) topology is a typical one. For a k-ary d-mesh network, overall there are $k^d$ nodes in the system. The **maximum distance in each dimension** is one less than the number of nodes in a dimension, i.e., $k - 1$. Since there are $d$ dimensions, the diameter of a k-ary d-mesh is $d \times (k - 1)$. The bisection bandwidth can be obtained by cutting the network into two equal halves. This cut is performed with a plane one dimension less than the mesh, therefore, the bisection bandwidth is $k^d−1$.

Metrics of other topologies:

| Topology         |       Diameter       | Bisection BW  |            \#Links             |    Degree     |
| :--------------- | :------------------: | :-----------: | :----------------------------: | :-----------: |
| Linear array     |    $\mathrm{p}-1$    |       1       |         $\mathrm{p}-1$         |     $2+1$     |
| Ring             |    $\frac{p}{2}$     |       2       |               p                |     $2+1$     |
| 2-D Mesh         |   $2(\sqrt{p}-1)$    |  $\sqrt{p}$   |    $2 \sqrt{p}(\sqrt{p}-1)$    |     $4+1$     |
| Hypercube        |     $\log _2 p$      | $\frac{p}{2}$ | $\frac{p}{2} \times \log _2 p$ | $\log _2 p+1$ |
| **k-ary d-mesh** |       $d(k-1)$       |   $k^{d-1}$   |        $d k^{d-1}(k-1)$        |    $2 d+1$    |
| k-ary Tree       | $2 \times \log _k p$ |       1       |            $k(p-1)$            |   $(k+1)+1$   |
| k-ary Fat Tree   | $2 \times \log _k p$ | $\frac{p}{2}$ |            $k(p-1)$            |   $(k+1)+1$   |
| Butterfly        |     $\log _2 p$      | $\frac{p}{2}$ |     $2 p \times \log _2 p$     |     $4+1$     |

## Switching Policy

When considering that data will travel over more than just one link, there are two switching policies for a network:

- **circuit switching**, where a connection between a sender and receiver is reserved prior to data being sent over the connection.
- **packet switching**, when a large message is transmitted on a channel, it is fragmented and encapsulated into packets, the circuit may changes for each packet.

![Pasted image 20241201121409](./imgs/Pasted%20image%2020241201121409.png)

Comparing those two policies:

- Circuit switching requires a connection setup, which adds latency and risks underutilization if idle. Collisions delay other traffic until the connection is released. However, it offers fast message delivery, simpler routing, minimal buffering, and lower power consumption once established.
- Packet switching avoids setup delays, handles multiple traffic flows efficiently, but incurs higher routing delays, power consumption, and buffering needs at each router.

## Routing Policy for Packet Switching

### Store and Forward

![Pasted image 20241104141801](./imgs/Pasted%20image%2020241104141801.png)

A packet must be fully received (and stored) by a node, before it can be forwarded to the next node.

Latency:

$$
\mathbf{T}_{strfwd} = H\times \left( T_{r} + \frac{L}{B} \right)
$$

Where the first bit has to travel through $H$ hops and each hop incurs a routing latency of $T_r$, then the header latency is $H\times T_r$, and the serialization latency is $\frac{L}{B}$.

### Cut-through and Wormhole

![Pasted image 20241104141815](./imgs/Pasted%20image%2020241104141815.png)

Parts of a packet can be forwarded to the next router even before the packet has fully arrived at the current router.

Latency:

$$
\mathbf{T}_{cut\ through} = H\times T_{r} + \frac{L}{B}
$$

Where the first bit has to travel through $H$ hops and each hop incurs a routing latency of $T_r$, then the header latency is $H\times T_r$, and the serialization latency is $\frac{L}{B}$.

Key benefit of cut-through or wormhole routing is lower packet transmission latency.

> [!NOTE]
> The high level view of cut-through and wormhole policy is quite the same, but they are difference when down to the granularity of their flow control unit.
>
> - In a cut-through routing, the fow control works on a packet size granularity
> - in a wormhole routing, the fow control works on a fit granularity

| **Aspect**              | **Store-and-Forward Switching**                                                         | **Wormhole Switching**                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Figure**              | ![Pasted image 20241104141801](./imgs/Pasted%20image%2020241104141801.png)              | ![Pasted image 20241104141815](./imgs/Pasted%20image%2020241104141815.png)                         |
| **Delivery Mechanism**  | Each intermediate router fully receives and stores the entire packet before forwarding. | Packets are divided into flits; only the header flit is routed, with others following immediately. |
| **Latency**             | High, as each hop incurs the full packet transmission and processing delay.             | Low, as only the header incurs routing delay, and flits flow pipeline-style.                       |
| **Buffer Requirements** | Large, as the entire packet must be buffered at each hop.                               | Small, as only a few flits are buffered (e.g., one or two).                                        |
| **Congestion Impact**   | Blocks resources until the entire packet clears, worsening congestion.                  | May block only portions of a packet, allowing partial progress.                                    |
| **Performance**         | Slower, particularly for large packets or high-diameter networks.                       | Faster and more efficient, especially for small flits and low-diameter networks.                   |
| **Fault Tolerance**     | Can retransmit the full packet if an error occurs.                                      | Requires retransmitting the entire packet if any flit is lost.                                     |

## Routing Algorithms

Routing options:

- **Minimal**: Chooses the shortest path (fewest hops).
- **Non-minimal**: Allows longer paths, often to bypass congestion.
- **Deterministic**: Always selects the same path for a given source-destination pair.
- **Non-deterministic**: Allows variability in path selection.
- **Oblivious**: Uses diverse paths, often involving randomization, without considering network state. ![Pasted image 20241210000709](./imgs/Pasted%20image%2020241210000709.png)
- **Adaptive**: Adjusts paths based on network conditions (e.g., congestion). ![Pasted image 20241210000718](./imgs/Pasted%20image%2020241210000718.png)
- **Per-hop Routing**: Each router decides the next step dynamically.
- **Source Routing**: The entire path is precomputed at the source.
- **Deadlock-free**: Ensures routing avoids deadlocks entirely.
- **Dimension-ordered**: Traverses dimensions (e.g., x, then y, then z) in a fixed order to simplify routing. ![Pasted image 20241210000651](./imgs/Pasted%20image%2020241210000651.png)

## Deadlock Avoiding

> [!NOTE]
> Content below is not included in final exam

### By Avoiding Closed Loops in Routing Path

### By Restricting Allowed Turns

## Router Node Implementation

### Lookup Table vs. Source Routing

## Router Architecture

![Pasted image 20241106142841](./imgs/Pasted%20image%2020241106142841.png)

In figure, when virtual cut-through routing is used:

- on input boxes, the flow control requires the buffer to be able to accommodate an entire packet
- on output boxes, it is guaranteed that the downstream router has sufficient buffer space for an entire packet. Thus, fits of a packet can flow through directly to the output channel

In order to send flits to the next router, header flit will be processed with:

1. Decode and Compute (DC): decode header to know input channel and destination, the destination may be used to compute the output port, based on arithmetic calculation or based on a look up of the routing table.
2. Virtual-Channel Allocation (VA): a request for an output virtual channel is made, and a global virtual channel arbitration decides whether the requested output virtual channel is available (can be allocated) or not.
3. Switch Allocation (SA): global switch allocator allocates the switch to connect the input channel and output port (where the output virtual channel is connected).
4. Switch Traversal (ST): transmit the fit is transmitted through the switch to the output virtual channel.
   Note that other flits of the packet(non-header) will only walk through the last two steps. Those steps are scheduled in pipelined manner:

![Pasted image 20241106150728](./imgs/Pasted%20image%2020241106150728.png)

> [!NOTE]
> Compared to packet switching, circuit switching can be more efficient for long distance routing.
