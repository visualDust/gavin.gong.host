---
title: "Cache Coherence in Bus-Based Multiprocessor Systems"
tags:
  - lecture
---
For a coherence protocol, write propagation and transaction serialization are key properties. Transaction  serialization in a bus-based broadcast protocol is achieved by ensuring that all processors obey the  order in which requests are posted on the shared bus. **The key problem here to be discussed is to do write propagation.** 

In multiprocessor settings, there might be multiple copies of the same address in caches belonging to different processors. If a processor writes to it, processors which hold other copies of the same address need to be notified.
There are two ways to do write propagation:
- **Invalid-Based Protocol**, it invalidates other copies if one of the copy is being written
- **Update-Based Protocol**, it updates all the other copies if one of the copy is being written

Finite State Machine can be used to describe states of each copy of the same address in different cache. **Cache blocks has their own states to represents validity, and processors / bus can send request either for invalidating other caches or update them, and the requests are triggers for a state transfer of cache blocks.** Both processor side and bus side need access to tags,

In bus-based cache coherence protocols, **both the processor side and the bus side need access to cache tags** because:
- **Processor Side**: The processor uses cache tags to determine if a memory access is a cache hit or miss during its own read/write operations.
- **Bus Side (Snooping)**: The cache must monitor (snoop) bus transactions initiated by other processors to maintain coherence. It uses the tags to check if any bus transaction addresses match the addresses of data it holds, so it can take appropriate coherence actions (e.g., invalidate or update its cache line).

Access to tags from both sides ensures that the cache can simultaneously serve the processor’s requests and participate in maintaining coherence with other caches by snooping bus traffic.

Key footprints:
- Write through coherence protocol introduces invalid-based baseline
- MSI protocol introduces dirty state with write back cache, reducing bandwidth consumption
- MESI protocol introduces exclusive state and cache to cache transfer
- MOESI protocol introduces owned state and dirty sharing

## Invalid-based Protocol

The key to a write invalidation protocol is that a processor can modify a cache block after  invalidating other copies (in other caches).

### Protocol with Write Through Cache: The Coherence Baseline

Each cache block has a state of:
- Valid (V): the cache block is valid and clean
- Invalid(I): accesses to this block will cause cache miss, either because the block has never been loaded or it is invalidated

Processors can issue request:
- Processor Read (PrRd): processor request to read to a cache block`
- Processor Write (PrWr): processor request to write to a cache block

When processors issue requests, associated bus requests will be triggered and **snooped by other processors**:
- Bus Read (BusRd): there is a read request to a block made by another  processor.
- Bus Write (BusWr): a write through to the main  memory performed by another processor

![Pasted image 20240924210629](./imgs/Pasted%20image%2020240924210629.png)

> [!note] 
> When drawing this diagram, notice that a `PrRd` in `V` state will not cause `BusRd` since it is already in cache with valid state.

> [!note] 
> The write through cache ensures that a PrWrite will immediately propagate out to lower level with a BusWr, which will invalidate copies in other caches. Main memory must also snoop the PrWr and update the corresponding block.
> On a PrWrite the invalid state will remains invalid since it uses a write no allocate cache, the write is propagated down to the lower level using the BusWr transaction without fetching  the block into the cache.

> [!caution] 
> The problem here is that this protocol requires high bandwidth. Every `PrWr` will cause a `BusWr` that takes up bus bandwidth.
> If with a write back cache, the dirty state will allow it to not write back immediately to memory via bus every time the block is being written.

### Protocol with Write Back Cache

#### MSI (Modified, Shared, Invalid) Protocol: Introducing Dirty State with Write Back Cache

Since **write back cache introduces dirty state** (while in write through cache there is no dirty state), new cache block states is introduced into coherence protocol to represent a dirty state:

- Modified (M): this block is dirty, different from the copy in memory, it has been modified and other copies are not valid.
- Shared (S): block is valid and it is potentially shared among processors.
- Invalid (I)

Since there is dirty state, PrWr will not immediately triggers a BusWr. Therefore new bus requests are introduced to represents if a cache block state changes:
- Bus Read (BusRd)
- Bus Read Exclusive (**BusRdX**): the cache block is dirty
- **Flush**: cache block is written back to main memory (that is a write back)

![Pasted image 20240924213841](./imgs/Pasted%20image%2020240924213841.png)

> [!note] 
> Note that Flush is caused by other processors read/write to the block, and the issuer itself must pick up the flushed block.
> Main memory must also snoop the flushed block and update the  corresponding block in the main memory.

> [!tip] 
> If a BusRd is snooped, a cache block with M state can actually either choose to transfer into a S state or a I state, it really depends on the situation. Here we assume that it transfer into a S state.

> [!example] 
> ![Pasted image 20240924214634](./imgs/Pasted%20image%2020240924214634.png)

> [!note] 
> Note that on step 3, the `BusRd` from `P3` is snooped by `P1`, both `P1` and memory will try to provide the block, but the `Flush` from `P1` is snooped by memory so the memory will cancel the fetch attempt. Memory will also pick the `Flush` request and update the memory.
> Therefore, the data supplier of step 3 is `P1's cache`.

