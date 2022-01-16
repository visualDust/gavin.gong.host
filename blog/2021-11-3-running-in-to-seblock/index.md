---
title: 对着SEBlock的代码啊吧啊吧
authors: [visualdust]
tags: [deep learning, computer vision]
description: Running into an issue when implementing SENet.
image: https://ml.akasaki.space/assets/img/image-20210703225313459.efd76d2a.png
hide_table_of_contents: false
---

```python
from paddle.nn import *

class SELayer(Layer):
    def __init__(self, channel, reduction=16):
        super(SELayer, self).__init__()
        self.avg_pool = AdaptiveAvgPool2D(output_size=[None, None])
        self.fc = Sequential(
            Linear(channel, channel // reduction, bias_attr=False),
            ReLU(),
            Linear(channel // reduction, channel, bias_attr=False),
            Sigmoid()
        )

    def forward(self, x):
        b, c, _, _ = x.size()
        y = self.avg_pool(x).view(b, c)
        y = self.fc(y).view(b, c, 1, 1)
        return x * y.expand_as(x)
```