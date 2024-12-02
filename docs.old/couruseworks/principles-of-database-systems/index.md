---
title: 数据库系统原理 (不) 完全复习指北
tags: [massive,database]
---

## 数据库系统概述

数据库 (Database,简称 DB) 是长期储存在计算机内、有组织的、可共享的大量数据的集合。

数据库系统工作环境要素：

- 数据库 DB
- 数据库管理系统 DBMS
- 数据库应用 DBAP

数据库的功能：

- 数据库的定义功能（例如定义表的名称），提供一套数据库定义语言 DDL
- 数据库的操纵功能（增删查改），提供一套数据操作语言 DML
- 数据库的控制功能（例如控制用户访问权限），提供一套数据控制语言 DCL
- 数据库的维护功能（转储，恢复，重组，性能检测，分析等），提供一系列应用程序供用户（一般是管理员用户）使用

其中,数据库定义语言、数据库操纵语言、数据库控制语言共同组成结构化数据库语言 SQL。例如：

```sql
SELECT 学号，姓名 FROM 学生登记表 WHERE 性别='男'
```

![web image](./imgs/index/0a808afeeb997181c4aac4026.png)

数据库管理系统的实现强调 `形式 -> 构造 -> 自动化`，DBMS 为了完成对 DB 的管理，在后台不断运行着一系列程序:

- 语言编译器，将来自用户的 DDL、DML、DCL 语句转换为可执行命令
- 执行引擎，实现查询功能以及优化
- 数据存取与索引管理，提供数据在磁盘、内存中的管理功能
- 通讯控制，提供网络环境下数据库操作与传输
- 事务管理程序，提供高可靠性和避免错误
- 故障恢复程序，提供备份、运行日志等
- 安全性控制和完整性控制软件，检查访问合法性和数据正确性

除此之外，还有数据库字典管理软件、应用程序 API 接口等。

### 数据库系统结构（三级模式和两层映像）

数据库系统的三级模式结构是指数据库系统中的三个不同级别的抽象描述，它们分别是：

1. **外部模式（External Schema）**：

   - 外部模式也被称为用户视图或用户模式。
   - 外部模式描述了用户或应用程序所看到的数据视图，即他们如何看待和使用数据库中的数据。
   - 每个外部模式都是针对特定用户或应用程序的需求而定义的，因此可以有多个外部模式。
   - 外部模式通常通过数据查询语言（如 SQL）来定义和操作，以便用户可以方便地检索、更新和操作数据，而不需要了解数据库内部的结构和存储方式。

2. **概念模式（Conceptual Schema）/ 逻辑模式 / 模式**：

   - 概念模式也称为逻辑模式，请注意，**在老师的 PPT 上逻辑模式被称作“模式”**。
   - 概念模式描述了整个数据库的逻辑结构和关系，它提供了一个统一的、抽象的视图，定义了数据库中的所有数据及其之间的关系。
   - 概念模式独立于任何特定的用户或应用程序，它反映了数据库的整体逻辑设计，通常由数据库管理员（DBA）来定义和管理。
   - 概念模式通常用数据模型（如实体 - 关系模型）来表示，以便清晰地描述数据之间的关系和约束。

3. **内部模式（Internal Schema）**：
   - 内部模式也称为存储模式或物理模式。
   - 内部模式描述了数据在物理存储介质上的实际存储方式和组织结构，包括数据的存储格式、索引方式、存储位置等细节。
   - 内部模式是最接近于实际存储的一层，它与计算机系统和存储设备密切相关，一般由数据库管理系统（DBMS）负责管理和维护。
   - 内部模式的设计与具体的硬件和操作系统有关，通常对大多数用户来说是不可见的，只有数据库系统的开发人员和系统管理员才需要了解和处理。

这种三级模式结构的设计使得数据库系统能够实现数据独立性和逻辑独立性，用户可以通过外部模式方便地访问数据，而不需要了解底层的存储细节和物理实现方式。同时，数据库管理员可以通过概念模式来管理数据库的整体结构和逻辑关系，而不需要受到具体存储和物理实现的限制。

:::info
在数据库系统中，" 两层映像 " 通常指的是外部模式和概念模式之间的映射，以及概念模式和内部模式之间的映射，这两组映射合起来构成了数据库系统的两层映像。
:::

1. **外部模式到概念模式的映射**：

   - 这个映射描述了外部模式中数据的逻辑视图如何映射到概念模式中的全局视图。
   - 外部模式通常是面向特定用户或应用程序的，因此它可能只包含数据库的一部分数据，并且可能对数据的组织结构和命名方式有所调整。
   - 外部模式到概念模式的映射定义了外部模式中的数据如何与整个数据库中的数据相对应，以及它们之间的关系是如何映射和转换的。

2. **概念模式到内部模式的映射**：
   - 这个映射描述了概念模式中的全局视图如何映射到内部模式中的物理存储结构。
   - 概念模式描述了整个数据库的逻辑结构和关系，而内部模式则描述了数据在物理存储介质上的实际存储方式和组织结构。
   - 概念模式到内部模式的映射定义了数据如何被存储在计算机系统中，包括数据的存储格式、索引方式、存储位置等细节。

通过这两组映射，数据库系统实现了数据的物理独立性和逻辑独立性，数据的物理独立性和逻辑独立性是数据库系统设计的两个重要概念，它们有助于提高数据库系统的灵活性和可维护性。

1. **物理独立性**：

   - 物理独立性指的是数据库的内部物理结构的变化不应该影响外部模式和应用程序对数据的访问和使用。换句话说，即使数据库的物理存储结构发生改变，用户和应用程序也应该能够继续以相同的方式访问和操作数据，而不需要进行修改。
   - **物理独立性的实现依赖于内部模式和概念模式之间的映射关系**，外部模式隐藏了数据的物理存储细节，使得用户和应用程序可以独立于底层存储结构。
   - 例如，如果数据库管理员决定更改数据存储引擎、调整数据分区方式或者迁移数据库到不同的服务器，这些变化应该对用户和应用程序是透明的，他们不需要修改其代码或查询语句。

2. **逻辑独立性**：
   - 逻辑独立性指的是数据库的全局逻辑结构的变化不应该影响外部模式和应用程序对数据的访问和使用。换句话说，即使数据库的逻辑结构发生改变，用户和应用程序也应该能够以相同的方式访问和操作数据，而不需要进行修改。
   - **逻辑独立性的实现依赖于概念模式和外部模式之间的映射关系**，概念模式提供了一个统一的、抽象的数据视图，使得用户和应用程序可以独立于具体的数据存储方式和逻辑实现。
   - 例如，如果数据库管理员决定重新设计数据库的表结构、修改数据关系模型或者添加新的数据约束，这些变化应该对用户和应用程序是透明的，他们不需要修改其代码或查询语句。

总的来说，外部模式隐藏了数据的物理存储细节，使得用户和应用程序可以方便地访问和操作数据，而不需要了解底层的存储结构；概念模式提供了数据库的全局逻辑视图，使得数据库管理员可以独立于具体的物理存储实现来设计和管理数据库的结构。物理独立性和逻辑独立性使得数据库系统能够更灵活地适应变化，并且能够降低维护和管理的成本。通过良好的设计和管理，数据库系统可以实现高度的数据抽象和隔离，从而提供更好的数据管理和使用体验。

![web image](./imgs/index/0a808afeeb997181c4aac407b.png)

### 概念模型（数据模型）

数据模型是现实世界数据特征的抽象，组成要素为：

- 数据结构
- 数据操作
- 数据的完整性约束条件

![web image](./imgs/index/0a808afeeb997181c4aac4071.png)

术语：

- 实体（Entity）
- 属性（Attribute），实体的属性
- 元组（Tuple），一个实体的这一组属性一般表示为一个元组
- 分量（Component），元组中的一个属性值
- 码（Key，也称主码），唯一标识实体的属性集
- 域（Domain），属性取值范围
- 实体型（Entity Type），实体的类型，包含类型名称和属性集合
- 实体集（Entity Set），同个类型实体的集合
- 联系（Relationship），实体内部各个属性和实体之间（实体集之间）的联系
- 关系模式，对关系的描述：`关系名（属性1，属性2，…，属性n）`，例如：`学生（学号，姓名，年龄，性别，系，年级`。

![web image](./imgs/index/0a808afeeb997181c4aac4027.png)

![web image](./imgs/index/0a808afeeb997181c4aac4052.png)
例如：
![web image](./imgs/index/0a808afeeb997181c4aac4072.png)
上图中学生的实体型是固定的，但是具体哪个学生选哪个课，哪个课永乐什么教材，这个是不断变化的。

Another Example:
![web image](./imgs/index/0a808afeeb997181c4aac4073.png)

在用户观点下，关系模型中数据的逻辑结构是一张二维的表（Table），由行和列组成：
![web image](./imgs/index/0a808afeeb997181c4aac4025.png)
通过表格理解术语：
![web image](./imgs/index/0a808afeeb997181c4aac402c.png)

要素：

- 关系（Relation）：
  - “一个”关系通常就指一张表
  - 表内有关系
  - 对于一个数据库，表之间有关系
- 元组（Tuple）：
  - 表中的一行即为一个元组
- 属性（Attribute）
  - 表中的一列即为一个属性，给每一个属性（列）起一个名称即属性名（列名）

:::warning
关系必须是**规范化**的，满足一定的规范条件。最基本的规范条件：关系的每一个分量必须是一个不可分的数据项, 不允许表中还有表。一个反例：
![web image](./imgs/index/0a808afeeb997181c4aac402b.png)
上图工资和扣除是可分的数据项 ,不符合关系模型要求。
:::

关系数据模型建立在严格的数学概念的基础上，实体和各类联系都用关系来表示，对数据的检索结果也是关系。关系的操作主要包含增删查改，其中查又包含选择、投影、连接、除、并、交、差。

关系的性质：

- 列是同质的
- 行列的顺序无关紧要
- 任意两个元组（表中的行）不能完全相同
- 每一分量必须是不可再分的数据
- 属性名不能重复

关系可以用**关系模式**表示，关系的描述称作关系模式，包括关系名、关系中的属性名、属性向域的映象、属性间的数据依赖关系等，记作 $R(A_1 , A_2 ,…, A_n )$ 例如：
![web image](./imgs/index/0a808afeeb997181c4aac402f.png)
上图中的要素：

- 候选码（Candidate Key）：关系中的一个属性组，其值能唯一标识一个元组。若从属性组中去掉任何一个属性，它就不具有这一性质了，这样的属性组称作候选码。如 DEPT 中的 D#，DN 都可作为候选码。任何一个候选码中的属性称作主属性，如 SC 中的 S#，C#。
- 主码（Primary Key）：若一个关系有多个候选码，则选定其中一个作为主码。如可选定 D#作为 DEPT 的主码。
- 外码（Foreign Key）：关系 R 中的一个属性组，它不是 R 的码，但它与另一个关系 S 的码相对应，则称这个属性组为 R 的外码，如 S 关系中的 D#属性。

Another example:
学生、课程、学生与课程之间的多对多联系：

```
学生（学号，姓名，年龄，性别，系号，年级）
课程（课程号，课程名，学分）
选修（学号，课程号，成绩）
```

:::info
**额外的知识**
关系模型也存在一些缺点，比如存取路径对用户透明导致查询效率往往不如非关系型数据模型，并且为了提高性能，需要对用户的查询请求进行优化，DBMS 的开发难度也有所上升。

除了关系模型，还有非关系模型：

- 层次模型 (Hierarchical Model)，用树形结构来表示各类实体以及实体间的联系，结构简单清晰，查询效率高，性能优于关系模型，不低于网状模型，完整性支持良好。但是多对多联系表示不自然，查询子女结点必须通过双亲结点，插入删除操作复杂。

请注意，初学者往往容易误解，层次模型的节点的单位是实体而不是一个单一的属性，也就是说，一个节点可以是一个元组，也就是一组属性的集合。例如：

![web image](./imgs/index/0a808afeeb997181c4aac402a.png)

上图中跟节点有三个属性。层次模型非常适合自上而下的查询操作，但是不适合从下到上的查询操作，不能很好地表示一对多联系。层次模型可以适用于部门管理等结构的场景下。

- 网状模型 (Network Model)，就是用图表示，和图的特性一致，比如允许存在多个根，可以有孤立节点，一个节点可以有多个边等。具有良好的性能，存取效率较高（？#todo），但是复杂度会随着数据增加逐渐上升，DDL、DML 语言也很复杂，用户不容易使用。

例如，一个学生可以选修若干们课程，一个课程可以被多个学生选修，学生与课程之间是多对多联系：
![web image](./imgs/index/0a808afeeb997181c4aac4078.png)
![web image](./imgs/index/0a808afeeb997181c4aac4079.png)