> [!caution] 
> One problem here is that whenever a processor want to write to a cache block, it issues BusRdX. Even if it already has the block, the memory controller will do a useless fetch from main memory and it will be ignored by the requesting cache. This somehow waste bus bandwidth. 

To solve the problem that is to reduce useless BusRdX, a new bus request is introduced:
- Bus Upgrade (**BusUpgr**): a cache already has a valid copy of the block, it just want to get permission to write it, but no one should put the block on bus. The memory controller also ignores `BusUpgr` since there is no need for main memory to supply the block.

![Pasted image 20240924220438](./imgs/Pasted%20image%2020240924220438.png)

> [!note] 
> If a cache has the block and want to write to the block, it posts a BusUpgr. If it does not have the block  in the cache and needs the memory or another cache to supply it, it posts a BusRdX.
> Memory controller ignores the BusUpgr, but fetches the block when it snoops a BusRdX.

> [!example] 
> ![Pasted image 20240924220228](./imgs/Pasted%20image%2020240924220228.png)


> [!caution] 
> The drawback here is that if a processor want to read then write to a block, there will be either a BusRd and an **useless BusRdX requests sent to bus, if there is no other copy of the block**(since the sender does not know if there is any, especially for a single thread program or a data parallel program).

#### MESI (Modified, Exclusive, Shared, Invalid) Protocol: Introducing Cache to Cache Transfer

To solve the problem mentioned above, MESI protocol introduces a new state to distinguish between a block that  is clean and is exclusively cached versus a block that is clean and stored at multiple caches:

- Modified (M)
- **Exclusive (E)**: the cache block is valid, clean, and only resides in one cache. It's a special kind of shared state. Reading or writing to a block in `E` state does not generate a bus transaction but only a state change on write.
- Shared (S)
- Invalid (I)

A new bus request is also introduced to add **cache to cache transfer** feature:

- Bus Read (BusRd)
- Bus Read Exclusive (BusRdX)
- Bus Upgrade (BusUpgr)
- Flush
- **Flush Optional (FlushOpt)**: snooped request that indicates that an entire cache block is posted on the bus in order to supply it to another processor. It triggers when a `BusRd` or a `BusRdX` is posted on bus and somebody holds a **clean copy** of the target block. It does not trigger write propagation to outer memory, only between cache of same level, which referred to **cache-to-cache transfer**. 

> [!tip] 
> Only if a cache has the copy of an address in `S` state or `E` state (which means its clean sharing) will it post a `FlushOpt` on bus when it snoops `BusRd` or `BusRdX`. If its in `M` state, it will post a `Flush` instead. This is for write propagation and system's correctness while `FlushOpt` is not for correctness, its for optimization.

> [!tip] 
> We assume that the caches use write allocate policies when discussing MESI protocol. Note that the assumptions and conditions and the ways we choose policies is because it is reasonable or it is good fit with this protocol, and it would be a usual choice to use this protocol under this condition.

![Pasted image 20240924221221](./imgs/Pasted%20image%2020240924221221.png)

A new dedicated bus line **COPIES-EXIST** is introduced to indicate if there is other copies (this bus line is represented by `C` if it is asserted or `!C` if it is not asserted). Since The `I` state indicate two cases, the block has never been loaded, or it has been invalidated by other copies. When accessing an `I` block, a cache miss occurs, a `BusRd` is posted on bus. In this case **MESI** distinguish who should provide the missed data and put it on the bus. If a `BusRd` is snooped:
- If somebody holds a copy of the cache, it assert the **COPIES-EXIST** bus line and put the data on bus, the receiver place the data in `S` state.
- If nobody holds a copy, **COPIES-EXIST** is not set, it is memory's responsibility to put the data, and the receiver will place the data in `E` state since only one copy exists.

> [!example] 
> ![Pasted image 20240924230333](./imgs/Pasted%20image%2020240924230333.png)

> [!note] 
> Note that since we introduced cache-to-cache transfer and `FlushOpt` in MESI protocol, all the share holders of the block will try to supply the block, and one of them wins and supplies the block eventually. Since it's hard to know who will win, then the data supplier is `P1/P3`'s cache in the last request of this example. 

> [!caution] 
> The cache-to-cache transfer in the form of `FlushOpt` incurs additional complexity in the coherence controller. 
> This is especially the case when the `FlushOpt` is  performed when a cache block has a shared state. There are potentially multiple caches that have  the block in the shared state and all of them read the cache block from their caches and attempt to  perform the `FlushOpt`.

