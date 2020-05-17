# JavaScript 浮点数计算的精度
## Floating-Point Arithmetic
## 目录
* [数值格式化问题](数值格式化问题)
* [为什么](为什么)
    * [JavaScript&nbsp;中的&nbsp;Number](JavaScript&nbsp;中的&nbsp;Number)
    * [浮点数的误差](浮点数的误差)
* [解决方案](解决方案)
    * [保留位数](保留位数)
    * [最小精度](最小精度)
    * [引用第三方库](引用第三方库)
* [参考](参考)


## 数值格式化问题
在对数值进行格式化处理时，常常会有下列的精度问题：
```
0.1 + 0.2 // 0.30000000000000004
0.29 * 100 // 28.999999999999996
1 - 0.9 // 0.09999999999999998
```

不同的浏览器中还可能有不同的表现：
```
// `Chrome`/`Firefox`/`Safari` 下有同样的精度问题
1.25.toFixed(1) // "1.3"
1.225.toFixed(2) // "1.23"
1.2225.toFixed(3) // "1.222"
```

```
// IE 11 是没问题的
1.25.toFixed(1) // "1.3"
1.225.toFixed(2) // "1.23"
1.2225.toFixed(3) // "1.223"
```

## 为什么
### JavaScript&nbsp;中的&nbsp;Number
根据 [ECMAScript 标准](http://www.ecma-international.org/ecma-262/10.0/index.html)，JavaScript 的 Number 采用的是 `双精度64位二进制`（double-precision 64-bit binary format）浮点计算。

[双精度浮点数](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)（double）遵循 [IEEE 754](https://zh.wikipedia.org/zh-hans/IEEE_754?oldformat=true) 标准（二进位浮点数算术标准
），其使用 `64 位`（8字节）来储存一个浮点数，其组成为：
* **符号（sign bit）**：1 bit，表示正负号，`0` 代表数值为正，`1` 代表数值为负
* **指数（exponent）**：11 bits，表示次方数，即指数部分（e）
    
指数位可以表示 -1024~1023 的值范围（或无符号的值 0~2047），在 OEEE 754 中，指数值 1023 代表实际上的零（若 $2^{e-1023}$ 表示 1，那么 e 为 1023）。
* **精度（significand precision/fraction）**：53 bits（实际存储 52 bits），表示精确度

在二进制的“科学记号”，数字被表示为：$fraction × 2^{exponent}$，为了提高精确度、规范尾数，把尾数处理为 [1, 2) 区间内，即表示为：$1.fraction × 2^{exponent}$，因此第一位有效数字总是 `1`，这个1不需要存储，可以节省一个 `bit`

---

![48240f0e1e0dd33ec89100cbe2d30707.png](evernotecid://E15FA5AE-981A-43F0-B060-4FFDD8B8A94C/appyinxiangcom/5622477/ENResource/p306)


即，一个双精度浮点数可以表示为：
```math
    (-1)^{sign} × 2^{e - 1023} × 1.fraction
```

#### 一些浮点数例子
$0$ $01111111111$ $0000000000000000000000000000000000000000000000000000_{2}$ ≙ $3FF0$ $0000$ $0000$ $0000_{16}$ ≙ $+2^0 × 1 = 1$

$0$ $01111111111$ $000000000000000000000000000000000000000000000000000_{12}$ ≙ $3FF0$ $0000$ $0000$ $0001_{16}$ ≙ $+2^0 × (1 + 2^{-52}) ≈ 1.0000000000000002$, the smallest number > 1

$1$ $10000000000$ $0000000000000000000000000000000000000000000000000000_{2}$ ≙ $C000$ $0000$ $0000$ $0000_{16}$ ≙ $−2^1 × 1 = −2$

$0$ $01111111000$ $1000000000000000000000000000000000000000000000000000_{2}$ ≙ $3F88$ $0000$ $0000$ $0000_{16}$ ≙ $+2^{-7} × 1.1_{2}$

$0$ $01111111101$ $0101010101010101010101010101010101010101010101010101_2$ 
= $3FD5$ $5555$ $5555$ $5555_{16}$ ≙ $+2^{2} × (1 + 2^{-2} + 2^{-4} + ... + 2^{-52})$ ≈ $1/3$


### 浮点数的误差
基于浮点（floating-point）数的实现方式，不可避免的会产生浮点数误差：
* 浮点数集合是离散的，并且有边界的（真实的数字是连续且无限的，因此多数真实数字，无法在计算机系统中由浮点数精确表达）
* 多数计算机系统采用二级制计数，这意味着无法用二级制准确表示的数字，会出现舍入误差

#### 以 0.1 为例

`0.1`转为二进制表示为 $0.0001100110011...{_2}$（取 52 bits），用浮点数表示为 
```math
1.1001100110011001100110011001100110011001100110011010×2^{-4}
```
所以 `e = -4+1023=1019`，舍去首位的 1 后 `fraction = 100110011001100`（图片生成由 [binaryconvert](http://www.binaryconvert.com/convert_double.html)）：
![2413572e2ea1ddafb714cad88ace740b.png](evernotecid://E15FA5AE-981A-43F0-B060-4FFDD8B8A94C/appyinxiangcom/5622477/ENResource/p310)

转为十进制后为：`0.100000000000000005551115123126`

同理可得`0.2`为：`00111111 11001001 10011001 10011001
10011001 10011001 10011001 10011010`，实际表示为：`0.200000000000000011102230246252`

#### 以 0.1 + 0.2 计算为例
```
// 计算 0.1 + 0.2 （保留 52 bits）
0 01111111011 1001100110011001100110011001100110011001100110011010 + 
0 01111111100 1001100110011001100110011001100110011001100110011010 = 
0 01111111101 0011001100110011001100110011001100110011001100110100
```
结果转成十进制为：`0.30000000000000004...`
而 `0.3` 实际表示为 `0.299999999999999988897769753748`


## 解决方案
### 保留位数
内置方法保留部分位数如：
* [Number.toPrecision()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
* [Number.toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

### 最小精度
利用 JavaScript 的最小精度 `Number.EPSILON`，比较两边的差值是否小于最小精度：
```
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
```

### 引用第三方库
如果需要精确的计算（如与金钱有关的操作），或一些复杂场景，可以利用现成的工具，如 [number-precision](https://github.com/nefe/number-precision)。


## 参考
* [The Floating-Point Guide](https://floating-point-gui.de)
* [Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)
* [Is Your Model Susceptible to Floating-Point Errors](http://jasss.soc.surrey.ac.uk/9/4/4.html)
* [Here is what you need to know about JavaScript’s Number type](https://medium.com/angular-in-depth/javascripts-number-type-8d59199db1b6#.9whwe88tz)