除此之外，还有面向对象模型 (Object Oriented Model）和对象关系模型 (Object Relational Model) 等。这里不做讨论。
:::

其型是关系模式的集合，即数据库描述，称作数据库的内涵 (Intension)，或关系数据库模式；
其值是某一时刻关系的集合，称作数据库的外延 (Extension)，或关系数据库。

### 概念模型与 ER 图

Example：用 E-R 图表示某个工厂物资管理的概念模型
![web image](./imgs/index/0a808afeeb997181c4aac4075.png)
![web image](./imgs/index/0a808afeeb997181c4aac4076.png)
E-R 图：
![web image](./imgs/index/0a808afeeb997181c4aac4077.png)

### 关系的完整性约束

关系的完整性分为：

- 实体完整性
- 参照完整性
- 用户自定义完整性

其中，实体完整性和参照完整性由系统自动支持；系统应提供定义和检验用户定义的完整性的机制。

实体完整性：关系的主码中的属性值不能为空值。其现实意义是，现实中的实体是能够相互区分的，实体又通过主码唯一标识，若主码为空，则存在不可标识的实体，这是不被允许的。

参照完整性：如果关系 $R_2$ 的外码 $F_k$ 与关系 $R_1$ 的主码 $P_k$ 相对应，则 $R_2$ 中的每一个元组的 $F_k$ 值或者等于 $R_1$ 中某个元组的 $P_k$ 值，或者为空值。其现实意义为如果关系 $R_2$ 中的某个元组 $t_2$ 参照了关系 $R_1$ 中的某个元组 $t_1$，则 $t_1$ 必须存在。

用户定义的完整性：用户针对具体的应用环境定义的完整性约束条件，例如用户规定“性别”属性只能取值为“男”和“女”。

Example:
![web image](./imgs/index/0a808afeeb997181c4aac4030.png)
从实体完整性的角度来看，B 的主码为 null，不能插入；C 的主码与已有的数据重复，不能插入；
从参照完整性的角度来看，E 的外码 T11 在关系 $S$ 中不存在，不能插入；
所以只有 A 和 D 能插入。

:::info
在现实的数据库系统软件中：

- 实体完整性体现在当用户试图插入以空值 (null) 为主键的数据时，会报错。
- 参照完整性体现在当用户试图插入以不存在的外键为分量的数据时，会报错。
- 用户自定义完整性体现在用户规定了某个分量应为无符号整数时，试图插入浮点数报错。

  :::

请阅读下文中使用 SQL 实现完整性约束的部分。

## 关系代数（第一次学会感觉有点抽象）

关系代数是一种基于集合的关系的操作，通过对关系的运算来表达查询操作，是一种抽象的查询语言。其运算的对象，结果都是关系。

![web image](./imgs/index/0a808afeeb997181c4aac405b.png)
![web image](./imgs/index/0a808afeeb997181c4aac405c.png)
某些关系代数操作如并、差、交等，需满足“并相容性”。
:::success
**定义**
![web image](./imgs/index/0a808afeeb997181c4aac405d.png)
![web image](./imgs/index/0a808afeeb997181c4aac405e.png)
:::
:::info
并、差、积、选择、投影 这 5 种操作被称为关系代数的基本操作，其余的操作 交、连接、除 都属于扩展操作。扩展操作可以通过基本操作组合实现。
:::
关系代数的运算符：
![web image](./imgs/index/0a808afeeb997181c4aac4031.png)

关系代数的运算包括：
![web image](./imgs/index/0a808afeeb997181c4aac405a.png)

### 记号说明

![web image](./imgs/index/0a808afeeb997181c4aac4053.png)
![web image](./imgs/index/0a808afeeb997181c4aac4055.png)
![web image](./imgs/index/0a808afeeb997181c4aac4056.png)
:::info
关系中，属性个数称为「度」或「目」，3 度表示这个表有 3 列。关系中元组的个数称为「基数」。
:::
![web image](./imgs/index/0a808afeeb997181c4aac4057.png)

例如：
![web image](./imgs/index/0a808afeeb997181c4aac4042.png)
又例如：
![web image](./imgs/index/0a808afeeb997181c4aac4044.png)

### 并运算

![web image](./imgs/index/0a808afeeb997181c4aac4032.png)
并运算可理解为 SQL 语句中的 $OR$。Example：
![web image](./imgs/index/0a808afeeb997181c4aac4033.png)

### 差运算

![web image](./imgs/index/0a808afeeb997181c4aac4034.png)
差运算可理解为 SQL 语句中的 $NOT$，例如：

```sql
SELECT * FROM Customers
WHERE NOT Country = 'Spain';
```

上述表达式在集合运算的角度来看就是 $\{r|r\in Customers \cap r\notin \{r|r.Country='Spain'\}\}$

差运算 Example:
![web image](./imgs/index/0a808afeeb997181c4aac4035.png)

另一个 example（但是需要看完后面的才能看）：
![web image](./imgs/index/0a808afeeb997181c4aac4067.png)
这个例子中要考虑有学生根本没有选课，所以不能在选课表上直接选择 $Cno$ 不等于 2 的。

### 交运算

![web image](./imgs/index/0a808afeeb997181c4aac4036.png)
差运算可理解为 SQL 语句中的 $AND$。Example：
![web image](./imgs/index/0a808afeeb997181c4aac4037.png)

### 选择和投影运算

选择运算：
![web image](./imgs/index/0a808afeeb997181c4aac4038.png)
差运算可理解为 SQL 语句中的 $SELECT$。Example：
![web image](./imgs/index/0a808afeeb997181c4aac403a.png)
![web image](./imgs/index/0a808afeeb997181c4aac403b.png)

投影运算：
![web image](./imgs/index/0a808afeeb997181c4aac403c.png)
投影运算实际上也是 $SELECT$。
![web image](./imgs/index/0a808afeeb997181c4aac403d.png)
比如上图中的这个投影运算写成 sql 就是：

```sql
SELECT SN,Age from Student
```

![web image](./imgs/index/0a808afeeb997181c4aac403e.png)
这俩一个是横着选一个是竖着选。这俩是可以混起来用的：
![web image](./imgs/index/0a808afeeb997181c4aac403f.png)
比如上面这个，方案 1 是先选择再投影，方案 2 是分别选择和投影，再把结果并起来。

### 象集

象集的本质是一次选择运算和一次投影运算。例如关系模式 R(X, Y)，对于其中的某个关系 A，当 $t[X]=x$ 时，x 在 A 中的象集（Images Set）为：

### 笛卡尔积

笛卡尔积（Cartesian Product）：一组域 $D_1,D_2,...D_n$ 的笛卡尔积为 $D_1 \times D_2 \times ... \times D_n = \{(d_1,d_2,...,d_n)|d_i \in D_i, i=1...n\}$。笛卡尔积的每个元素 $(d_1,d_2,...,d_n)$ 称为一个 $n$ 元组，元组中的每个值 $d_i$ 称作分量。若 $D_i$ 的基数（其中元组的个数）为 $m_i$，则笛卡尔积的基数为 $\prod_{i=1}^n m_i$。
![web image](./imgs/index/0a808afeeb997181c4aac402e.png)

广义笛卡尔积：
![web image](./imgs/index/0a808afeeb997181c4aac4040.png)
Example:
![web image](./imgs/index/0a808afeeb997181c4aac4041.png)

:::warning
大部分新手容易造成的一个误解是，在计算笛卡尔积时，在参与运算的每种关系内，属性都能够随意组合。实际上，笛卡尔积的运算单位是元组，例如对于上图中的关系 $R$，只有 $\alpha 1$ 和 $\beta 2$，没有 $\alpha 2$ 和 $\beta 1$，因此由其运算产生的笛卡尔积中也不会出现 $\alpha 2$ 和 $\beta 1$ 的组合。
:::
:::warning
笛卡尔积满足交换律，因为关系具有行和列的顺序无关性。
:::

### Theta 连接

![web image](./imgs/index/0a808afeeb997181c4aac4047.png)

:::info
$\theta$ 连接可以视为在广义笛卡尔积的基础上再进行一次选择运算，其中 $\theta$ 表示选择条件。
![web image](./imgs/index/0a808afeeb997181c4aac4060.png)
:::

Example 当 $\theta$ 条件是 $B\< D$ 时
![web image](./imgs/index/0a808afeeb997181c4aac4048.png)
上图就相当于在 $R$ 和 $S$ 的广义笛卡尔积上选择 $B\< D$ 的部分。

Another example:
![web image](./imgs/index/0a808afeeb997181c4aac4061.png)

Another Example 当一个表与自己进行 theta 连接时，可以采用更名操作 $\rho$ 使其变成另一个名称:
![web image](./imgs/index/0a808afeeb997181c4aac4062.png)

:::warning
和现实 DBMS 的差别
![web image](./imgs/index/0a808afeeb997181c4aac4063.png)
:::

### 等值连接

就是 $\theta$ 为等号时的 theta 连接操作。
Example:
![web image](./imgs/index/0a808afeeb997181c4aac4064.png)

### 自然连接

自然连接是一种特殊的等值连接，它要求参与运算的两个关系具有一个或多个相同的属性组。
![web image](./imgs/index/0a808afeeb997181c4aac4049.png)
Example：
![web image](./imgs/index/0a808afeeb997181c4aac404a.png)
Another example：
![web image](./imgs/index/0a808afeeb997181c4aac404b.png)
自然连接多个表的情况：
![web image](./imgs/index/0a808afeeb997181c4aac4065.png)

### 外连接

为什么需要外连接？
![web image](./imgs/index/0a808afeeb997181c4aac406c.png)
![web image](./imgs/index/0a808afeeb997181c4aac406d.png)
外连接的本质就是在进行自然连接的时候允许缺省值。在参与自然连接运算时，连接运算符两侧分别是左边关系和右边关系。
![web image](./imgs/index/0a808afeeb997181c4aac406e.png)
Example：
![web image](./imgs/index/0a808afeeb997181c4aac404d.png)
上图中关系 R 和 S 之间的自然连接的结果只有两条记录，若在 R 中选择 $(A,B,C)=(7,8,9)$，则 S 中没有 C 为 9 的记录能够对应，所以在自然连接中该记录不选入结果。外连接的作用就是 S 中不存在 C=9 时的 D 给补充为 NULL。
上图中对于外连接结果中 $(A,B,C,D)=(7,8,9,NULL)$ 是右外连接，$(A,B,C,D)=(NULL,NULL,8,5)$ 是左外连接。
Another example:
![web image](./imgs/index/0a808afeeb997181c4aac406f.png)

:::warning
虽然连接操作可以理解为一个积操作和一个选择操作，但是在实际应用中，由于 DBMS 内部操作的优化，一个连接操作的效率是高于一个积操作和一个选择操作的。
:::

### 除运算

![web image](./imgs/index/0a808afeeb997181c4aac404e.png)
人话就是两组关系中存在列的取值范围是一样的（哪怕列的名字不一样），然后除运算就是这些列在两个关系中相等的部分在左侧关系中的象集。
Example：
![web image](./imgs/index/0a808afeeb997181c4aac4050.png)
Another example:
![web image](./imgs/index/0a808afeeb997181c4aac4069.png)
Another example:
![web image](./imgs/index/0a808afeeb997181c4aac406a.png)
![web image](./imgs/index/0a808afeeb997181c4aac406b.png)
除运算的现实意义：
![web image](./imgs/index/0a808afeeb997181c4aac4058.png)
![web image](./imgs/index/0a808afeeb997181c4aac4059.png)

### 关系代数的运算优先级

关系运算的优先级按从高到低的顺序为：投影、选择、笛卡儿乘积、连接和除（同级）、交、并和差（同级）。

$$
\prod\ >\ \sigma\ >\ \times\ >\ \bowtie\ =\ \div\ >\ \cap\ =\ \cup\ = \ -
$$

## 关系演算

关系演算是以数理逻辑中的谓词演算为基础的。关系演算是描述关系运算的另一种思维模式。SQL 语言是继承了关系演算和关系代数的各自的优点形成的。
关系演算根据谓词变量的不同可分为：

- 关系元组演算（以元组变量为谓词变量的基本对象）
- 关系域演算（以域变量为谓词变量的基本对象）

![web image](./imgs/index/0a808afeeb997181c4aac4070.png)

### [不学的内容!!!] 关系元组演算

关系元组演算的基本形式：

$$
\{t|P(t)\}
$$

上式表示**所有使谓词 $P$ 为真的元组 $t$ 的集合**，其中：

- $t$ 是元组变量
- $t\in R$ 表示元组 $t$ 在关系 $R$ 中
- $P$ 是与谓词逻辑相似的公式，$P(t)$ 表示以元组 $t$ 为变量的公式

例如：

$$
\{t|t\in\ Student\}
$$

表示所有在 $Student$ 表里的元组，翻译成 sql

$P(t)$ 可以如下递归地进行定义：

- $P(t)$ 的三种原子公式是公式：
  - $s\in R$
  - $s[A]\ \theta\ c$ （$\theta 是比较运算符$）
  - $S[a]\ \theta\ u[B]$
- 如果 $P$ 是公式，那么 $\neg P$ 也是公式
- 如果 $P$ 是公式，那么 $P1\land P2$, $P1\lor P2$ 也是公式
- 如果 $P(t)$ 是公式，$R$ 是关系，则以下两条也是公式：
  - $\exists(t\in R)(P(t))$，表示若 $R$ 中有任何一个 $t$ 满足 $P(t)$，这个公式就满足
  - $\forall(t\in R)(P(t))$，表示若 $R$ 中所有的 $t$ 满足 $P(t)$，这个公式就满足
  - 对于运算符 $\forall$（全称量词）和 $\exists$（存在量词），元组变量 $t$ 若有被 $\forall$ 或 $\exists$，则该变量被称为“约束变量”，否则称为“自由变量”。
- 如果 $P$ 是公式，那么加个括号 $(P)$ 也是公式，运算优先级：$()>\theta>\exists=\forall>\neg>\land>\lor$，其中 $\theta$ 是比较运算符
- 公式只限于以上的形式

公式的等价：
![web image](./imgs/index/661857945e83d8bebb6755105.png)
![web image](./imgs/index/661857945e83d8bebb6755106.png)
![web image](./imgs/index/661857945e83d8bebb6755107.png)

Exmples:
![web image](./imgs/index/0a808afeeb997181c4aac4082.png)

缩减出年龄不是最小的同学

$$
\{ t | t\in Student \land \exists(u\in Student)(t[Sage]>u[Sage]) \}
$$

请检索出年龄小于 20 岁并且是男同学的所有学生

$$
\{ t | t\in Student \land t[Sage] < 20 \land t[Ssex] = '男' \}
$$

请检索出年龄小于 20 岁或者 03 系的所有男学生

$$
\{t | t\in Student \land t[Ssex] = '男' \land (t[Sage] < 20 \lor t[D\#]='03')\}
$$

检索不是 03 系的所有学生

$$
\{t|t\in Student \land \lnot (t[D\#]='03')\}
$$

检索不是（小于 20 岁的男同学）的所有同学

$$
\{t| t\in Student \land \lnot (t[Sage]\leq 20 \land t[Ssex] = '男')\}
$$

检索出被张三年龄小的所有同学

$$
\{t | t\in Student \land \exists(u\in Student)(u[Sname]='张三'\land u[Sage]>t[Sage])\}
$$

Another example:
![web image](./imgs/index/0a808afeeb997181c4aac4084.png)
缩减出所有课程都及格的所有同学

$$
\{t|t\in Student \land \forall (u\in SC \land t[Sno]=u[Sno])(u[Score]>60)\}
$$

Another example:
![web image](./imgs/index/661857945e83d8bebb6755102.png)
检索出计算机系的所有同学

$$
\{t | t\in Student \land \exists(u\in Dept)(u[D\#]=t[D\#] \land u[Dname]='计算机')\}
$$

Another example:
![web image](./imgs/index/661857945e83d8bebb6755103.png)
检索学过所有课程的同学

$$
\{t | t\in Student \forall(u\in Course)(\exists(s \in SC)(s[Sno]=t[Sno]\land s[Cno]=u[Cno]))\}
$$

Another example:
![web image](./imgs/index/661857945e83d8bebb6755104.png)
检索所有同学所有课程全都及格了的系

$$
\{d | d \in Dept \land \forall(s \in Student\land s[D\#]=d[D\#])(\forall(u \in SC \land u[Sno]=s[SnoS])(c[Score]>=60))\}
$$

### 关系演算与关系代数对比应用

关系代数和元组演算在某种程度上可以相互转换：

- 并运算：$R \cup S \iff \{t|t\in R\lor t\in S\}$
- 差运算：$R-S \iff \{t\in R \land \lnot t\in S\}$
- 交运算：$R\cap S \iff \{t|t\in R \land t\in S\}$
- 广义笛卡尔积：$R(A)\times S(B)\iff \{t|\exists(u\in R)\exists(s\in S)(t[A]=u[A]\land t[B]=s[B])\}$
- 选择运算：$\sigma_{cond}(R)\iff \{t|t\in R\land F(cond)\}$
- 投影运算：$\prod_{A}(R)\iff\{t[A]|t\in R\}$

Example：
![web image](./imgs/index/661857945e83d8bebb6755108.png)
求学过李明老师讲授所有课程的学生姓名
关系代数表达：

$$
\prod_{Sname}\left(\prod_{Sname,Cno}(Student \bowtie SC \bowtie Course) \div \prod_{Cno}(\sigma_{Tname='李明'}(Course))\right)
$$


元组演算表达：

$$
\{t[Sname]\ |\ t\in Student \land\forall(u\in Course\land u[Tname]='李明')(\exists(s\in SC)(s[Sno])=t[Sno]\land u[Cno]=s[Cno])\}
$$

Another example：求没学过李明老师讲授任一门课程的学生姓名（全没学过）
关系代数表达：（思路可以是用全部减上过的）

$$
\prod_{Sname}(Student) - (\sigma_{Tname='李明'}(Student\bowtie SC \bowtie Course))
$$

元组演算表达：

$$
\{t[Sname] | t\in Student \land \forall(u\in Course\land u[Tname]='李明')(\lnot \exists (w\in SC)(w[Cno]=u[Cno]\land w[Sno] = t[Sno]))\}
$$

Another example：求至少学过一门李明老师讲授课程的学生姓名
关系代数表达：

$$
\prod_{Sname}(\sigma_{Tname='李明'}(Student\bowtie SC \bowtie Course))
$$

元组演算表达：

$$
\{t[Sname]|t\in Student \land \exists(u \in Course \land u[Tname]='李明')(\exists(w\in SC)(w[Cno]=u[Cno]\land w[Sno]=t[Sno]))\}
$$

求至少有一门李明老师讲授课程没有学过的学生姓名
关系代数表达：（一个思路是用所有的减去全学了的）

$$
\prod_{Sname}(Student) - \prod_{Sname}(\prod_{Sname,Cno}(Student\bowtie SC\bowtie Course)\div \prod_{Cno}(\sigma_{Tname='李明'}(Course)))
$$

元组演算表达：

$$
\{t | t\in Student \land \exists(u\in Course \land u[Tname]='李明')(\lnot \exists(w\in SC)(w[Sno]=t[Sno]\land w[Cno]=u[Cno]))\}
$$

---

## SQL 语言

SQL 包含：

- DDL 数据定义语言：用于模式的定义和删除，操作对象包含 Databse、Table、View、Index、完整性约束条件等
  - CREATE
  - ALTER
  - DROP
- DML 数据操作语言：对数据进行更新和检索操作，也能做复杂的检索比如连接查找、模糊查找、嵌套查找，也能求平均，求和，分组等
  - INSERT
  - DELETE
  - UPDATE
  - SELECT
- DCL 数据控制语言，能控制用户访问数据的权限
  - GRANT
  - REVOLK

:::success
所以问到 SQL 语言的功能，那就是 数据定义、数据操作、数据控制。
:::

域的概念用数据类型来实现，数据类型规定了取值范围和能够进行的运算。

|      数据类型      |                      说明                      |
| :----------------: | :--------------------------------------------: |
|     `CHAR(n)`      |       长度为 $n$ 的定长非 Unicode 字符串       |
|    `VARCHAR(n)`    |     最大长度为 $n$ 的变长非 Unicode 字符串     |
|   `NVARCHAR(n)`    |      最大长度为 $n$ 的变长 Unicode 字符串      |
| `INT` 或 `INTEGER` |                     长整数                     |
|     `SMALLINT`     |                     短整数                     |
|    NUMERIC(p,d)    | 定点数，有 $p$ 位数字，小数点后面有 $d$ 位数字 |
|       `REAL`       |          浮点数，精度取决于运行的平台          |
| `DOUBLE PRECISION` |       双精度浮点数，精度取决于运行的平台       |
|     `FLOAT(n)`     |         浮点数，精度至少为 $n$ 位数字          |
|       `DATE`       |     日期，包含年月日，格式为 `YYYY-MM-DD`      |
|       `TIME`       |      时间，包含时分秒，格式为 `HH:MM:SS`       |

### SQL 基本语法

![web image](./imgs/index/661857945e83d8bebb6755114.png)

创建一个新的数据库（此时 DBMS 也会创建存储该数据库的文件）：

```sql
CREATE DATABASE <数据库名称>
```

删除数据库：

```sql
DROP DATABASE <数据库名称>
```

创建模式：

```sql
CREATE SCHEMA <模式名称> AUTHORIZATION <用户名>
```

![web image](./imgs/index/661857945e83d8bebb6755115.png)

删除模式：

```sql
DROP SCHEMA <模式名称> <CASCADE|RESTRICT>
```

其中 `CASCADE` 表示级联删除，删除该模式的同时会将该模式中所有的数据对象全部删除；`RESTRICT` 表示限制删除，如果该模式中定义了表等数据库对象，就拒绝执行删除，只有当该模式中没有任何下属对象了才可以删除。

创建基本表：

```sql
CREATE TABLE <模式>.<表名>
(
    <列名> <数据类型> [完整性约束],
    ...
    [表级完整性约束]
);
```

例如：

```sql
CREATE TABLE Student
(
    Sno CHAR(9) PRIMARY KEY, /* PRIMARY KEY 主键 */
    Sname CHAR(20) UNIQUE, /* 完整性约束，UNIQUE 唯一取值 */
    Ssex CHAR(2),
    Sage SMALLINT,
    Sdept CHAR(20),
);
```

再例如：

```sql
CREATE TABLE SelectCourse
(
    Sno CHAR(9),
    Cno CHAR(4),
    GRADE SMALLINT,
    PRIMARY KEY (Sno, Cno),
    FOREIGN KEY (Sno) REFERENCES Student(Sno),
    FOREIGN KEY (Cno) REFERENCES Course(Cno)
);
```

修改基本表：

```sql
ALTER TABLE <表名>
      [ADD <列名> <数据类型> [完整性约束]]
    | [ADD <完整性约束>]
    | [DROP <完整性约束>]
    | [ALTER COLUMN <列名> <数据类型>]
```

例如：

```sql
ALTER TABLE Student ADD Sentrance DATA; /*添加入学时间列，新增的一列都是空值*/

ALTER TABLE Student ALTER COLUMN Sage INT; /*将年龄列改为整形*/

ALTER TABLE Course ADD UNIQUE(Cname); /*增加课程名称必须取值唯一的完整性约束条件*/
```

删除基本表：

```sql
DROP TABLE <表名> [CASCADE];
```

如果写了 `CASCADE`，表示除了基本表的定义和数据被删除，表上建立的索引（Reference）、视图（View）、触发器（Trigger）等也会被删除。

一种完整性约束：Attribute Based Check，例如：

```sql
CREATE TABLE Sells
(
    bar CHAR(20),
    beer CHAR(20) CHECK ( beer IN (SELECT name FROM Beers)),
    price REAL CHECK ( price <= 5.00 )
);
```

向基本表中追加元组：

```sql
INSERT INTO <表名> [<列名...>] VALUES (<值...>);
```

请注意 `VALUES` 后面的值要和前面的列名顺序对应。例如：

```sql
INSERT INTO Student (Sno, Sname, Ssex, Sage, Dept, Sclass) VALUES ('99999999', '李四', '女', 20, '03', '888')
```

如果插入的 `VALUES` 正好就是所有属性按顺序的话，也可以不写列名，直接写成：

```sql
INSERT INTO Student VALUES ('99999999', '李四', '女', 20, '03', '888')
```

检索：

```sql
SELECT <列名...> FROM <表名> [WHERE <检索条件>];
```

相当于

$$
\prod_\{列名...\}(\sigma_{检索条件}(表名))
$$

例如：检索教师表中所有工资小于 1500 或大于 2000 的，并且要求这些老师是 03 系的：

```
SELECT Tname FROM Teachers WHERE (Salary < 1500 OR Salary > 2000) and Dept = '03';
```

### SQL 集合操作

UNION：

$$
R\cup S = \{t|t\in R \lor t\in S\}
$$

做集合操作的时候要求 R 和 S 里面的属性是相同的。SQL 写为：

```sql
SELECT * FROM R UNION SELECT * FROM S;
```

若 R,S 的属性名不同，可使用重命名使相应列名一致后进行并操作，例如对于关系 `R(A,B,C)` 和关系 `S(D,E,F)`：

```sql
(SELECT A,B FROM R) UNION (SELECT D AS A, E AS B FROM S);
```

上述 SQL 语句里的括号可以去掉，这样写只是为了可读性。

INTERSECT：

$$
R\cap S = \{t|t\in R\land t\in S\}
$$

和 UNION 一样，也要求属性一样。写成 SQL 是：

```sql
SELECT * FROM R INTERSECT SELECT * FROM S;
```

集合差操作可以转换为 EXCEPT：

```sql
SELECT * FROM R EXCEPT SELECT * FROM S;
```

### 数据对象和索引

| 数据库基本对象 |  体现  |                                                                        描述和                                                                        |
| :------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|    存储文件    | 内模式 |                                                    按照物理结构组织数据的文件，物理结构对用户透明                                                    |
|     基本表     |  模式  |                                     即关系，组织数据且独立存在（二维表的形态）的逻辑结构，一个关系对应一个基本表                                     |
|      索引      |   -    |                                     伴随基本表存在，是基本表中若干属性（组）的有序结构，可以加快数据库查询的速度                                     |
|      视图      | 外模式 | 一张虚拟的表，可从一个或多个基本表导出，也可以基于已经存在的视图定义新的视图，可以提高数据的安全性或简化查询。数据库中只存放视图结构而不存放视图数据 |

索引是指数据表中的一个或多个列的一种有序的（存储）结构。每个索引都有一个特定的搜索码与表中的记录关联，所以按照顺序存储搜索码的值。也就是说如果要建立索引，除了原来的列还要额外存储一些搜索码，所以索引是采用空间换时间的策略来提高查询速度的。**引入索引提高数据库的查询速度**。在查询数据时 DBMS 会自动选择合适的索引，用户无法选择使用何种索引。索引是关系数据库内模式的范畴。除此之外，索引还会降低插入删除和更新的速度，所以**经常更新的列不宜建立聚簇索引**。

从数据存储的角度看，聚簇索引并不是一种单独的索引类型，而是一种数据存储方式。**所以一个基本表上最多智能建立一个聚簇索引**。

- 聚簇索引：将数据存储与索引放到了一块，找到索引也就找到了数据。在聚簇索引中，表中的数据物理存储顺序按照索引的排序依次存储，因为聚簇索引相当于决定了数据物理存储的方式，因此一个数据表只能建立一个聚簇索引。
- 非聚簇索引（也叫二级索引）：将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，DBMS 把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据。

索引的建立：

```sql
CREATE [UNIQUE] [CLUSTERED | NONCLUSTERED] INDEX <索引名> ON <表名> (
    <列名>[<次序>]
    [,[列名][<次序>]]
    ...
);
```

其中次序关键字是 `ASC` 或 `DESC`。例如：在 `Student` 表的 `Sname` 列上建立一个聚簇索引：

```sql
CREATE CLUSTERED INDEX Snam2Student ON Student(Sname);
```

:::success
因为提升的是查询速度，所以应该在频繁进行查询操作的列上建立索引。
:::

索引的删除：

```sql
DROP INDEX <索引名>;
```

例如，删除 `Student` 表的 `Snam2Student` 索引：

```sql
DROP INDEX Snam2Student;
```

### SELECT 高级检索

`SELECT` 中的 `SELECT...,` `FROM...,` `WHERE...,` 等被称为子句，在以上的基础形式上会增加很多构成要素，也会增加许多新的字句以完成更复杂的检索。
`SELECT` 的检索条件书写比较难，一个是要正确理解自然语言所描述的要求，另一个是要正确书写检索条件语句。`SELECT` 子句还有可能根据要求出现嵌套，也是难点。

`SELECT` 语句的格式：

```sql
SELECT [ALL | DISTINCT] <目标列表达式>
                        [,<目标列表达式>] ...
DROM <表明或视图名> [,<表明或视图名>] ...
[WHERE <条件表达式>]
[GROUP BY <列名1> [HAVING <条件表达式>]]
[ORDER BY <列名2> [ASC | DESC]];
```

Example：`Student` 表：
![web image](./imgs/index/661857945e83d8bebb675511d.png)

创建 `Student` 表以及其他表的代码：

```sql
CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS SelectCourse;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Teacher;
DROP TABLE IF EXISTS Student;

CREATE TABLE Student
(
    Sno   VARCHAR(10) PRIMARY KEY,
    Sname VARCHAR(10),
    Ssex  VARCHAR(1) CHECK ( Ssex in ('男', '女') ),
    Sage  SMALLINT CHECK ( Sage > 0 ),
    Sdept VARCHAR(2)
);

INSERT INTO Student
VALUES ('2403001', '李勇', '男', 20, 'CS');
INSERT INTO Student
VALUES ('2403002', '刘晨', '女', 19, 'IS');
INSERT INTO Student
VALUES ('2403003', '王敏', '女', 18, 'MA');
INSERT INTO Student
VALUES ('2403004', '张力', '男', 19, 'IS');

SELECT Student.Sname, 'Year of Birth:', 2024 - Student.Sage, LOWER(Student.Sdept)
FROM Student;


CREATE TABLE Teacher
(
    Tno    VARCHAR(10) PRIMARY KEY,
    Tname  VARCHAR(10),
    Salary INTEGER CHECK ( Salary > 0 ),
    Tage   SMALLINT CHECK ( Tage > 0 )
);

INSERT INTO Teacher
VALUES ('114514', 'DeepDark', 5, 10);


CREATE TABLE Course
(
    Cno    VARCHAR(4) PRIMARY KEY,
    Cname  VARCHAR(10) UNIQUE,
    Credit SMALLINT CHECK ( Credit > 0 ),
    Tno    VARCHAR(10) REFERENCES Teacher (Tno),
    FOREIGN KEY (Tno) REFERENCES Teacher (Tno)
);
INSERT INTO Course
VALUES ('01', '第一门课', 1, '114514');
INSERT INTO Course
VALUES ('02', '第二门课', 2, '114514');
INSERT INTO Course
VALUES ('03', '第三门课', 3, '114514');


CREATE TABLE SelectCourse
(
    Cno   VARCHAR(4) REFERENCES Course (Cno),
    Sno   VARCHAR(10) REFERENCES Student (Sno),
    Grade DOUBLE PRECISION CHECK ( Grade > 0 ) DEFAULT NULL,
    PRIMARY KEY (Cno, Sno),
    FOREIGN KEY (Sno) REFERENCES Student (Sno),
    FOREIGN KEY (Cno) REFERENCES Course (Cno)
);
INSERT INTO SelectCourse
VALUES ('01', '2403001', 92.5);
INSERT INTO SelectCourse
VALUES ('02', '2403001', 94);
INSERT INTO SelectCourse
VALUES ('03', '2403001', 91.5);

INSERT INTO SelectCourse
VALUES ('01', '2403002', 83.5);
INSERT INTO SelectCourse
VALUES ('02', '2403002', 23);
INSERT INTO SelectCourse
VALUES ('03', '2403003', 51.5);
```

查询全体学生的详细记录：

```
SELECT * FROM Student;
```

查询全体学生的姓名、学号、所在系：

```sql
SELECT Sname, Sno, Sdept FROM Student;
```

在 `SELECT` 表达式中，`<目标列表达式>` 可以是关系的属性、算数表达式、字符串常量、函数。例如：查询经过计算的值：

```sql
SELECT Student.Sname, 'Year of Birth:', 2024-Student.Sage, LOWER(Student.Sdept) FROM Student;
```

![web image](./imgs/index/661857945e83d8bebb675511e.png)

在 `SELECT` 表达式中，可选的 `DISTINCT` 关键字用于表示在查询结果中消除重复行，如果缺省则默认为 `ALL`。例如：

```sql
SELECT DISTINCT Sno
FROM SelectCourse;
```

最终选出的 `Sno` 就是 `DISTINCT` 的：
![web image](./imgs/index/661857945e83d8bebb6755120.png)

在 `SELECT` 语句中，使用 `WHERE` 子句表达查询条件：
|查询条件|谓词|
|:---:|:---:|
|比较|$=$、$>$、$\<$、$>=$、$\<=$、$!=$、$\<>$、$!>$、$!\<$、$NOT$+ 上述比较运算|
|确定范围|`BETWEEN AND`、`NOT BETWEEN AND`|
|确定集合|`IN`、`NOT IN`|
|字符匹配|`LIKE`、`NOT LIKE`|
|空值|`IS NULL`、`IS NOT NULL`|
|逻辑运算|`AND`、`OR`、`NOT`|

例如：查询计算机科学系（"CS"）全体学生名单：

```sql
SELECT Sname FROM Student WHERE Sdept='CS';
```

查询既不是信息系、数学系，也不是计算机系的学生的姓名和性别：

```sql
SELECT Sname, Ssex
FROM Student
WHERE Sdept NOT IN ('IS', 'MA', 'CS');
```

空值查询：某些学生选课了但是还没有参加考试，所以有选课记录，但是没考试成绩，查询缺少考试成绩的学生的学号和相应的课程号：

```sql
SELECT Sno, Cno from SelectCourse WHERE Grade IS NULL;
```

查询所有有成绩的选课记录：

```sql
SELECT * FROM SelectCourse WHERE Grade IS NOT NULL;
```

:::danger
在涉及空值的查询中 `IS NULL` 或 `IS NOT NULL` 的 `IS` 不能使用 `=` 代替。
:::

在 `SELECT` 语句中，使用 `ORDER BY` 子句可以按照一个或多个属性列对查询结果进行排序。升序使用 `ASC` 关键字，降序使用 `DESC` 关键字，缺省时默认使用 `ASC`。

例如，查询选修了 3 号课程的学生的学号以及成绩，查询结果按照分数降序排列：

```sql
SELECT Sno, Grade FROM SelectCourse WHERE Cno='03' ORDER BY Grade DESC;
```

:::warning
当排序列上有空值时：

- `ASC` 排序时将空值的元组最后显示
- `DESC` 排序时将空值的元组最先显示

  :::

### 模糊查询

模糊匹配谓词 `LIKE`：

```sql
[NOT] LIKE <匹配串> [ESCAPE <换码字符>]
```

|   通配符    |                                 描述                                  |
| :---------: | :-------------------------------------------------------------------: |
|    $\%$     |                  可与任意长度（包括 0）的字符串匹配                   |
|    $\_$     |                         可与任意一个字符匹配                          |
|   $[\ ]$    |    指定范围（比如 `[a-f]`）或集合（比如 `[abcdef]`）的任何单个字符    |
| $[^\wedge]$ | 不属于指定范围（比如 `[a-f]`）或集合（比如 `[abcdef]`）的任何单个字符 |

例如：
![web image](./imgs/index/661857945e83d8bebb6755121.png)

例如：查询所有姓刘的学生的姓名和学号：

```sql
SELECT Sname, Sno
FROM Student
WHERE Sname LIKE '刘%';
```

查询第二个字为“晨”字的学生的姓名：

```sql
SELECT Sname FROM Student WHERE Sname LIKE '_晨%';
```

查询所有不姓刘的学生的姓名：

```sql
SELECT Sname FROM Student WHERE Sname NOT LIKE '刘%';
```

当 `LIKE` 后面的匹配串是确定的字符串（不包含通配符）时，`LIKE` 就等价于 `=`。例如：

```sql
SELECT * FROM Student WHERE Sno LIKE '2403001';
SELECT * FROM Student WHERE Sno = '2403001';
```

这俩是等价的。

可选的 `ESCAPE` 关键字用于在模糊匹配中处理本来就含有 $\%$ 或 $\_$ 的匹配串，比如匹配串 `_%S%T` 中第一个 `%` 不想作为通配符使用，就可以用 `ESCAPE` 定义一个转义字符。例如，查询第二个字为 “%” 字的学生的姓名：

```sql
SELECT Sname FROM Student WHERE Sname LIKE '_\%%' ESCAPE '\';
```

#### 聚集函数

`SELECT` 的的操作结果是一个集合，使用一些内建的函数可以进一步对查询结果进行处理。

| 函数名  |               语法               |             描述             |
| :-----: | :------------------------------: | :--------------------------: |
| `COUNT` | `COUNT( [DISTINCT\|ALL] <列名>)` |  统计查询结果中某列值的个数  |
|  `SUM`  |  `SUM( [DISTINCT\|ALL] <列名>)`  |   统计查询结果中某列值的和   |
|  `AVG`  |  `AVG( [DISTINCT\|ALL] <列名>)`  | 统计查询结果中某列值的平均值 |
|  `MAX`  |  `MAX( [DISTINCT\|ALL] <列名>)`  | 统计查询结果中某列值的最大值 |
|  `MIN`  |  `MIN( [DISTINCT\|ALL] <列名>)`  | 统计查询结果中某列值的最小值 |

例如，查询学生总人数：

```sql
SELECT COUNT(*) FROM STUDENT;
```

查询选修了课程的学生人数：

```sql
SELECT COUNT(DISTINCT(SNO) FROM SC);
```

计算 1 号课程的学生平均成绩：

```sql
SELECT AVG(GRADE) FROM SC WHERE CNO=1;
```

查询选秀 1 号课程的学生的最高分数：

```sql
SELECT MAX(GRADE) FROM SC WHERE CNO=1;
```

:::danger
请注意，聚集函数是不能用在 `WHERE` 子句中的。例如：

```sql
/* NOT OK, Aggregate calls are not allowed here */
SELECT Sno, AVG(Grade) FROM SelectCourse WHERE AVG(Grade)>=50 GROUP BY Sno;
```

这样算不行的，要实现这个功能需要在 `GROUP BY` 子句后面接 `HAVING` 子句，也就是写成：

```sql
SELECT Sno, AVG(Grade) FROM SelectCourse GROUP BY Sno HAVING AVG(Grade)>=50;
```

`GROUP BY` 子句就是紧接着下面的内容。
:::

#### GROUP BY 子句

`GROUP BY` 子句将查询中间结果按照指定的列进行分组，以细化聚集函数的作用对象。如果不对查询结果分组，聚集函数会作用在整个查询结果，如果先分了组，聚集函数会分别作用域每个组。

![web image](./imgs/index/41b22ce4147a6b085249dce00.png)

求各个课程号的选课人数：

```sql
SELECT COUNT(Cno), COUNT(Sno) FROM SC GROUP BY Cno;
```

`HAVING` 子句是对 `GROUP BY` 的分组结果进行筛选：
![web image](./imgs/index/41b22ce4147a6b085249dce01.png)

例如。查询选修了 5 门以上课程的学生的学号：

```sql
SELECT Sno FROM SC GROUP BY Sno HAVING COUNT(*)>5;
```

查询平均成绩大于等于 90 分的学生的学号和平均成绩：

```sql
SELECT Sno, AVG(grade) FROM SC GROUP BY  Sno HAVING AVG(grade) >= 90;
```

:::info
`WHERE` 是在 `GROUP BY` 之前生效，而 `HAVING` 是在 `GROUP BY` 之后生效在每个 GROUP 上。
:::

求不及格课程超过两门的同学的学号：

```sql
SELECT Sno FROM SC WHERE grade<60 GROUP BY Sno HAVING COUNT(*)>2;
```

求有两门以上不及格课程同学的学号及相应的平均成绩：

```sql
SELECT Sno, AVG(grade) FROM SC WHERE Sno IN (SELECT Sno FROM SC WHERE grade<60 HAVING COUNT(*)>2) GROUP BY Sno;
```

:::danger
小心不要写成

```sql
SELECT Sno, AVG(grade) FROM SC WHERE grade<60 GROUP BY Sno HAVING COUNT(*)>2;
```

因为这样表示的平均值是只统计了不及格课程的平均值，而我们想要的是全部课程的。
:::

#### LIMIT 子句

`LIMIT` 子句用于限制查询结果的数量。其语法为：

```sql
LIMIT <行数1> [OFFSET <行数2>]
```

其意义为，取 `<行数1>`，忽略 `<行数2>`，一般 `LIMIT` 子句与 `ORDER BY` 一起使用。

例如：查询选修了数据结构课程并且成绩排名在倒数前 5 的学生的学号：

```sql
SELECT Sno FROM SC, Course WHERE Cname='数据结构' AND SC.Cno=Course.Cno ORDER BY GRADE DESC LIMIT 5;
```

查询平均成绩排在 4-10 名的学生的学号和平均成绩：

```sql
SELECT Sno, AVG(Grade) FROM SC GROUP BY Sno ORDER BY AVG(Grade) DESC LIMIT 7 OFFSET 3;
```

### SELECT 连接查询

笛卡尔积：

```sql
SELECT R.*, S.* FROM R,S;
SELECT R.*, S.* FROM R CROSS JOIN S;
```

上述两个都是笛卡尔积。

等值连接：

```sql
SELECT R.*, S.* FROM R JOIN S ON R.A=S.B;
```

请注意等值连接和自然连接不同的是 `JOIN.. ON` 的条件是不同的属性。

自然连接：

```sql
SELECT R.*. S.* FROM R JOIN S ON R.A=S.A;
```

自然连接 `JOIN.. ON` 的条件的属性都是 `A`。不过实际用的时候自然连接其实可以写成别的样子，比如：

```sql
SELECT Student.*, SC.* FROM Student JOIN SC ON Student.Sno=SC.Sno;
SELECT Student.*, SC.* FROM Student, SC WHERE Student.Sno=SC.Sno;
```

上述两个语句都能实现等值连接。

左外连接：
![web image](./imgs/index/41b22ce4147a6b085249dce02.png)

```sql
SELECT * FROM R LEFT OUTER JOIN S ON R.C=S.C;
```

例如：查询计算机系所有学生的选课情况，没有选修任何课程的学生也要在结果中出现，要求显示学号、学生姓名、课号和成绩：

```sql
SELECT Student.Sno, Sname, Cno, Grade FROM Student LEFT OUTER JOIN SC ON (Student.Sno=SC.Sno) WHERE Sdept='CS;
```

:::success
显然 `WHERE` 子句是在连接后面的，这同样适用于左右外连接。
:::

右外连接：
![web image](./imgs/index/41b22ce4147a6b085249dce04.png)

```sql
SELECT * FROM R RIGHT OUTER JOIN S ON R.C=S.C;
```

:::danger
请注意，SQL 中的 `JOIN` 默认是 `INNER JOIN`，但是写作 `INNER JOIN` 会更加清晰。来自 stackoverflow: "(JOIN and INNER JOIN) They are functionally equivalent, but INNER JOIN can be a bit clearer to read, especially if the query has other join types (i.e. LEFT or RIGHT or CROSS) included in it."
INNER JOIN 和 OUTER JOIN 的区别：
![web image](./imgs/index/41b22ce4147a6b085249dce03.png)
:::

自身连接（表与自身进行连接）：需要给表起别名以做区分，所有属性名都是同属性名所以属性也要以表别名 + 属性名区分。例如：查询每一门课的间接先修课：

```sql
SELECT First.Cno, Second.Cpno FROM Course First, Course Second WHERE First.Cpno=Second.Cno;
```

### 连接查询优化：嵌套循环

问题：笛卡尔积 + 选择的连接查询模式效率不够高，可以进行优化提升速度。使用嵌套循环法（Nested Loop）可以优化查询速度。

一个 `SELECT-FROM-WHERE` 语句称为一个插叙块，将一个查询块嵌套在另一个查询块的 `WHERE` 子句或 `HAVING` 短句的条件中称为嵌套查询。嵌套查询可用于： 1. 带有 `IN` 谓词的子查询 2. 带有比较运算符的子查询 3. 带有 `ANY`(`SOME`) 或 `ALL` 谓词的子查询 4. 带有 `EXISTS` 谓词的子查询

#### 带有 `IN` 谓词的子查询

![web image](./imgs/index/41b22ce4147a6b085249dce05.png)
:::success
有些嵌套查询可以用连接运算代替，例如上述案例中，可以改为：
![web image](./imgs/index/41b22ce4147a6b085249dce06.png)
:::

:::danger
子查询不能（不必）使用 `ORDER BY` 子句。
:::

#### 带有比较运算符的子查询

![web image](./imgs/index/41b22ce4147a6b085249dce07.png)

例如：
![web image](./imgs/index/41b22ce4147a6b085249dce09.png)

#### 带有 `ANY`(`SOME`) 或 `ALL` 谓词的子查询

![web image](./imgs/index/41b22ce4147a6b085249dce08.png)

例如：
![web image](./imgs/index/41b22ce4147a6b085249dce0a.png)

#### 嵌套查询中“某个”和“所有”的转换

转换关系：
![web image](./imgs/index/41b22ce4147a6b085249dce0b.png)

Example：查询其他系中比计算机系 **某一** 学生年龄小的学生姓名和年龄：

```sql
SELECT Sname, Sage FROM Student WHERE Sage < ANY(SELECT Sage FROM Student WHERE Sdept='CS') AND Sdept <> 'CS';
```

或等效写为：

```sql
SELECT Sname, Sage FROM Student WHERE Sage < (SELECT MAX(Sage) FROM Student WHERE Sdept='CS') AND Sdept <> 'CS';
```

Example：查询其他系中比计算机科学系 **所有** 学生年龄都小的学生姓名及年龄：

```sql
SELECT Sname, Sage FROM Student WHERE Sage < ALL(SELECT Sage FROM Student WHERE Sdept='CS') AND Sdept <> 'CS';
```

```sql
SELECT Sname, Sage FROM Student WHERE Sage < (SELECT MIN(Sage) FROM Student WHERE Sdept='CS') AND Sdept <> 'CS';
```

![web image](./imgs/index/41b22ce4147a6b085249dce0d.png)

![web image](./imgs/index/41b22ce4147a6b085249dce0e.png)
:::success
注：因为 `EXISTS` 子查询只会返回真值或假值，因此 `EXISTS` 的查询目标列无需给出列明，写 `*` 即可。
:::

#### 相关子查询

从相关性的角度，嵌套循环的查询分为：

- 不相关子查询：内层查询的执行不涉及外层查询
- 相关子查询：子查询的查询条件依赖于外层父查询的某个属性值

![web image](./imgs/index/41b22ce4147a6b085249dce0c.png)

查询每个学生选修的所有课程中成绩最高的课程名称和成绩，要求显示学生姓名、（最高成绩的）课程名称和成绩：

```sql
SELECT Sname, Cname, Grade FROM Student, Course, SC WHERE Student.Sno = SC.Sno AND Course.Cno = SC.Cno AND Grade > ALL(
    SELECT Grade FROM SC WHERE Student.Sno = SC.Sno
);
```

#### 为什么我写出的 SQL 和别人不一样？

可以不一样，只要是实现相同的功能。

例如：将计算机系全体学生的成绩变为 0：

```sql
UPDATE SC SET Grade=0 WHERE SC.Sno IN (SELECT Sno FROM Student WHERE Student.Sdept='CS');
```

或者

```sql
UPDATE SC SET Grade=0 WHERE 'CS'= (SELECT Student.Sdept FROM Student WHERE Student.Sno=SC.Sno);
```

上述两个 SQL 语句都能实现这个功能，其中第一条是无关子查询限定了修改哪些学号的学生，而后者使用相关子查询限定学号的范围。

可以看出，为了实现相同的功能，可以写出不同的 SQL 子句。

#### 其他（？）

- 排序合并法（Sort Merge）
- 索引连接（Indexed Join）

### 将查询结果插入到

实现这个功能可以用 `INSERT INTO SELECT` 和 `SELECT INTO`：

- `INSERT INTO SELECT` 语句从一个表复制数据，然后把数据插入到一个已存在的表中。目标表中任何已存在的行都不会受影响。
- `SELECT INTO` 语句从一个表复制数据，然后把数据插入到另一个新表中。新表将会使用 `SELECT` 语句中定义的列名称和类型进行创建。如果想要修改字段的名称，可以使用 `AS` 子句来应用新名称。

:::info
对于同样的一批（很多的）数据，`SELECT INTO` 的运行速度要比 `INSERT INTO` 快。但是 `SELECT INTO` 也有不好的地方，就是此语句只能在目标表没有创建的情况下使用，如果目标表结构已经存在，就会提示数据库中已存在名为 'TargetDB' 的对象（如下图），此时就只能用 INSERT INTO SELECT 方式去操作了。
:::

`INSERT INTO SELECT` 是需要先建好表的，语句格式：

```sql
INSERT INTO <表名> [(<属性列1>[,<属性列2>]...)] [<子查询>];
```

例如，对每一个系，求学生平均年龄，并把结果存入数据库：

```sql
/* 建一个存平均年龄的表 */
CREATE TABLE Dept_age
(
    Sdept CHAR(15),
    Avg_afe SMALLINT
);

/* 插入查询结果 */
INSERT INTO Dept_age(Sdept,l Avg_age)
    SELECT Sdept, AVG(Sage) FROM Student GROUP BY Sdept;
```

:::warning
`SELECT` 子句和 `INSERT INTO` 的属性列数量、对应属性列的类型必须完全匹配。
:::

### UPDATE 语句

语句格式：

```sql
UPDATE <表名> SET <列名>=<表达式> [,<列名>=<表达式>...] [WHERE <条件>];
```

上述语句会修改执行表中满足 `WHERE` 子句条件的元组。根据条件是否满足，实际上会出现多种情况：

- 语句只修改了某一元组中某一列的值
- 语句修改了多个元组中某一列的值
- 带子查询的修改语句，进一步看情况修改值

例如，将学号为 '2403001' 的学生的年龄改为 22 岁：

```sql
UPDATE Student SET Sage=22 WHERE Sno='2403001';
```

到年末了，在数据库中将所有学生的年龄增加一岁：

```sql
UPDATE Student SET Sage = Sage + 1;
```

当某同学 001 号课程的成绩低于该课程的平均值时，将该同学该门课成绩提高 5%：

```sql
UPDATE SC SET Grade=Grade*1.05 WHERE Cno='001' AND Grade < (SELECT AVG(Grade) FROM SC WHERE Cno='001');
```

:::danger
上述语句在 mysql 8.0 中执行时会报错：You can't specify target table 'SC' for update in FROM clause。这是因为

```sql
/* NOT OK, 外面的 UPDATE 修改的表不能在子查询中引用 */
UPDATE SC
SET Grade=Grade * 1.05
WHERE Cno = '01'
  AND Grade < SOME (SELECT AVG(Grade) FROM SC WHERE Cno = '01');

/* OK,  SC 表在子查询中被隐式地复制了一份，和外面该表的更新不冲突 */
UPDATE SC
SET Grade=Grade * 1.05
WHERE Cno = '01'
  AND Grade < SOME (SELECT AVG(Grade) FROM (SELECT * FROM SC) AS Another WHERE Cno = '01');
```

:::

#### 多表 UPDATE？

![web image](./imgs/index/41b22ce4147a6b085249dce10.png)

上面那句可以，下面那句显然是不行的，选课表和 Student 表能满足 `Student.Sno=SC.Sno` 的地方对选课表来说是正确的，会选出这个学生选的所有课程这么多的元组。但是对学生来说，如果选了多门课，那年龄 Sage 会被 +1 好几次，然而这个地方其实只是想 +1 一次的。

### DELETE 删除数据

语句格式：

```sql
DELETE FROM <表名> [WHERE <条件>];
```

其中 WHERE 子句用来过滤要删除的元组，要是不指定就是没条件，那就是删除所有的元组。但是，删除某张表的全部记录不等于 DROP TABLE，该表的定义不会被删除。

根据 WHERE 子句不同，可能的删除分为三种方式：

- 删除某一个元组的值
- 删除多个元组的值
- 带有子查询，根据子查询的结果进一步选择性删除

例如：删除学号为 '2403001' 的学生记录：

```sql
DELETE FROM Student WHERE Sno='2403001';
```

删除所有学生的选课记录：

```sql
DELETE FROM SC;
```

删除计算机系所有学生的选课记录：

```sql
DELETE FROM SC WHERE 'CS'=(SELECT Sdept FROM Student WHERE Student.Sno=SC.Sno);
```

或

```sql
DELETE FROM SC WHERE SC.Sno IN (SELECT Sno FROM Student WHERE Student.Sdept='CS');
```

![web image](./imgs/index/41b22ce4147a6b085249dce11.png)
这样做会连 Student 表中 match 了这个 where 子句的记录一起被删除，所以不能这样干。

删除有四门课不及格的所有学生：

```sql
DELETE FROM Student Where Sno IN (SELECT Sno FROM SC WHERE Grade<60 GROUP BY Sno HAVING COUNT(*)>=4);
```

### 使用 SQL 实现基本完整性约束

DBMS 在执行插入语句和删除语句的时候会检查所有插入元组是否被破坏。回顾几种完整性：

- 实体完整性
- 参照完整性
- 用户自定义完整性
  - NOT NULL 约束
  - UNIQUE 约束
  - 域约束
- 在删除时应额外注意 CASCADE 约束

#### 参照完整性

关系模型的参照完整性使用 `FOREIGN KEY` 和 `REFERENCES`，例如，在关系 SC 中 Sno 和 Cno 是主码，分别引用 Student 表的 Sno 和 Course 表的 Cno：

```sql
CREATE TABLE SC
(
    Sno CHAR(9) NOT NULL,
    Cno CHAR(4) NOT NULL,
    ...
    PRIMARY KEY (Sno, Cno),
    FOREIGN KEY (Sno) REFERENCES Student(Sno),
    FOREIGN KEY (Cno) REFERENCES Course(Cno),
);
```

参照完整性违约处理：

- 拒绝执行（NO ACTION）（默认策略）
- 级联操作（CASCADE）
- 设置为空（SET-NULL）

以被参照表 Student 和参照表 SC 为例：
|可能破坏完整性的情况|违约处理|
|:---:|:---:|
|向 SC 中插入时违约|拒绝|
|修改 SC 中的外码值|拒绝|
|删除 Student 中的元组|拒绝/级联删除/将 SC 中对应位置设为空|
|修改 Student 中的元组|拒绝/级联删除/将 SC 中对应位置设为空|

#### 用户自定义完整性

![web image](./imgs/index/41b22ce4147a6b085249dce34.png)
![web image](./imgs/index/41b22ce4147a6b085249dce35.png)

#### CONSTRAINT 子句

```sql
CONSTRAINT <完整性约束名>
    PRIMARY KEY 短句]
    | [FOREIGN KEY 短句]
    | [CHECK 短句]
```

![web image](./imgs/index/41b22ce4147a6b085249dce36.png)

使用 `ALTER TABLE` 可以修改表中的完整性约束：

![web image](./imgs/index/41b22ce4147a6b085249dce37.png)

### SQL 和 关系代数的转换

![web image](./imgs/index/661857945e83d8bebb6755122.png)
上述 SQL 语句的关系代数表示：

$$
\prod_{Sname}(\sigma_{Grade<60}(S\bowtie SC))
$$

### 视图 View

视图是从一个或几个基本表（或其他视图）导出的虚表。数据库中只存放视图的定义（不过有些数据库开始支持物化视图了）。若基本表中的数据发生变化，从视图中查询出的数据也随之改变。视图也是数据库的一个基本对象，是用户看到数据库的不同的 View，因此是外模式的一部分。视图支持创建和删除，**但是只支持受限的数据更新操作**。

视图能够：

- 简化用户的操作
- 使用户能多个角度看待相同一份数据
- 对数据库提供了一定程度的逻辑独立性
- 配合权限管理对机密数据提供安全防护

#### 创建视图

语句格式：

```sql
CREATE VIEW <视图名> [(<列名> [,<列名>...])] AS <子查询> [WITH CHECK OPTION];
```

在使用上述 SQL 语句定义视图时，组成视图的属性列名要么全部省略（直接从子查询自动生成）要么全指定，其中，子查询不允许含有 `ORDER BY` 子句和 `DISTINCT` 关键字。

:::warning
如果在定义视图的时子查询不显式指定属性列，例如：

```sql
CREATE VIEW F_Student(F_Sno, name, sex, age, dept)
AS SELECT * FROM Student WHERE Ssex='女';
```

那么如果用户修改基本表 Student 的结构，Student 表与 F_Student 视图的映像关系被破坏，会导致该视图无法正常工作。
:::

例如：
![web image](./imgs/index/41b22ce4147a6b085249dce13.png)

视图的作用是可以限定用户查询、插入和修改的数据的范围，例如，在建立视图时使用 `WHERE` 子句限定 Sdept 为 'IS'：

```sql
CREATE VIEW IS_Student_1 AS
SELECT *
FROM Student
WHERE Sdept = 'IS';
```

这样，用户在视图上操作时就不会碰到别的系的学生数据。

`WITH CHECK OPTION` 子句用于限制对视图的插入和更新操作。当使用 WITH CHECK OPTION 创建视图时，只有满足视图定义中的条件的数据才能被插入到视图中，或者更新视图中的数据。

例如：

```sql
CREATE VIEW IS_Student_1 AS
SELECT *
FROM Student
WHERE Sdept = 'IS';

CREATE VIEW IS_Student_2 AS
SELECT *
FROM Student
WHERE Sdept = 'IS'
WITH CHECK OPTION;
```

这俩直接查查询结果会是一样的，但是插入的时候会有不同的行为：
![web image](./imgs/index/41b22ce4147a6b085249dce14.png)

比如这时候如果进行插入操作：

```sql
INSERT INTO IS_Student_1(Sno, Sname, Sage, Ssex, Sdept)
VALUES ('2403005', '老王', 22, '男', 'CS');

INSERT INTO IS_Student_2(Sno, Sname, Sage, Ssex, Sdept)
VALUES ('2403006', '老李', 23, '男', 'CS');
```

那么第二个插入操作会失败，错误信息：

```
CHECK OPTION failed 'test.IS_Student_2'
```

因为有 `WITH CHECK OPTION`，所以插入的时候会要求创建视图时 `WHERE` 子句后面的条件成立，也就是 `Sdept = 'IS'`。

#### 在视图上查询

在视图上查询与在基本表上查询是相同的。DBMS 会实现视图查询的方法，其中包含了实现：

- 有效性检查
- 转换为等价的对基本表的查询
- 执行修正后的查询

上述 DBMS 实现的对视图的查询方法称为视图消解（View Resolution）。
![web image](./imgs/index/41b22ce4147a6b085249dce16.png)

#### 向视图插入

在视图上插入数据与在基本表上查询是相同的。例子：向信息系学生视图 `IS_Student_2` 插入一条新的学生记录：

```sql
INSERT INTO IS_Student_2(Sno, Sname, Sage, Ssex, Sdept)
VALUES ('2403006', '老李', 23, '男', 'IS');
```

![web image](./imgs/index/41b22ce4147a6b085249dce18.png)

不过要注意视图是有可能由 `WITH CHECK OPTION` 的。所以错误的插入会失败。

#### 在视图上修改

例如：通过信息系学生视图 `IS_Student_1` 将学号 `2404001` 号学生的姓名修改为 ' 刘晨 '：

```sql
UPDATE IS_Student_1 SET Sname='刘晨' WHERE Sno='2404001';
```

![web image](./imgs/index/41b22ce4147a6b085249dce17.png)

#### 在视图上删除

例如：删除信息系学生视图 `IS_Student_001` 中学号为 `2404001` 的记录：

```sql
DELETE FROM IS_Student_1 WHERE Sno='2404001';
```

#### 删除视图

删除视图语句格式：

```sql
DROP VIEW <视图名>;
```

:::warning
如果该视图上还导出了其他视图，使用 CASCADE 级联删除语句把该视图和由它导出的视图一起删除：
![web image](./imgs/index/41b22ce4147a6b085249dce15.png)

在删除基本表时，由该基本表导出的所有视图都必须显式地使用 DROP VIEW 语句先行删除。
:::

#### 更新视图时的约束

一些视图是不能更新的，因为对这些视图的更新不能唯一地有意义地转换成对相应的基本表的更新。例如，假设现在有一个平均成绩视图是这样定义的：

```sql
CREATE VIEW Student_Grade_Average(Sno, Gavg) AS
SELECT Sno, AVG(Grade) FROM SC GROUP BY Sno;
```

那么以下更新是无法转换成对基本表 SC 的更新的：

```sql
UPDATE Student_Grade_Average SET Gavg=90 WHERE Sno='2403001';
```

#### 视图的例子

建立信息系选修了一号课程的学生视图：

```sql
CREATE VIEW IS_Student_Who_Selected_Course_01 AS
SELECT Student.Sno, Sname, Grade
FROM Student,
     SC
WHERE Sdept = 'IS'
  AND Cno = '01'
  AND Student.Sno = SC.Sno;
```

建立信息系选修了 01 号课程且成绩在 80 分以上的学生的视图：

```sql
CREATE VIEW IS_Student_Who_Selected_Course_01_And_Earns_Grade_Over_90 AS
SELECT Student.Sno, Sname, Grade
FROM Student,
     SC
WHERE Sdept = 'IS'
  AND Student.Sno = SC.Sno
  AND Grade >= 80;
```

或者，可以在刚才建立的视图 `IS_Student_Who_Selected_Course_01` 上加个 `WHERE` 来解决：

```sql
CREATE VIEW IS_Student_Who_Selected_Course_01_And_Earns_Grade_Over_90 AS
SELECT Sno, Sname, Grade
FROM IS_Student_Who_Selected_Course_01
WHERE Grade >= 80;
```

定义一个反映学生出生年份的视图：

```sql
CREATE VIEW Student_Spawn_Year(Sno, Sname, Sbitrh) AS
SELECT Sno, Sname, 2024-Sage
FROM Student;
```

将学生的学号和他的平均成绩定义为一个视图：

```sql
CREATE VIEW Student_Average_Grade(Sno, Gavg) AS
SELECT Sno, AVG(Grade) FROM SC GROUP BY Sno;
```

定义视图 StudGrade，描述学生的平均成绩、最高成绩、最低成绩等：

```sql
CREATE VIEW StudGrade(Sno, Sname, Gavg, Gmax, Gmin) AS
SELECT Student.Sno, Student.Sname, AVG(SC.Grade), MAX(SC.Grade), MIN(SC.Grade)
FROM Student,
     SC
WHERE Student.Sno = SC.Sno
GROUP BY Student.Sno;
```

基于上述视图 StudGrade 检索学生 ' 张三 ' 的平均成绩：

```sql
SELECT Sname, Gavg FROM StudGrade WHERE Sname='张三';
```

### 断言 ASSERTION

- SQL 中可以使用 `CREATE ASSERTION` 声明断言以指定更具一般性的约束。ASSERTION 可以定义设计多个表或聚集操作的比较复杂的完整性约束。
- 断言创建后，任何对断言中所设计的关系的操作都会触发 DBMS 对断言的检查，任何使断言不为真的操作都会被拒绝执行。

```sql
CREATE ASSERTION <断言名> <CHECK子句>;
```

其中 `<CHECK>子句` 中的约束条件与 WHERE 子句的条件表达式类似。例如：

```sql
CREATE ASSERTION ASSE_SC_DB_NUM
CHECK (60>=(SELECT COUNT(*) FROM Course, SC WHERE SC.Cno=Course.Cno AND Course.Cname='数据库'));
```

上述断言限制了数据库课程最多只能 60 名学生选修。拓展上述例子，改为限制每一门课程最多有 60 人选修：

```sql
CREATE ASSERTION ASSER_SC_NUM
CHECK (60>=(SELECT COUNT(*) FROM SC GROUP BY Cno));
```

![web image](./imgs/index/41b22ce4147a6b085249dce38.png)

删除断言的 SQL 语句：

```sql
DROP ASSERTION <断言名>;
```

:::warning
如果断言很复杂，则 DBMS 检测和维护断言的开支较高，这一点在定义断言时应注意。
:::

### 触发器 Trigger

触发器（Trigger）是用户定义在关系表上的一类由事件驱动的特殊过程，其基于指定时间由服务器自动激活执行。

创建触发器：

```sql
CREATE TRIGGER <触发器名>
    {BEFORE|AFTER} <事件（操作）类型>
    ON <表名>
    FOR EACH {ROW|STATEMENT}
    [WHEN <触发条件>]
    <触发动作子句>
```

删除触发器：

```sql
DROP TRIGGER <触发器名> ON <表名>;
```

其中：

- `<事件（操作）类型>` 包括 `INSERT`，`DELETE`，`UPDATE`
- 触发器类型使用 `{ROW|STATEMENT}` 指定，其中 `ROW` 是行级触发器，`STATEMENT` 是语句级触发器。例如，在有 1000 条记录的表上创建一个 `AFTER UPDATE` 的触发器，再执行一个把整个列都改一遍的 `UPDATE`，若该触发器是语句级触发器，则执行完该语句后触发动作只发生一次；若是行级触发器，则执行了 1000 次。
- `<触发动作子句>` 是一个类似函数的 PL/SQL 过程块

:::info
一个表上可以定义多个触发器，任何操作在表上被执行时，DBMS 会：

- 执行该表上的 BEFORE 触发器
- 执行激活触发器的 SQL 语句
- 执行该表上的 AFTER 触发器

  :::

Example：
定义一个 `BEFORE` 行级触发器，为选课表 SC 定义完整性规则“学生的成绩不得低于 60 分，如果低于 60 分，则自动改成 60 分”：

```sql
CREATE TRIGGER MAKE_SURE_PASS_EXAM
    BEFORE INSERT OR UPDATE ON SC
    FOR EACH ROW
AS
    BEGIN
        IF (new.Grade<60) THEN
            new.Grade=60;
        END IF;
    END;
```

Example：
定义 AFTER 行级触发器，当选课表 SC 中的成绩发生变化后，就自动在成绩变化表 Grade_log 中增加一条相应的记录，其中 Grade_log 的表定义为：
![web image](./imgs/index/41b22ce4147a6b085249dce39.png)

```sql
CREATE TRIGGER LOG_GRADE_CHANGE
    AFTER UPDATE ON SC
    FOR EACH ROW
AS
    BEGIN
        INSERT INTO Grade_log VALUES(new.Sno,old.Grade,new.Grade,CURRENT_USER,CURRENT_TIMESTAMP)
    END;
```

Another Example:
定义一个触发器，用于当删除一个学生基本信息时，也删除该学生的所有选课记录

```sql
CREATE TRIGGER DEL_SC_ON_DEL_STU
    AFTER UODATE ON Student
    FOR EACH ROW
AS
    BEGIN
        DELETE FROM SC
        WHERE SC.Sno=old.Sno;
    END;
```

![web image](./imgs/index/41b22ce4147a6b085249dce3b.png)

![web image](./imgs/index/41b22ce4147a6b085249dce3c.png)

## 数据库安全

数据库安全是指 DBMS 应该保证的数据库的一种特性（机制或手段），能使数据库免受非法、非授权用户的使用、泄露和破坏。数据库安全的设计目标是使破坏数据库系统所花费的代价远大于获得的利益。

数据库安全的基本机制：

- 身份认证（用户标识和鉴定）：系统提供的最外层安全保护，提供一定的方式让用户标识自己的身份，一般是用户标识 + 口令
- 存取（访问）控制：定义用户权限，用户访问数据时根据用户身份检查权限。用户权限定义和权限检查机制一起组成了 DBMS 的安全子系统
- 视图 View
- 审计
- 密码存储

### 强制存取控制（MAC）

保证高程度的安全，适用于对数据有严格而固定密级分类的部门。

组成：

- 主体：系统中的活动实体，DBMS 所管理的实际用户或代表用户的进程
- 客体：系统中的被动实体，是受主体操纵的数据库对象，例如存储文件、基本表、索引、视图等。
- 敏感度标记
  - 绝密（top secret）、机密（secret）、可信（confidential）、公开（public）
  - 主题的敏感度标记称为**许可证级别**（clearance level）
  - 客体蜜柑都标记称为 **密级**（classification level）

规则：

- 仅当主体许可证级别 **大于等于** 客体密级时，该主体才能 **读** 相应的客体。
- 仅当主体许可证级别 **等于** 客体密级时，该主体才能 **写** 相应的客体。

### 自主存取控制（GRANT、REVOKE 和 DENY）

用户权限组成：

- 数据对象（参照前文中的数据对象）
- 操作类型

![web image](./imgs/index/41b22ce4147a6b085249dce2c.png)

存取权限的定义称为授权，SQL 语句中的 `GRANT` 和 `REVOKE` 支持自主存取控制权的实现。可以授予权限的主体包括：

- DBA
- 数据库对象创建者
- 拥有权限的用户

#### GRANT 授予权

语法：

```sql
GRANT <权限> [,<权限>...]
[ON <对象类型> <对象名>]
TO <用户> [,<用户>...]
[WITH GRANT OPTION];
```

其中，`<用户> [,<用户>...]` 可以是一个或多个具体的名称，也可以是 `PUBLIC` 表示全体用户。
`WITH GRANT OPTION` 是授权选项，用户可以把当前接收的操作权限再次授予其他用户，使其拥有传播该权限的能力：
![web image](./imgs/index/41b22ce4147a6b085249dce2d.png)

例如，把查询 Student 表的权限授权给用户 U1：

```sql
GRANT SELECT ON TABLE Student TO U1;
```

把对 Student 表和 Course 表的全部权限授予用户 U2 和 U3：

```sql
GRANT ALL PRIVILIGES ON TABLE Student, Course TO U2, U3;
```

把对标 SC 的查询权限授权给所有用户：

```sql
GRANT SELECT ON TABLE SC TO PUBLIC;
```

将查询 Student 表和修改学生学号的全西安授权给用户 U4：

```sql
GRANT UPDATE(Sno), SELECT
ON TABLE Student
TO U4;
```

:::warning
对属性列授权的时候须指明相应属性的列名。这样权限就会变成列上的，而不是整个表上的。
:::

将对表 SC 的 INSERT 权限授予给 U5，并允许他将该权限授予其他用户：

```
GRANT INSERT ON SC TO U5 WITH GRANT OPTION;
```

#### REVOKE 撤销已授予的权限

能够 REVOKE 权限的人：

- DBA
- 授权者

语法：

```sql
REVOKE <权限> [,<权限>...]
[ON <对象类型> <对象名>]
FROM <用户> [,<用户>...]
[CASCADE];
```

基本使用起来和 GRANT 是一样的，相当于逆过程。`CASCADE` 关键字是级联收回，会将被收回权限的用户授权出去的其他用户的该权限也一并收回。

#### DENY 拒绝权限

场景：
![web image](./imgs/index/41b22ce4147a6b085249dce2e.png)

上图中出现的多途径授权，由于用户可以从多个途径继承同一个操作权限，这使得当需要禁止该权限的时候也必须从多个途径进行取消，这个过程比较繁琐。

语法：

```
DENY <权限> [,<权限>...]
[ON <对象类型> <对象名>]
TO <用户> [,<用户>...];
```

#### 数据库角色

场景：数据库有 114514 张表，存在 1.14514e6 个用户，逐一对用户授权的操作显然并不高效。

方法：使用数据库角色，可以理解为用户组权限，是被命名的一组与数据库操作相关的权限。这样直接将用户添加到这个角色就可以简化授权过程。

- 角色是权限的集合
- 可以为一组具有相同权限的用户创建一个角色

语法：创建角色

```sql
CREATE ROLE <角色名>
```

语法：给角色授权

```sql
GRANT <权限> [,<权限>...]
[ON <对象类型> <对象名>]
TO <角色> [,<角色>...];
```

语法：将一个角色授权给其他角色或用户：

```sql
GRANT <角色1> [,<角色2>...]
TO <角色3> [,<用户1>...]
[WITH GRANT OPTION];
```

语法：角色权限收回：

```sql
REVOKE <权限> [,<权限>...]
ON <对象类型> <对象名>
FROM <角色> [,<角色>...];
```

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce2f.png)

登录用户与数据库用户的关系：
![web image](./imgs/index/41b22ce4147a6b085249dce30.png)

#### VIEW 在数据库安全中的作用

视图限定了用户查看数据的视角，并将某些列/属性对用户隐藏，与权限管理结合使用能够对数据提供一定程度的安全保护。

![web image](./imgs/index/41b22ce4147a6b085249dce31.png)

#### 审计日志 Audit Log

审计日志会记录用户对数据库所有的操作记录，DBA 可以利用审计日志，找出非法存取数据的人、时间和内容。

审计类型：

- 用户级审计
  - 针对自己创建的数据库表或视图进行审计
  - 记录所有用户对这些表或视图的成功或不成功的访问请求，及各种类型的 SQL 操作
- 系统级审计
  - 检测成功或失败的登录请求
  - 检测 GRANT 和 REVOKE 操作以及其它数据据权限下的操作

为表增加审计功能：

```sql
AUDIT <权限> ON <表名>;
```

为表取消审计功能：

```sql
NOAUDIT <权限> ON <表名>;
```

Example:

```sql
AUDIT ALTER, UPDATE ON SC;
NOAUDIT ALTER, UPDATE On SC;
```

## 关系范式和模式分解

关系模式（比如，表）的属性之间存在关联，其不会因数据样本的改变而发生变化，比如，在 student 表中，学号和性别之间存在对应关系，若学号确定，则该学号对应的学生的性别也确定，也就是**存在学号与性别之间的决定关系**，这种属性之间的决定与被决定关系称为**数据依赖**，数据依赖是数据库模式设计与评价的关键。

- 一个关系内部属性与属性的约束
- 显示世界属性之间相互联系的抽象
- 数据的内在性质
- 语义的体现

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce43.png)
分析上述关系：

- 系和学生之间存在多对一关系
- 系与系主任之间存在一对一关系
- 学生与课之间存在多对多关系
- 学生与每门课成绩之间存在一对一关系

|                                模式 1                                |                                模式 2                                |
| :------------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![web image](./imgs/index/41b22ce4147a6b085249dce44.png) | ![web image](./imgs/index/41b22ce4147a6b085249dce45.png) |

上述两个模式的区别的根本原因：

对于模式 1，数据依赖 $F$ 是：

$$
\begin{align}
F = \{ & Sno\to Sdept,\\
& Sdept \to Mname\\
& (Sno,Cname)\to Grade
\}
\end{align}
$$

![web image](./imgs/index/41b22ce4147a6b085249dce46.png)

对于模式 2，数据依赖 $F$ 是：

$$
\begin{align}
F1 =& \{Sno\to Sdept\}\\
F2 =& \{(Cno,Cname)\to Grade\}\\
F3 =& \{Sdept\to Mname\}\\
\end{align}
$$

![web image](./imgs/index/41b22ce4147a6b085249dce47.png)

### 关系和关系规范化

采用关系模式分解等措施，消除关系模式中不合适的数据依赖，解决插入删除更新异常和数据冗余等问题。

- 数据冗余：同一门课程由 n 个学生选修，" 学分 " 就重复 n-1 次；同一个学生选修了 m 门课程，姓名和年龄就重复了 m-1 次。
- 更新异常：若调整了某门课程的学分，数据表中所有行的 " 学分 " 值都要更新，否则会出现同一门课程学分不同的情况。
- 插入异常：假设要开设一门新的课程，暂时还没有人选修。这样，由于还没有 " 学号 " 关键字，课程名称和学分也无法记录入数据库。
- 删除异常：假设一批学生已经完成课程的选修，这些选修记录就应该从数据库表中删除。但是，与此同时，课程名称和学分信息也被删除了。很显然，这也会导致插入异常。

关系模式 $R(U,D,DOM,F)$ 简化为三元组 $R(U,F)$，当且仅当 $U$ 上的一个关系 $r$ 满足 $F$ 时，$r$ 称为关系模式 $R(U,F)$ 的一个关系。

数据依赖的类型：

- 函数依赖（Functional Dependency, FD）
- 多值依赖（Multi-Valued Dependency, MVD）
- 连接依赖

#### 函数依赖

设 $R(U)$ 是属性集 $U$ 上的关系模式，$X$ 和 $Y$ 是 $U$ 的子集。若对于 R(U) 的任意一个可能的关系 $r$，$r$ 中不可能存在两个元素在 $X$ 上的属性值相等，而在 $Y$ 上的属性值不等，则称 **“X 函数确定 Y”**或**“Y 函数依赖于 X”**，记作 $X\to Y$。若 $Y$ 不依赖于函数 $X$，则记作 $X\nrightarrow Y$。若 $X\to Y$ 且 $Y\to X$，则记作 $X\leftrightarrow Y$；

省流：即 $Y=F(X)$，$X,Y$ 之间是一对一或多对一的关系，则称 $X\to Y$

关键概念：

- 决定属性（因素）：若 $X\to Y$，则 $X$ 称为这个函数依赖的决定属性（组），或决定性因素。
- 平凡/非平凡函数依赖：给定关系模式 $R(U)$，$X$ 和 $Y$ 是 $U$ 的子集，若 $X\to Y$，且：
  - $Y\not\subseteq X$，则称 $X\to Y$ 是非平凡的函数依赖
  - 若 $X\to Y$ 且 $Y\subseteq X$，则称 $X\to Y$ 是平凡的函数依赖
- 完全函数依赖与部分函数依赖：给定关系模式 $R(U,F)$，$X\to Y \in F$
  - 若 $X' \subsetneq X$，且对于任意 $X'$ 均有 $X'\nrightarrow Y$，则称 $Y$ 对 $X$ 完全函数依赖，记作 $X\mathop\{\rightarrow\}^\{\mathop\{F\}\}Y$。
  - 反之，若存在 $X' \subseteq X$，且 $X'\to Y$，则称 $Y$ 不完全函数依赖于 $X$，或 $Y$ 对 $X$ 部分函数依赖，记作 $X\mathop\{\rightarrow\}^\{\mathop{P}\}Y$。
- 传递函数依赖：给定关系模式 $R(U,F)$，$X\to Y \in F$，
  - 若 $Y\nsubseteq X, Y\nrightarrow X$，并且 $Y\to Z, Z\nsubseteq Y$，则称 $Z$ 对 $X$ 传递函数依赖，记为 $X\mathop\{\rightarrow\}^\{\mathop{传递}\}Z$
  - 若 $X\to Y$ 且 $Y\to X$，则有 $X\leftrightarrow Y$，则称 $Z$ 直接依赖于 $X$。

Example：

![web image](./imgs/index/41b22ce4147a6b085249dce4b.png)

Example：
给定关系 $SC(Sno,Cno,Grade)$ 中：

- 非平凡函数依赖： $(Sno,Cno)\to Grade$
- 平凡函数依赖：$(Sno,Cno)\to Sno$ 和 $(Sno,Cno)\to Cno$
- 完全函数依赖：$(Sno,Cno)\mathop\{\rightarrow\}^\{\mathop\{F\}\} Grade$
- 部分依赖函数：$(Sno,Cno)\mathop\{\rightarrow\}^\{\mathop\{F\}\} Sdept$

Example：
给定关系 $STD(Sno,Sdept,Mname)$ 中， $Sno\to Sdept$，$Sdept\to Mname$，所以有 $Sno\mathop\{\rightarrow\}^\{\mathop\{传递\}\} Mname$

![web image](./imgs/index/41b22ce4147a6b085249dce50.jpg)
![web image](./imgs/index/41b22ce4147a6b085249dce51.jpg)
![web image](./imgs/index/41b22ce4147a6b085249dce52.jpg)

#### 多值依赖

设 $R(U)$ 是属性集 $U$ 上的一个关系模式。$X,Y,Z$ 是 $U$ 的子集，并且 $Z=U-X-Y$。关系 $R(U)$ 中多值依赖 $X\twoheadrightarrow Y$ 成立，当且仅当对 $R(U)$ 的任一关系 $r$，给定的一对 $(x,z)$ 值，有一组 $Y$ 的值，这组值仅仅决定于 $x$ 的值而与 $z$ 值无关。

- 若 $X\twoheadrightarrow Y$，且 $Z$ 为空集（$Z=\varphi$），则称 $X\twoheadrightarrow Y$ 是平凡的多值依赖
- 否则称 $X\twoheadrightarrow Y$ 为非平凡的多值依赖

![web image](./imgs/index/41b22ce4147a6b085249dce60.png)
![web image](./imgs/index/41b22ce4147a6b085249dce61.png)
![web image](./imgs/index/41b22ce4147a6b085249dce62.png)

多值依赖的等价的形式化定义：在 $R(U)$ 的任意关系 $r$ 中，如果存在元组 $t,s$ 使得 $t[X]=s[X]$，那么就必然存在元组 $w,v\in r$（$w,v$ 可与 $s,t$ 相同），使得 $w[X]=v[X]=t[X]$，且 $w[Y]=t[Y]$，$w[Z]=s[Z]$，$v[Y]=s[Y]$，$v[Z]=t[Z]$（即交换 $s,t$ 元组的 $Y$ 值所得的两个新元组必定在 $r$ 中），则 $Y$ 多值依赖于 $X$，记为 $X \twoheadrightarrow Y$。这里，$X,Y\subseteq U, Z=U-X-Y$。

直观地讲，对于 $X$ 的给定值，$Y$ 有一组（0 个或 n 个）值与之对应，且这组 $Y$ 值不以任何方式与 $U-X-Y$ 中的属性值相关，则有 $X \twoheadrightarrow Y$。
:::info
函数依赖是多值依赖的特例。若 $X\to Y$，则 $X \twoheadrightarrow Y$。函数依赖规定某些元组不能出现在关系中，也称为相等产生依赖；多值依赖要求某种形式的其它元组必须在关系中，称为元组产生依赖。
函数依赖和多值依赖的一个区别是：

- 若函数依赖 $X\to Y$ 在 $R(U)$ 上成立，则对于任何 $Y'\subset Y$ 均有 $X\to Y'$ 成立
- 多值依赖 $X \twoheadrightarrow Y$ 若在 $R(U)$ 上成立，不能断言对任何 $Y'\subset Y$ 有 $X\twoheadrightarrow Y'$ 成立。

  :::

多值依赖的性质：

- 对称性：若 $X \twoheadrightarrow Y$，则 $X \twoheadrightarrow Z$，其中 $Z=U-X-Y$
- 传递性：若 $X \twoheadrightarrow Y$，且 $Y \twoheadrightarrow Z$，则 $X \twoheadrightarrow Z-Y$
- 函数依赖是多值依赖的特例。若 $X\to Y$，则 $X \twoheadrightarrow Y$。
- 若 $X \twoheadrightarrow Y$，$X \twoheadrightarrow Z$，则 $X \twoheadrightarrow Y \cup Z$
- 若 $X \twoheadrightarrow Y$，$X \twoheadrightarrow Z$，则 $X \twoheadrightarrow Y \cap Z$
- 若 $X \twoheadrightarrow Y$，且 $X \twoheadrightarrow Z$，则 $X \twoheadrightarrow Y-Z$，$X \twoheadrightarrow Z-Y$

Example：例: 设关系模式 R(A,B,C) 上有一个 MVD $A \twoheadrightarrow B$,如果 $R$ 中已有 $(a,b1,c1),(a,b2,c2),(a,b3,c3)$,那么这些关系中至少还应该存在 6 个元组：

$$
\begin{align}
(a,b1,c2)\\
(a,b1,c3)\\
(a,b2,c1)\\
(a,b2,c3)\\
(a,b3,c1)\\
(a,b3,c2)
\end{align}
$$

上述例子是多值依赖对称性的例子，题目描述有 $A \twoheadrightarrow B$，因此根据对称性有 $A \twoheadrightarrow C$，其中 $C=U-A-B$。

Another Example：
![web image](./imgs/index/41b22ce4147a6b085249dce63.png)

#### 候选码，主码，外码

- 给定关系模式 $R\<U,F\>$，若 $K\subseteq U$，且 $K\mathop\{\rightarrow\}^\{\mathop\{F\}\} U$，则称 $K$ 为 $R$ 的候选码（Candidate Key）
- 若候选码多于一个，则选定其中一个作为主码（Primary Key）
- 若整个属性组 $U$ 是码，则主码也称为全码（All-key）
- 包含在任何一个候选码中的属性称为主属性（Primary Attribute）
- 不包含任何码中的属性称为非主属性或非码属性
- 给定关系模式 $R(U_1,F_1)$ 和 $S(U_2,F_2)$，若 $X\subseteq U_1, X\subseteq U_2$，且 $X\nrightarrow U_1, X\mathop\{\rightarrow\}^\{\mathop\{F\}\} U_2$，则称 $X$ 是 $R$ 的外部码（Foreign Key），简称外码。主码与外码一起建立了关系间的联系表示。![web image](./imgs/index/41b22ce4147a6b085249dce4c.png)

Example：设有关系 $R(A,B,C,D,E,G)$，$F=\{A\to B,B\to C, AD\to G, D\to E\}$。求候选码步骤：

- 在函数依赖中将只在左边的和右边的找出来
  - 在左边的：$A,B,D$
  - 在右边的：$B,C,G,E$
  - 两者中重复的：$B$
  - 只在左边的：$A,D$
  - 只在右边的：$C,G,E$
- 观察只在左边的 $A,D$，验证 $A,D$ 的闭包是否能推出所有的其他属性，或者说其他属性是否都依赖于这俩：
  - $A\to B$
  - $B\to C$ 所以 $A\to C$
  - $AD\to G$
  - $D\to E$
  - 所以 $A,D$ 能推出所有其他属性，所以候选码是 $A,D$。x

Example:
![web image](./imgs/index/41b22ce4147a6b085249dce5a.png)
码是 $(S,J)$、$(J,P)$

### 范式（Normal Form，NF）

范式是符合预设规则的关系模式的集合，关系数据库中的关系必须属于某一范式。

![web image](./imgs/index/41b22ce4147a6b085249dce4d.png)

若关系模式 $R$ 符合第 $n$ 范式的约定规则，则可以表示为 $R\in nNF$。

#### 第一范式（1NF）：无重复的原子性的列

强调属性的原子性约束，要求属性具有原子性，不可再分解。

![web image](./imgs/index/41b22ce4147a6b085249dce4f.png)

![web image](./imgs/index/41b22ce4147a6b085249dce4e.png)

第一范式存在问题：冗余度大、会引起修改操作的不一致性、数据插入异常、数据删除异常。

:::info
将一个 1NF 关系分解为多个 2NF 关系可以解决这些问题。
![web image](./imgs/index/41b22ce4147a6b085249dce5d.png)
左图: 分解前; 右图: 分解后.
:::

#### 第二范式（2NF）：属性完全函数依赖于码（拆多表）

若 $R\in 1NF$，且每一个非主属性**完全函数依赖**于码，则 $R\in 2NF$。

第二范式消除了非主属性对候选键的部分依赖，确保表中的每列都和主键相关。如果不满足第二范式，可以拆多个表。一个数据库表中只能保存一种数据，不可以把多种数据保存在同一张数据库表中。

第二范式，强调记录的唯一性约束，数据表必须有一个主键，并且没有包含在主键中的列必须完全依赖于主键，而不能只依赖于主键的一部分。例如：![web image](./imgs/index/41b22ce4147a6b085249dce5e.png)
订单表和商品表不能设计在一张表里，应该分开两个表，再加一个多对多的商品 id 和订单 id 关联表。（一个表只描述一件事情）。

第二范式（2NF）是在第一范式（1NF）的基础上建立起来的，即满足第二范式（2NF）必须先满足第一范式（1NF）。第二范式（2NF）要求数据库表中的每个实例或行必须可以被惟一地区分。为实现区分通常需要为表加上一个列，以存储各个实例的惟一标识。这个惟一属性列被称为主关键字或主键、主码。

:::info
所有单键的数据库表都符合第二范式，因为不可能存在组合键
:::

Another Example：
![web image](./imgs/index/41b22ce4147a6b085249dce53.png)

#### 第三范式（3NF）：属性不依赖于其它非主属性（在 2NF 的基础上加外键）

关系模式 $R\<U,F\>$ 中若不存在这样的码 $X$，属性组 $Y$ 以及非主属性 $Z(Z\nsubseteq Y)$ 使得 $X\to Y, Y\to Z$ 成立，且 $Y\not\to X$，则称 $R\<U,F\>\in 3NF$

第三范式要求表中的每一列只与主键直接相关而不是间接相关。如果关系模式 R 是第二范式，且每个非主属性都不传递依赖于 R 的候选键，则称 R 为第三范式模式。满足第三范式（3NF）必须先满足第二范式（2NF）。

例如：订单表中的用户信息不直接设计字段，设计一个用户 id 字段再外键关联用户表。
![web image](./imgs/index/41b22ce4147a6b085249dce5f.png)
上图中订单表中需要有客户相关信息，在分离出客户表之后，订单表中只需要有一个用户 id 即可（外键），而不能有其他的客户信息。因为其他的客户信息直接关联于用户 id，而不是直接与订单 id 直接关。

Another Example:
![web image](./imgs/index/41b22ce4147a6b085249dce56.png)
![web image](./imgs/index/41b22ce4147a6b085249dce57.png)

Another Example: 存在一个部门信息表，其中每个部门有部门编号（dept_id）、部门名称、部门简介等信息。那么在的员工信息表中列出部门编号后就不能再将部门名称、部门简介等与部门有关的信息再加入员工信息表中。如果不存在部门信息表，则根据第三范式（3NF）也应该构建它，否则就会有大量的数据冗余。

:::info
注意：三大范式只是一般设计数据库的基本理念，可以建立冗余较小、结构合理的数据库。如果有特殊情况，当然要特殊对待，数据库设计最重要的是看需求跟性能，需求>性能>表结构。所以不能一味的去追求范式建立数据库。
:::

#### 修正的第三范式（BCNF）：每一个函数依赖的决定属性都包含码（排除了任何属性的传递依赖）

关系模式 $R\<U,F\>\in 1NF$，对 $F$ 中的每一个非平凡函数依赖 $X\to Y (Y\nsubseteq X)$，若 $X$ 必须包含码，则 $R\<U,F\>\in BCNF$。

BCNF 只是在 3NF 的基础上略微做了修改：BCNF 要求若存在对于属性或属性组 A→ 属性 B，那么 A 必须包含码，也就是 BCNF 排除了任何属性的传递依赖和部分依赖。因为 2NF 排除的是非主属性的部分依赖，3NF 排除的是非主属性的传递依赖，到了 BCNF，将非主属性提升为任一属性。

若 $R\in BCNF$

- $R$ 中所有非主属性对每一个码都是完全函数依赖
- $R$ 中所有主属性对每一个不包含它的码。也是完全函数依赖
- $R$ 中不存任何属性完全函数依赖于非码的一组属性

:::info
若 $R\in BCNF$，则有 $R\in 3NF$，反之不成立。
:::

Example:
![web image](./imgs/index/41b22ce4147a6b085249dce5b.png)

![web image](./imgs/index/41b22ce4147a6b085249dce95.png)

#### 第四范式（4NF）：限制多值依赖

定义：关系模式 $R\<U,F\>\in 1NF$，如果对于 $R$ 的每个非平凡多值依赖 $X\twoheadrightarrow Y(Y\nsubseteq X)$，$X$ 都含有码，则 $R\in 4NF$。

第四范式不允许有非平凡且非函数依赖的多值依赖，允许非平凡多值依赖是函数依赖。若关系模式 $R$ 是 BCNF，并且不包含多值依赖关系，则这种关系模式就是第四范式模式。

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce65.png)
![web image](./imgs/index/41b22ce4147a6b085249dce66.png)
![web image](./imgs/index/41b22ce4147a6b085249dce64.png)

### 规范化

通过模式分解等方法，将一个属于低级别范式的关系模式转换为若干个属于高级别范式的关系模式的集合，这种过程称为规范化

#### Armstrong 公理系统

Armstrong 公理系统是数据依赖的公理系统
![web image](./imgs/index/41b22ce4147a6b085249dce67.png)

关系模式 $R\<U,F\>$ 有以下的推理规则（Armstrong 公理系统）：

- 自反律（Reflexivity）：若 $Y\subseteq X \subseteq U$，则 $X\to Y$ 为 $F$ 所蕴含。
- 增广律（Augmentation）：若 $X\to Y$ 为 $F$ 所蕴含，且 $Z\subseteq U$，则 $XZ\to YZ$ 为 $F$ 所蕴含。
- 传递律（Transitivity）：若 $X\to Y$ 及 $Y\to Z$ 为 $F$ 所蕴含，则 $X\to Z$ 为 $F$ 所蕴含。

根据 Armstrong 公理系统可以获得三条推理规则：

- 合并规则：由 $X\to Y, X\to Z$，有 $X\to YZ$
- 伪传递规则：由 $X\to Y, WY\to Z$，有 $XW\to Z$
- 分解规则：由 $X\to Y, Z\subseteq Y$，有 $X\to Z$
- 合并规则和分解规则的引理：$X\to A_1,A_2,...A_k$ 成立的充分必要条件是 $X\to A_i\ (i=1,2,...,k)$ 成立

Armstrong 公里系统是有效的、完备的：

- 有效性：由 $F$ 触发根据 Armstrong 公里推导出来的每一个函数依赖一定在 $F^+$ 中
- 完备性：$F^+$ 中的每一个函数依赖必定可以由 $F$ 出发根据 Armstrong 公理推导出来。

#### 属性集关于函数依赖集的闭包

判定一个函数依赖是否为函数依赖集 $F$ 所逻辑蕴含的思路有两个：

1. 根据公理和定理进行推导
2. 预先求出所有为 $F$ 所逻辑蕴含的函数依赖集合，判定元素和集合的包含关系。

关系模式 $R\<U,F\>$ 中为 $F$ 所逻辑蕴含的函数依赖的全体叫做 $F$ 的闭包，记为 $F^+$。

![web image](./imgs/index/41b22ce4147a6b085249dce68.png)

此时可以将问题转化，将求关系模式中函数依赖的闭包即将判定 $X\to Y$ 是否能由 $F$ 根据 Armstrong 公理推导出的问题转化为求出 $X_F^+$ 并判定是否 $Y\subseteq X_F^+$ 的问题，这是因为设 $F$ 为属性集 $U$ 上的一组函数依赖，$X\subseteq U$，且 $Y\subseteq U$，则 $X\to Y$ 能由 $F$ 根据 Armstrong 公理导出的充分必要条件是 $Y\subseteq X_F^+$。

其中 $X_F^+$ 称为属性集 $X$ 关于函数依赖集 $F$ 的闭包，其定义为：设 $F$ 为属性集 $U$ 上的一组函数依赖，$X\subseteq U$，$X_F^+ = \{A|X\to A 能由 F 根据 Armstrong 公里导出\}$。

![web image](./imgs/index/41b22ce4147a6b085249dce69.png)
Example:
![web image](./imgs/index/41b22ce4147a6b085249dce6a.png)

#### 极小函数依赖集

若函数依赖集 $F$ 同时满足下列条件，则 $F$ 是一个极小函数依赖集（也称最小依赖集、最小覆盖）：

1. $F$ 中任一函数依赖的右部仅含有一个属性
2. $F$ 中不存在这样的函数依赖 $X\to A$ 使得 $F$ 与 $F-\{X\to A\}$ 等价
3. $F$ 中不存在这样的函数依赖 $X\to A$，有 $Z\subset X$ 使得 $F-\{X\to A\}\cup \{Z\to A\}$ 与 $F$ 等价

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce6c.png)

定理：每一个函数依赖集 $F$ 均等价于一个极小函数依赖集 $F_m$。
$F_m$ 的构造过程：

- 被决定因素最小化（把右侧全拆到只有一个属性）：逐一检查 $F$ 中各函数依赖 $FD_i$：$X\to Y$，若 $Y=A_1A_2...A_k, k\geq2$，则用函数依赖集合 $\{X\to A_j | j=1,2,...,k\}$ 取代 $X\to Y$。
- 决定因素最小化（左侧去掉后能从剩下的推出来去掉的一项的就真的去掉）：逐一取出 $F$ 中各函数依赖 $FD_i$：$X\to A$，设 $X=B_1B_2...B_m$，逐一考察 $B_i\ (i=1,2,...,m)$，若 $B_i\in (X-B_i)_F^+$，则以 $X-B_i$ 取代 $X$。
- 函数依赖数目最小化（把能用其他依赖退出来的函数依赖去掉）：逐一检查 $F$ 中各个函数依赖 $FD_i$：$X\to A$，令 $G=F-\{X\to A\}$，若 $A\in X_G^+$，则从 $F$ 中去除此函数依赖。

![web image](./imgs/index/41b22ce4147a6b085249dce6d.png)

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce6e.png)

![web image](./imgs/index/41b22ce4147a6b085249dce6f.png)

#### 模式分解

模式分解是将第一级的关系模式分解为若干个高一级的关系模式，其方法不是唯一的，只需要保证分解后的关系模式与原关系模式等价（分解后数据是可还原的，函数依赖是依然存在的），即模式分解保持函数依赖和无损连接性。

- 分解的无损连接性指的是给定关系模式 $R\<U,F\>$ 的一个分解 $\rho=\{R_1\<U_1,F_1\>,R_2\<U_2,F_2\>,...,R_n\<U_n,F_n\>\}$，$R$ 与 $R_1,R_2,...,R_n$ 的自然连接结果相等。分解的无损连接性保证了信息不会在关系分解的过程中丢失。
- 保持函数依赖指的是给定关系模式 $R\<U,F\>$ 的一个分解 $\rho=\{R_1\<U_1,F_1\>,R_2\<U_2,F_2\>,...,R_n\<U_n,F_n\>\}$，其中 $F_i$ 是 $F$ 在 $U_i$ 伤的投影，若 $F$ 所逻辑蕴含的函数也一定由某个 $F_i$ 所蕴含，则该分解是保持函数依赖的。

需要注意的是，无损连接和保持函数依赖是两个独立的标准，保持无损连接不一定代表着该分解保持函数依赖；同理，保持函数依赖也不一定代表着该分解是无损连接的。

:::info

- 若要求保持函数依赖，那么模式分解一定能够达到 3NF，但不一定能够达到 BCNF
- 若分解既具有无损连接性又保持函数依赖，则模式分解一定能够达到 3NF，但不一定能够达到 BCNF
- 若要求分解只具有无损连接性，那么模式分解一定能够达到 4NF

  :::

##### 无损连接分解为 BCNF 的算法

![web image](./imgs/index/41b22ce4147a6b085249dce70.png)

##### 保持函数依赖分解为 3NF 的算法

![web image](./imgs/index/41b22ce4147a6b085249dce71.png)

Example:
![web image](./imgs/index/41b22ce4147a6b085249dce72.png)

##### 既保持依赖又无损连接的分解方法

![web image](./imgs/index/41b22ce4147a6b085249dce73.png)

Example:
![web image](./imgs/index/41b22ce4147a6b085249dce74.png)

#### 消除传递依赖

![web image](./imgs/index/41b22ce4147a6b085249dce54.png)
![web image](./imgs/index/41b22ce4147a6b085249dce55.png)

Example:
![web image](./imgs/index/41b22ce4147a6b085249dce58.png)

根据描述有三个函数依赖：

$$
\begin{align}
(商店编号,商品编号)\to 部门编号\\
(商店编号,部门编号)\to 负责人\\
(商店编号,商品编号)\to 数量\\
\end{align}
$$

$R$ 的候选码：$A,B$。关系达到了 $2NF$，因为 $R$ 中存在着非主属性 " 负责人 " 对候选码（" 商店编号，商品编号 "）的传递函数依赖，所以不属于 $3NF$。要达到 $3NF$ 需要将 $R$ 分解为：

$$
\begin{align}
R_{1}(商店编号，商品编号，数量，部门编号) \\
R_{2}(商店编号，部门编号，负责人)
\end{align}
$$

![web image](./imgs/index/41b22ce4147a6b085249dce59.png)

## 数据库设计

要解决的问题：

- 如何将现实问题转换为数据库解：概念结构设计、逻辑结构设计
- 如何存储需要的设计：物理结构设计
- 如何为用户提供接口：应用系统设计

其中需求分析和概念结构设计独立于 DBMS，而逻辑结构设计和物理结构设计则与 DBMS 有关。

常用的设计方法：

- 新奥尔良方法：将数据库设计分为若干个阶段和步骤
- 基于 E-R 图的数据库设计方法
- 3NF 第三范式设计方法
- OLD(Object Definition Language) 设计方法

### 数据抽象方法

| 类别 |                   描述                   |                                 图例                                 |
| :--: | :--------------------------------------: | :------------------------------------------------------------------: |
| 分类 | 将某一概念定义为现实世界中一组对象的类型 | ![web image](./imgs/index/41b22ce4147a6b085249dce75.png) |
| 聚集 |          定义某一类型的组成成分          | ![web image](./imgs/index/41b22ce4147a6b085249dce76.png) |
| 概括 |        定义类型之间的一种子集联系        | ![web image](./imgs/index/41b22ce4147a6b085249dce77.png) |

### 基于 E-R 图的设计方法

E-R 图最终反应数据库的概念结构模型，主要考虑

- 如何将实体型和实体之间的联系转换为关系模式
- 如何确定这些关系模式的属性和码

例如：
![web image](./imgs/index/41b22ce4147a6b085249dce78.png)
![web image](./imgs/index/41b22ce4147a6b085249dce79.png)

:::info
实体之间的联系在数据库中一般会表示为外码。
:::

#### 实体（型）的转换规则

![web image](./imgs/index/41b22ce4147a6b085249dce82.png)

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce83.png)

实体转换的时候不会产生外码

```
Star(name,address)
Movies(title,year,length,genre)
Studios(name,address)
```

联系转换的时候会产生外码

多对多的联系

```
Star-in(Star.name,Mivie.title,Movie.year)
```

要进行关系最小化时，多对多联系不能并入任何实体。

一对多的联系

```
Owns(Studio.name,Movies.title,Movies.year)
```

如果要关系最小化时，一对多的联系要并到多的那一端

比如，进行关系最小化，可以将 `Owns` 并入 `Movies`：

```
Movies(title,year,length,genre,Studios.name)
```

其中，`Studios.name` 是外码，一般用波浪线标识。

## 关系查询处理和优化

DBMS 处理查询的步骤：

1. 查询分析：对查询的语句进行扫描，进行词法分析和语法分析；检查语法正确性和符号正确性。
2. 查询检查：合法性检查（如关系名、属性名是否存在）、视图转换（将对视图的操作转换到对基本表的操作）、安全性和完整性检查。
3. 查询优化：代数优化和逻辑优化，查询优化的选择依据包含基于规则、基于代价、基于语义三种。
4. 查询执行：生成执行计划、由代码生成器生成查询代码并执行。

### 选择操作的实现及其优化

选择操作的实现：

- 全表扫描法（Table Scan）：适合整个表的记录都有可能符合查询条件的情况。适合小表，不适合大表。
- 索引扫描法（Index Scan）：适合选择条件中的属性上有建立索引（比如 B+ 树或 Hash 索引）的情况。通过索引直接找到满足条件的元组的指针，通过指针直接去基本表拿到对应元素。

选择操作的优化：

- 对于等于号的条件选择（例如 `...WHERE Sno='10086'`）：在对应属性（`Sno`）上建立（散列）索引。
- 对于范围选择（例如 `Sage>24`）：在对应属性（`Sage`）上建立索引之后查询的时候就是用 B+ 树查询了。
- 符合两个条件的选择（例如 `...WHERE Sdept='CS' AND Sage>20`）：在两个属性列上分别建立索引；
  - 方法 1：分别查找满足这两个条件的指针，再求这两组结果的交集
  - 方法 2：先查找满足第一个条件的，再在结果上查找满足第二个条件的

### 连接操作的实现和优化

连接操作的实现（这里只讨论自然连接最常用的实现方法），以查询 `SELECT * FROM Student, SC WHERE Student.Sno=SC.Sno` 为例：

- 嵌套循环法（nested loop join）：对于外层循环（`Student` 表）的每个元组，检索内层循环（`SC` 表）中的每个元组，看在连接属性（`Sno`）上是否相等。
- 排序 - 合并法（sort-merge join，或 merge join）：如果要连接的两个表没有排序，先按照连接属性（`Sno`）对两个表排序，然后取第一个表（`Student` 表）中的第一个（`Sno`），按顺序依次扫描第二个表（`SC` 表）中具有相同（`Sno`）的元组，直到找到不同的（`Sno`），再返回第一个表（`Student` 表）中再选下一个（`Sno`）执行相同的操作，直到第一个表被扫描完。
- 索引连接法（index join）：在第二个表（`SC` 表）上要进行连接的列（`Sno`）上建立索引；对于第一个表（`Student` 表）中的每一个元组，由其（`Sno`）列的值索引查找在第二个表（`SC` 表）上对应列的值；重复执行上述步骤直到第一个表（`Student` 表）被处理完。
- Hash Join 法：把连接属性（`Sno`）作为 hash 码，用同一个 hash 函数将两个表 （`Student` 表和 `SC` 表）中的元素散列到 hash 表中。第一阶段（划分阶段）将较小的表（如 `Student` 表）的元组按 hash 函数分散到 hash 桶中；第二阶段（连接阶段）将较大的表（如 `SC` 表）中的元组也按照同一个 hash 函数进行散列，将该表（`SC` 表）与桶中来自另一个表（`Student` 表）的与之匹配的元组进行连接。能进行 Hash Join 连接的前提是两个表中较小的表在划分阶段可以完全放入 Hash 桶中。

### 基于关系代数的优化

为什么能优化：

- 数据库的 IO 操作存在瓶颈，计算查询代价时，一般用查询处理所读写的数据块数作为衡量单位
- 查询优化的总目标是选择更有效的策略，使用最小（较小）的查询代价求得给定关系表达式的值。

例子：求选修了 2 号课程的学生姓名：

```sql
SELECT Student.Sname FROM Student, SC WHERE Student.Sno=SC.Sno AND SC.Sno='2';
```

假设在执行时，`Student` 表中有 1000 条记录，`SC` 表中有 10000 条记录，其中满足 `SC.Sno='2'` 的记录有 50 条。

假设在进行查询操作时，IO 的基本单位是数据块，一个数据块中可以存 10 个 Student 元组或 100 个 SC 元组，或 10 个连接结果元组；IO 能力保证 1 秒可以输入输出 20 个数据块；内存中可以容纳 5 块 Student 元组和 1 块 SC 元组。

关系代数表达式 (1)：

$$
\prod_{Sname}(\sigma_\{Student.Sno=SC.Sno \land SC.Cno='2'\}(Student\times SC))
$$

- 分析读取的总块数为：$\frac{1000}{10} + \frac{1000}{10}/5 \times \frac{10000}{100}$ $= 100+20\times 100=2100$。这是因要读全部 Student，一块 10 个，所以读 $\frac{1000}{10}$ 块；对于每个 Student 块，要读全部 SC 块进行笛卡尔积，内存中能容纳 $5$ 块 Student，所以每 $\frac{1000}{10}/5$ 块 Student 要读 $\frac{10000}{100}$ 块 SC。
- 分析写入的总块数：连接后元组总数为 $1000\times 10000 = 10^7$，一个数据块可以容纳 10 个连接结果元组，所以写入总块数为 $10^7/10=10^6$ 块。
- 分析复杂度，因为题目假设了满足 `Cno='2'` 的记录实际只有 50 条，在 $10^7$ 中找 50 条是低效的。

关系代数表达式 (2)：

$$
\prod_{Sname}(\sigma_{SC.Cno='2'}(Student\bowtie SC))
$$

- 分析读取的总块数：和上面那个一样，也是要读入全部的（因为要算自然连接），也是 $2100$ 块。
- 分析写入的总块数：由于是自然连接而不是笛卡尔积，最坏的情况是最长的表的记录条数也就是 $10^4$ 条。
- 分析复杂度：比上面那个写法的写入块数要少。

关系代数表达式 (3)：

$$
\prod_{Sname}(Student \bowtie \sigma_{SC.Cno='2'}(SC))
$$

- 分析读取的总块数：首先对 SC 进行选择操作，读入所有 SC，读入总块数是 $\frac{10000}{100}$；选择后因假设了满足条件的只有 50 条，在内存里只用 1 块，一直放在内存里读全部 Student$\frac{1000}{10}$ 块进行等值连接。因此一共读了 200 块。
- 分析写入的总块数：最坏情况下只有 50 条记录，相当于 5 块。
- 分析复杂度：相比第一种关系代数写法已经降低很多很多了。

:::warning
通过上述三种可以看出，如果同时存在选择和连接操作，一定要先做选择，这样参加连接的元组就可以大大减少，这是代数优化的一个重要原则。
![web image](./imgs/index/41b22ce4147a6b085249dce96.png)

:::

![web image](./imgs/index/41b22ce4147a6b085249dce97.png)

### 物理优化

代数优化改变查询语句中操作的次序和组合，物理查询则涉及底层的存取路径。

在上面基于关系代数的优化的例子中，关系表达式 (3) 的基础上如何进一步优化：

- 如果 `SC.Cno` 上有索引，那一开始读所有 SC 的步骤也免了，直接按索引读 `SC.Cno='2'` 的即可，也就是只需要读 50 条共 1 块，加上索引块可能只要三四块。
- 如果此时 `Student.Sno` 上也有索引，那么最坏情况下也只需要读 50 条 SC 共 5 块，加上索引块可能不到 10 块。

因此可以通过在连接和查询条件的列上添加索引即可。对 Student 表创建索引，并采用 index join 的连接方式，这就属于物理优化。

典型的物理优化方法：

- 基于规则的启发式优化
- 基于代价估算的优化
- 上述两者的组合优化

#### 选择操作的启发式规则

对于小关系，使用全表顺序扫描，即选择列上有索引；
对于大关系，启发式的规则有：

- 对于选择条件是 `主码=值` 的查询，查询结果最多为一个元组，可以选择主码索引；
- 对于查询结果是 `非主属性=值` 的查询，估计查询结果可能的元组数目：若结果占 10% 以下，可以使用索引扫描方法，否则可以采用全表顺序扫描
- 对于选择条件是属性上的非等值连接或范围查询，并且选择的列上有索引：估算查询结果可能的元组数目，若比例较小（占 10% 以下）可以使用索引扫描，否则采用全表顺序扫描。

#### 连接操作的启发式规则

- 如果两个表都按照连接属性排序：选用 排序 - 合并 方法
- 如果一个表在连接属性上有索引：选择 索引连接 方法
- 如果不适用上面两条，并且有一个表很小：选用 hash join 方法

## 数据库恢复技术

事务（Transaction）是用户定义的一个数据库操作序列，是原子的，是并发控制的基本单位。事务的粒度是用户可以定义的。一个程序通常包含多个事务。

事务的特性（ACID）：

- 原子性（Atomicity）：要么全做完，要么全不做。
- 一致性（Consistency）：同原子性，数据库只应处于事务完全没执行的状态和事务完全执行了的状态，不应有中间状态，以保证数据一致性等。一致性是由原子性保证的。
- 隔离性（Isolation）：事务在执行时不能被其他在执行的事务干扰，不允许两个事务同时读写同个对象。多个事务并行时，DBMS 需要保证其隔离性。
- 持续性（Durability）：事务执行完成后，数据修改被提交到磁盘，不允许再撤回了。

回滚：当事务非正常结束时，要将做了一半的（非正常结束的）事务撤销。对于正常结束的事务，会进行“提交”操作，将更新写回磁盘。对于异常终止的事务，也就是事务进行过程中发生故障，系统将事务已完成的操作全部撤销，事务回滚恢复到执行前的状态。

### 故障

- 故障是不可避免的，例如断电、计算机硬件故障、管理员操作事务、恶意破坏等。
- 各类故障（事务内部的故障、系统的故障、存储介质故障等）对数据库的影响有对数据库系统软件的破坏和对数据本身的破坏。
- 数据库恢复的作用是将数据库从错误的状态恢复到某个已知的完整的、一致的状态。恢复操作的基本原理是冗余。
- 建立数据冗余的常见方法是数据转储，静态转出在转储时不允许对数据库进行任何修改（例如楼下的自动售货机每次到晚上十一点四十就不能买东西了）；动态转储在转储的同时允许并发对数据的操作。从转储对象的角度，转储分为 $\{静态,动态\}\times \{海量,增量\}$ 转储。

系统故障可能导致的现象：

- 事务未执行完成，系统仍在运行但是无法继续进行事务：UNDO
- 事务已经执行完成
  - 事务结果已被写回磁盘
  - 事务结果还在缓存区，没有被写回磁盘：REDO

### 日志

日志文件：记录事务对数据库进行更新的操作（包括操作类型、操作时间、操作用户、操作结果等）的文件。

![web image](./imgs/index/41b22ce4147a6b085249dce98.png)

![web image](./imgs/index/41b22ce4147a6b085249dce99.png)

日志文件在数据库恢复中：

- 帮助 DBMS 进行事务故障恢复
- 帮助 DBMS 进行系统故障恢复
- 协助后备副本进行介质故障恢复

![web image](./imgs/index/41b22ce4147a6b085249dce9a.png)

登记日志文件的基本原则：

- 登记的次序严格按并行事执行的时间次序
- 必须先写日志文件，后写数据（注：事务执行完成的标志是在日志文件是否存在该事务的结束标记例如 COMMIT，而不是最终操作结果是否写入数据库）

### 从日志恢复故障

对于故障发生时尚未完成的事务列表，在故障发生时尚未完成，在日志文件中只有 BEGIN TRANSACTION 记录，无对应的 COMMIT 记录，需要 UNDO：

- 反向扫描日志文件，查找该事务的更新操作
- 对事务的更新操作执行逆操作：
  - 对于插入的数据：删除这个操作
  - 对于删除操作：进行插入操作
  - 修改操作：修改回之前的值
- 继续反向扫描直到读到该事务的开始标记

#### 检查点

检查点是日志文件的附属品，其定期或按照预定规则对系统中当前事务的状态进行记录，每一个记录称为一个检查点。检查点的内容包含：

- 建立检查点时刻所有正在执行的事务清单
- 这些事务最近一个日志记录的地址 2

在检查点建立时，会保证检查点之前的所有已完成的事务已经正确写入到磁盘。因此，在检查点之前就完成的事务无需进行 REDO。

Example：
![web image](./imgs/index/41b22ce4147a6b085249dce9b.png)

检查点技术可以提高系统的恢复效率

#### 镜像

DBMS 还可以对数据库建立镜像来避免介质故障造成的不可恢复损失。但是，频繁地复制数据会降低系统的运行效率。

## 并发控制

- 顺序执行
- 并行执行（要求整数倍的硬件资源足够多以支持并行）
- 并发执行（提高系统利用率）

并发执行会导致可能的数据不一致性：
![web image](./imgs/index/41b22ce4147a6b085249dceab.png)

因此要求对并发的任务进行正确的调度，保证事务的正确执行顺序，保证隔离性和一致性。为了保证隔离性，一种方式是所有事务串行执行，让事务之间不互相干扰。但是串行执行效率非常低，为了增大吞吐，减小响应时间，数据库通常允许多个事务同时执行。因此并发控制模块需要保证：事务并发执行的效果，与事务串行执行的效果完全相同（serializability），以达到隔离性的要求。

并发操作可能带来的不一致性包括：

- 都是修改
- 不可重复读
- 读脏数据

### 锁

- X-Lock：排他锁，写锁，Exclusive Lock
- S-Lock，共享锁，读锁，Shared Lock

锁的相容性：
![web image](./imgs/index/41b22ce4147a6b085249dceac.png)
若事务对某个资源加了 X 锁，那么其他事务就不能对它加锁了，但是如果事务对资源加了 S 锁，那么其他事务也能对该资源申请 S 锁。

需要锁的常见场景有：

- 解决丢失修改
- 解决不可重复读
- 解决读到脏数据

Examples：
![web image](./imgs/index/41b22ce4147a6b085249dcead.png)
![web image](./imgs/index/41b22ce4147a6b085249dceae.png)
![web image](./imgs/index/41b22ce4147a6b085249dceaf.png)
![web image](./imgs/index/41b22ce4147a6b085249dceb0.png)

### 锁死了

并发事务加锁放锁必然绕不开一个问题 -- 死锁：事务 1 持有 A 锁等 B 锁，事务 2 持有 B 锁等 A 锁。目前解决死锁问题有两种方案：

- Deadlock Detection：允许发生死锁，发生了之后干掉其中一个
- Deadlock Prevention：预防死锁，不让死锁发生

其中预防死锁常见的方法有：

- 一次封锁法：在事务执行之前先把要用到的所有数据对象一次性全部枷锁，否则不执行。但是这总方式会降低并发度，并且精确预测所有需要的数据对象是困难的。
- 顺序封锁法：预先对系统中所有数据对象添加一个统一的顺序锁，所有事务按照这个顺序加锁。但是这种方式维护难度高，实现难度大。

当死锁发生时，解除死锁的方式一半是选择一个处理死锁代价最小的事务并将其撤销。

### 可串行化调度和冲突可串行化调度

并发事务的不同调度可能产生不同结果，当事务的任何并发执行，其结果与某一个串行执行的结果是相同的，就认为这个调度是正确的。

为了保证这一点，就要保证有正确的加锁顺序和方法，或加锁的约束。加锁的对象、时刻、持续时间称为封锁协议。

冲突可串行化调度 Example：
![web image](./imgs/index/41b22ce4147a6b085249dceb1.png)
上述例子中因为 $r_2(A) w_2(A)$ 和 $r_1(B) w_1(B)$

冲突可串行化调度是可串行化调度的充分条件，但不是必要条件。例如，在下面这个例子中，这不是一个冲突可串行化调度，但是这个调度是可串行化的：
![web image](./imgs/index/41b22ce4147a6b085249dceb2.png)

### 基于两阶段锁的并发控制

2PL 并发控制目的是为了达到可串行化的调度，其在执行时存在两个阶段：

- 扩展阶段：事务可以申请获得任何数据项上的任何类型的锁，但是不能释放任何锁；
- 收缩阶段：事务可以释放任何数据项上的任何类型的锁，但是不能申请和获得任何其他锁。

![web image](./imgs/index/41b22ce4147a6b085249dceb4.png)

如果并发控制不事先将所有需要的锁申请好，而是释放锁后，还允许再次申请锁，可能出现事务内两次操作同一对象之间，其它事务修改这一对象，从而导致不一致。

![web image](./imgs/index/41b22ce4147a6b085249dceb5.png)

理论证明，遵循两段锁协议的并发调度是可串行化的调度，但是能串行化不代表是两段锁协议。一次封锁法是满足两段锁协议的，但是两段锁协议不一定遵循一次封锁法。两端锁协议不能解决死锁。

### 锁的粒度（Granularity）

封锁的粒度可以是：

- 从逻辑单元的角度：单一的属性值、属性列、元组、关系基本表、索引项、整个索引、整个数据库等。
- 从物理单元的角度：页、物理记录等。

![web image](./imgs/index/41b22ce4147a6b085249dceb6.png)

![web image](./imgs/index/41b22ce4147a6b085249dceb7.png)

### 这一章怎么考

![web image](./imgs/index/41b22ce4147a6b085249dceb3.png)

1. 先观察调度，发现不满足两段锁协议，因此使用的判断方法是看执行结果是否是串行化调度中的某一个结果，如果有一个一致的，则是正确的调度。
2. 串行执行 A，B 可能出现的结果：400，300 和 300，500。
3. 观察上述执行过程，发现执行后 A，B 分别是 300，300，与串行执行结果没有一致的，因此这不是正确的调度。

## [OFF TOPIC] 有趣的数据库小话题

这里存放一些考试应该不怎么会关注的小细节和小知识

### 码的列级约束和表级约束

`PRIMARY KEY` 既可以是列级约束也可以是表级约束。例如，将 Student 表中的 Sno 属性定义为码：

```sql
CREATE TABLE Student(
    Sno CHAR(9) PRIMARY KEY, /*添加为列级约束*/
    ...
);
```

```sql
CREATE TABLE Student(
    Sno CHAR(9),
    ...
    PRIMARY KEY (Sno), /*添加为表级约束*/
);
```

:::warning
为什么不都换成列级约束，看着爽一点？是因为列级约束只能适用于码是单个属性的情况。如果使用两个列作为码，就需要表级约束：

```sql
CREATE TABLE SC(
    Sno CHAR(9) NOT NULL,
    Cno CHAR(4) NOT NULL,
    ...
    PRIMARY KEY (Sno, Cno), /*添加为表级约束*/
);
```

:::

### [MYSQL ISSUE] 关于在 UPDATE 语句中的子查询中引用被更新的表

![web image](./imgs/index/41b22ce4147a6b085249dce0f.png)
上述写法在 mysql 8.0 上执行会报错：

```sql
/* NOT OK, 外面的 UPDATE 修改的表不能在子查询中引用 */
UPDATE SelectCourse
SET Grade=Grade * 1.05
WHERE Cno = '01'
  AND Grade < SOME (SELECT AVG(Grade) FROM SelectCourse WHERE Cno = '01');
```

error:

```
You can't specify target table 'SelectCourse' for update in FROM clause
```

这是因为 MYSQL 在执行 UPDATE/INSERT/DELETE 这些修改表内容的操作的时候不能在内层的子查询里引用这个在外层被修改的表。一种解决方案是：用 SELECT 语句把这个表在子查询复制一遍放进一个临时表里：

```sql
/* OK,  SelectCourse 表在子查询中被隐式地复制了一份，和外面该表的更新不冲突 */
UPDATE SelectCourse
SET Grade=Grade * 1.05
WHERE Cno = '01'
  AND Grade < SOME (SELECT AVG(Grade) FROM (SELECT * FROM SelectCourse) AS Another WHERE Cno = '01');

```

一个有趣的 Observation 是，在子查询中的 SELECT 会创建一段单独的表来存储查询的结果，而非对查询到的内容进行引用。修改原表上的元组并不会影响已经得到了的 SELECT 结果。

### 小心 NOT IN 和 NULL

![web image](./imgs/index/41b22ce4147a6b085249dce2a.png)

除了上面这个答案，还有一个办法是用所有的减去上过李明老师的课的：

```sql
SELECT Sname FROM Student WHERE Sno NOT IN(SELECT Sno FROM SC, Course, Teacher WHERE SC.Sno=Student.Sno AND SC.Cno=Course.Cno AND Course.Tno=Teacher.Tno AND Teacher.Tname='李明')
```

但是更推荐用 NOT EXISTS，因为 NOT IN 在某些 DBMS 的某些版本里会和 NULL 值有奇妙小反应：
|`select 'true' where 3 in (1, 2, 3, null);`|`select 'true' where 3 not in (1, 2, null);`|
|:---:|:---:|
|![web image](./imgs/index/41b22ce4147a6b085249dce3d.png)|![web image](./imgs/index/41b22ce4147a6b085249dce3e.png)|

玄幻起来了，正常人（除了写前端的）一定会觉得第二个也应该是 true 的。

### 使用 EXISTS 减少不必要的检索

![web image](./imgs/index/41b22ce4147a6b085249dce28.png)

上面这俩都是正确的，目的都是找出选修了赵三老师主讲课程的所有学生的名字。但是呢，不过呢，通常，`EXISTS` 操作优于传统的连接查询，尤其是在处理大量数据时，因为 `EXISTS` 操作一旦找到符合条件的记录就会停止搜索，这能减少不必要的处理时间。然而，实际性能也依赖于数据库的具体实现和优化器。

### SELECT INTO 和 INSERT INTO SELECT 的性能

先说结论，SELECT INTO 性能是比 INSERT INTO SELECT 性能好的。

SELECT INTO 语句：

- `SELECT INTO` 创建一个新的表，并将查询结果集插入到这个新表中。
- 这个操作通常是一个原子操作，意味着它既要完成表的创建，也要完成数据的插入。
- `SELECT INTO` 只能用来创建新表，不能用于将数据插入已经存在的表中。
- 在某些 DBMS 中，如 SQL Server，`SELECT INTO` 可以在某些情景下比 `INSERT INTO` 快，因为它可以最小化日志记录（例如，当使用简单恢复模式时）。

INSERT INTO SELECT 语句：

- `INSERT INTO SELECT` 将查询结果集插入到已经存在的表中。
- 这通常需要表已具备适当的结构来接收数据。
- `INSERT INTO SELECT` 在插入过程中可能涉及索引维护，约束检查，触发器等额外操作，这可能会增加执行时间。

这两者的性能差异主要来自以下考量：

- **日志记录**：`SELECT INTO` 在某些 DBMS 中可能不会针对新创建的表进行详细的日志记录，从而提高速度。而 `INSERT INTO SELECT` 通常会记录详细的事务日志，以支持事务的原子性和持久性。
- **索引和约束**：`SELECT INTO` 创建的是一个全新的表，没有索引和约束，这可以加快插入速度。而 `INSERT INTO SELECT` 可能必须处理目标表上的索引和约束，这将增加开销。
- **锁定与并发**：使用 `SELECT INTO` 时，新表的创建可能不会和其他事务竞争资源，这在高并发环境下可能有优势。相比之下，`INSERT INTO SELECT` 可能需要考虑目标表的锁定策略和并发事务。

所以实际情况还是要看业务，如果数据量非常大，有时批量插入操作和其他性能优化策略（比如先临时禁用索引和约束，完成插入后再重新启用）可能比选择 `SELECT INTO` 或 `INSERT INTO SELECT` 更有实际意义。

### [MYSQL ISSUE] MYSQL 上的 SELECT INTO

如果你在使用 MYSQL，那么在执行 `SELECT INTO` 语句的时候会报错：

```sql
SELECT * FROM SC INTO NEWSC;
```

error:

```
Undeclared variable: NEWSC
```

这是因为 MySQL 数据库不支持 `SELECT INTO` 语句。那难道在 MYSQL 上只能使用 INSERT INTO SELECT 吗？也不是，MYSQL 支持 CREATE TABLE SELECT：

```sql
CREATE TABLE NEWSC SELECT * FROM SC;
```

### [MYSQL ISSUE] MYSQL 中关于时间的查询

MYSQL 中的 DATETIME 和 TIMESTAMP 都可以 `DEFAULT NOW()` 以表示使用插入时的时间：

```sql
CREATE TABLE test(
    id INT PRIMARY KEY AUTO_INCREMENT,
    timestamp_created TIMESTAMP DEFAULT NOW(),
    datetime_created DATETIME DEFAULT NOW()
);

INSERT INTO test VALUES();
SELECT * FROM test;
```

![web image](./imgs/index/41b22ce4147a6b085249dce3f.png)

`DATETIME` 和 `TIMESTAMP` 也可以都按照字符串来查询，比如：

```sql
INSERT INTO test(timestamp_created, datetime_created) VALUES('2001-01-01 00:00:00','2001-01-01 00:00:00');
INSERT INTO test(timestamp_created, datetime_created) VALUES('2002-01-01 00:00:00','2002-01-01 00:00:00');
INSERT INTO test(timestamp_created, datetime_created) VALUES('2003-01-01 00:00:00','2003-01-01 00:00:00');
```

```
SELECT * FROM test WHERE timestamp_created > '2001-03-03 00:00:00';
```

![web image](./imgs/index/41b22ce4147a6b085249dce41.png)

```sql
SELECT * FROM test WHERE timestamp_created like '2001-%';
```

![web image](./imgs/index/41b22ce4147a6b085249dce42.png)

## REFERENCE

https://www.sjkjc.com/mysql/with-check-option/