> [!caution] 
> The MESI protocol is actually maintaining a **clean sharing**, which means when a block is shared by multiple caches, it has to be clean.
> Unfortunately, by keeping clean sharing,  the main memory is updated too many times when there is successively read and write requests from different processors to the same address. In some systems, the bandwidth to the main memory  is already restricted, so updating the main memory on each cache flush uses an excessive amount of  bandwidth.

#### MOESI (Modified, Owned, Exclusive, Shared, Invalid): Allows Dirty Sharing

To solve the problem mentioned above, MOESI protocol introduces dirty sharing. The cache block can have following states:

- Modified (M)
- Exclusive (E)
- **Owned (O)**: the cache block is valid, possibly dirty, and may reside in multiple caches. However, when there are multiple cached copies, there can only be one cache that has the block in  `O` state, other caches should have the block in `S` state.
- Shared (S)
- Invalid (I)

> [!tip] 
> The idea behind the owned state is that when a cache block is shared across caches, its value  is allowed to differ from that in the main memory.

> [!note] 
> Bus bandwidth can be conserved if the frequency of  write backs is minimized. To reduce the frequency of write backs, the cache that will hold the  block the longest should be selected as the owner.
> A good heuristic for predicting such a cache is selecting the last cache that wrote to the block as the owner.

The `O` state solves the two problems mentioned in MESI protocol. When a BusRd is  snooped, we can let the owner to provide data through FlushOpt, while other controllers take no  action. The main memory does not need to pick up a Flush or FlushOpt to update the block in main  memory. 
In addition, we can also assign the owner to be responsible for writing back the block  to the main memory when the block is evicted. Hence, when a cache block in the shared state is  evicted, regardless of whether it is clean or dirty, it can be discarded. Only when the cache block  that is evicted is in the owned state, it is written back to the memory to update it. To indicate that  a block in the owned state is evicted and needs to update the main memory, a different bus request  type is needed, which we refer to as **FlushWB**:

- Bus Read (BusRd)
- Bus Read Exclusive (BusRdX)
- Bus Upgrade (BusUpgr)
- Flush
- Flush Optional (FlushOpt)
- **Flush Written Back (FlushWB)**: snooped request that indicates that an entire cache block is written back to the main  memory by another processor, and it is not meant as a transfer from one cache to another.


![Pasted image 20241006153419](./imgs/Pasted%20image%2020241006153419.png)

In `O` state:
- When a `BusRd` is snooped, it flushes  the block and remains in the owned state (i.e., remains the owner). 
- If a `BusRdX` is snooped, it  supplies the block by flushing it, and transitions into the `I` state. If a `BusUpgr` is snooped, it  transitions into the invalid state without flushing the block

When the block in the owned state is evicted from the cache, the ownership disappears since other caches have the copy in the shared state. Hence, at this point dirty sharing must be converted  into clean sharing. The owner is responsible for flushing the block to the memory so that the memory  can update its copy. This is achieved by posting a `FlushWB` request on the bus. In contrast to `Flush`  or `FlushOpt` requests that are ignored by the memory controller, a `FlushWB` request is picked up by  the memory controller to update the value in the main memory.

> [!tip] 
> There will be both clean sharing and dirty sharing in MOESI protocol.
> - With clean sharing, the memory supplies the block.
> - With dirty sharing, the owner of the block supplies the block.
> 
> Therefore, there is three kind of bus requests for flush, the `Flush`, `FlushOpt` and `FlushWB`. Main memory will listen to `FlushWB` and ignores others in dirty sharing, while it will listen to `Flush` in clean sharing.

> [!example] 
> ![Pasted image 20241006155850](./imgs/Pasted%20image%2020241006155850.png)

> [!success] 
> Compared to the MESI protocol, the MOESI protocol does not reduce the bandwidth usage on  the bus, but it does reduce the bandwidth use to the main memory.

> [!caution] 
> One of the drawbacks of an invalidate-based protocol is that it incurs a high number of coherence  misses. Each read to a block that has been invalidated incurs a cache miss, and the latency to serve  the miss can be quite high. 
> This is common in baseline write through, MSI, MESI, MOESI protocol since they are all invalidate-based protocol.

## Dragon (E, Sc, Sm, M): Update-Based Protocol with Dirty Sharing

Update-based protocols generally does not have a "Invalidate" state since there is not invalidate to come from. Dragon protocol is a update based protocol with **write allocate** and **write update** cache coherence policy. The protocol assumes the following requests from the processor and bus  transactions:

- **PrRd**: processor-side request to read to a cache block that **already resides in the cache**.
- **PrRdMiss**: processor-side request to read to a cache block that **does not already reside in the  cache**.
- **PrWr**: processor-side request to write to a cache block that **already resides in the cache**.
- **PrWrMiss**: processor-side request to write to a cache block that **does not already reside in  the cache**.

> [!note] 
> Key difference here is that in invalidate based protocols, `PrRd` is for either the cache already resides or its not. But in update based protocol,  cache states are not passively changed by `BusRdX` or `BusUpgr`,

Bus-side requests include:

- **BusRd**
- **Flush**
- **BusUpd**: snooped request that indicates a write to a word results in propagating the written  value on the bus. **the cache block is valid, clean, and only resides in one cache.**.

> [!note] 
> Note that only `PrRdMiss` will cause a `BusRd`.

Each cache block has an associated state which can have one of the following values:

- **Modified (M)**
- **Exclusive (E)**
- **Shared Modified (Sm)**: the cache block is valid, possibly dirty, and may reside in multiple  caches. However, when there are multiple cached copies, there can only be one cache that has  the block in shared modified state, other caches should have the block in state shared clean (Sc).  This state is **similar to the owned state in MOESI that allows dirty sharing**.
- **Shared Clean (Sc)**: the cache block is valid, possibly not clean, but may reside in multiple  caches. This state is **similar to the shared state in MOESI**.

![Pasted image 20241006160916](./imgs/Pasted%20image%2020241006160916.png)

> [!note] 
> - Note that there is no invalid state. Hence, an arrow that goes from nowhere to a state represents  a newly loaded block.
> - Since only `PrRdMiss` will cause a `BusRd` being posted on bus, therefore the entire block is needed to be put on bus when a `BusRd` is snooped.
> - The `M` state can only be obtained when nobody else has a copy, and the movement to this state always include a `!C` asserted on bus. If there are other copies, write to a block will cause the state move to `Sm`.
> - A `BusUpd` cannot occur when the block is in `E` state because there are no other caches that have the block, and nobody else can update the block.
> - Only when a block is in `M` or `Sm` state(which means it is possibly dirty), it will respond to `BusRd` with a `Flush`. Otherwise memory should provide the block.

> [!example] 
> ![Pasted image 20240924230517](./imgs/Pasted%20image%2020240924230517.png)


## Coherence Miss and Prefetching

### Coherence Miss

As mentioned before, invalid state in a cache indicates that the block has not been loaded before or it is invalidated by other caches, they both cause cache miss. 
Types of cache miss: 
- Cold miss: address has never been accessed
- Capacity miss: address used to be in cache, but was evicted because the cache is full
- Conflict miss: address used to be in cache, but was evicted because the set is full
- **Coherence miss**: **misses that occur due to accessing cache blocks that have been invalidated due to coherence events**.

There are two types of coherence miss:
- **True sharing miss**: multiple threads sharing the same variable (same byte/word), and they invalidate  one another
- **False sharing miss**: multiple threads sharing different variables in  different bytes or words that reside in a single cache block

Increasing the block size may increase the chance of false sharing, changing the capacity of cache does not affect directly on false sharing rate. Mostly the false sharing can be avoided by software, that is not to frequently read and write things in the same block in two running threads.

### Prefetching in Multiprocessor Systems

Prefetching is based on spatial locality. 

There are three general problems with prefetching:
- The risk that prefetching evicts a cache block that is currently being used
- The risk that the prefetched block is invalidated by other caches just before it is going to be used
- The risk that the supplier of the block holds the block with E or M state and still need to write to it, the prefetching will cause the write to be delayed, and it later invalidate the just prefetched block.

## Coherence in Multi-Level Cache

Write propagation must be performed downstream (towards outer memory, going out of private cache) and also upstream (snooped cache state change, update with inner cache).

A common architecture is a private L1 per core and shared L2 among cores, on a bus based system. We typically assume inclusion in snooping protocols because the L2 is on the bus but L1 is not, L2 needs to know and notify L1 state changes of caches. Without inclusion, L2 have to store extra states to decide wether or not to notify L1 on each snooped bus request.

|                   | Downstream                           | Upstream                             |
| :---------------: | ------------------------------------ | ------------------------------------ |
| Write Propagation | ![Pasted image 20241006164815](./imgs/Pasted%20image%2020241006164815.png) | ![Pasted image 20241006164822](./imgs/Pasted%20image%2020241006164822.png) |
| Read Propagation  | ![Pasted image 20241006164838](./imgs/Pasted%20image%2020241006164838.png) | ![Pasted image 20241006164956](./imgs/Pasted%20image%2020241006164956.png) |

On snooping a BusRd, L1 can be write through, then L2 can just send the data onto the bus 
or write back, then L2 cache have to sync from L1 cache before send it onto the bus.