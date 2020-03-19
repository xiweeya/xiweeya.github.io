# 廖雪峰 Python 教程后练习题

## 说明
用于个人学习记录

## 原教程地址
[https://www.liaoxuefeng.com/wiki/1016959663602400](https://www.liaoxuefeng.com/wiki/1016959663602400)


## 目录
* [Python基础](#Python基础)
  * [数据类型和变量](#数据类型和变量)
  * [字符串和编码](#字符串和编码)
  * [使用list和tuple](#使用list和tuple)
  * [条件判断](#条件判断)
* [函数](#函数)
  * [调用函数](#调用函数)
  * [定义函数](#定义函数)
  * [函数的参数](#函数的参数)
  * [递归函数](#递归函数)
* [高级特性](#高级特性)
  * [切片](#切片)
  * [迭代](#迭代)
  * [列表生成式](#列表生成式)
  * [生成器](#生成器)
* [函数式编程](#函数式编程)
  * 高阶函数
    * [map/reduce](#map/reduce)
    * [filter](#filter)
    * [sorted](#sorted)
  * [返回函数](#返回函数)
  * [匿名函数](#匿名函数)
  * [装饰器](#装饰器)
* [面向对象编程](#面向对象编程)
  * [访问限制](#访问限制)
  * [实例属性和类属性](#实例属性和类属性)
* [面向对象高级编程](#面向对象高级编程)
  * [使用@property](#使用@property)
  * [使用枚举类](#使用枚举类)
* [错误、调试和测试](#错误、调试和测试)
  * [错误处理](#错误处理)
  * [单元测试](#单元测试)
  * [文档测试](#文档测试)
* [正则表达式](#正则表达式)

## Python基础
### 数据类型和变量
```请打印出以下变量的值：```
```python
n = 123
f = 456.789
s1 = 'Hello, world'
s2 = 'Hello, \'Adam\''
s3 = r'Hello, "Bart"'
s4 = r'''Hello,
Lisa!'''

print(n)
print(f)
print(s1)
print(s2)
print(s3)
print(s4)
```

### 字符串和编码
```小明的成绩从去年的72分提升到了今年的85分，请计算小明成绩提升的百分点，并用字符串格式化显示出'xx.x%'，只保留小数点后1位：```
```python
s1 = 72
s2 = 85

r = (s2 - s1) / s2 * 100
print('%.1f%%' % r)
```

### 使用list和tuple
```请用索引取出下面list的指定元素：```
```python
L = [
    ['Apple', 'Google', 'Microsoft'],
    ['Java', 'Python', 'Ruby', 'PHP'],
    ['Adam', 'Bart', 'Lisa']
]

print(L[0][0])
print(L[1][1])
print(L[2][2])
```

### 条件判断
```小明身高1.75，体重80.5kg。请根据BMI公式（体重除以身高的平方）帮小明计算他的 BMI 指数，并根据 BMI 指数：低于18.5：过轻，18.5-25：正常，25-28：过重，28-32：肥胖，高于32：严重肥胖```
```python
height = 1.75
weight = 80.5
bmi = weight / (height * height)
if bmi < 18.5:
  print('过轻')
elif bmi < 25:
  print('正常')
elif bmi < 28:
  print('过重')
elif bmi < 32:
  print('肥胖')
else:
  print('严重肥胖')
```

## 函数
### 调用函数
```请利用 Python 内置的 hex() 函数把一个整数转换成十六进制表示的字符串：```
```python
print(hex(255))
print(hex(1000))
```

### 定义函数
```请定义一个函数 quadratic(a, b, c)，接收3个参数，返回一元二次方程 ax^2+bx+c=0 的两个解```
```python
import math
def quadratic(a, b, c):
  temp1 = math.sqrt(b * b - 4 * a * c)
  temp2 = 2 * a
  r1 = (- b + temp1) / temp2
  r2 = (- b - temp1) / temp2
  return r1, r2

print(quadratic(2, 3, 1))
print(quadratic(1, 3, -4))
```

### 函数的参数
```以下函数允许计算两个数的乘积，请稍加改造，变成可接收一个或多个数并计算乘积```
```python
def product(x, y = 1, *nums):
  sum = x * y
  for num in nums:
    sum = sum * num
  print(sum)

product(5)
product(5, 6)
product(5, 6, 7)
product(5, 6, 7, 9)
```

### 递归函数
```汉诺塔的移动可以用递归函数非常简单地实现。请编写 move(n, a, b, c) 函数，它接收参数n，表示3个柱子 A、B、C 中第1个柱子A的盘子数量，然后打印出把所有盘子从 A 借助 B 移动到 C 的方法```
```python
def move(n, a, b, c):
  if n == 1:
    print(a, '-->', c)
  else:
    move(n-1, a, c, b)
    print(a, '-->', c)
    move(n-1, b, a, c)

move(3, 'A', 'B', 'C')
```

## 高级特性
### 切片
```利用切片操作，实现一个 trim() 函数，去除字符串首尾的空格，注意不要调用 str 的 strip() 方法：```
```python
def trim(str = ''):
  if len(str) == 0:
    return str
  elif str[0] == ' ':
    return trim(str[1:])
  elif str[-1] == ' ':
    return trim(str[:-1])
  return str

print(trim('hello  '))
print(trim('  hello'))
print(trim('  hello  '))
print(trim('  hello  world  '))
print(trim(''))
print(trim('    '))
```

### 迭代
```请使用迭代查找一个list中最小和最大值，并返回一个tuple：```
```python
from collections.abc import Iterable

def findMinAndMax(L):
  if isinstance(L, Iterable) & (len(L) > 0):
    min = L[0]
    max = L[0]
    for value in L:
      if value < min:
        min = value
      if value > max:
        max = value
    return (min, max)
  return (None, None)

print(findMinAndMax([]))
print(findMinAndMax([7]))
print(findMinAndMax([7, 1]))
print(findMinAndMax([7, 1, 3, 9, 5]))
```

### 列表生成器
```如果list中既包含字符串，又包含整数，由于非字符串类型没有 lower() 方法，所以列表生成式会报错。请修改列表生成式，通过添加if语句保证列表生成式能正确地执行：```
```python
L = ['Hello', 'World', 18, 'Apple', None]
[s.lower() for s in L]
# 报错
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 1, in <listcomp>
# AttributeError: 'int' object has no attribute 'lower'

# 使用内建的isinstance函数可以判断一个变量是不是字符串

L2 = [s.lower() for s in L if isinstance(s, str)]
print(L2)
```

### 生成器
```杨辉三角```
```python
def triangles():
  b = [1]
  while True:
    yield b
    b = [1] + [b[i] + b[i + 1] for i in range(len(b) - 1)] + [1]

n = 0
results = []

for t in triangles():
  print(t)
  results.append(t)
  n = n + 1
  if n == 10:
    break

print(results)
```

## 函数式编程
### map/reduce
```利用 map() 函数，把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']：```
```python
def normalize(name):
  name = str(name).lower()
  return str(name[:1].upper()+name[1:])

print(list(map(normalize, ['adam', 'LISA', 'barT'])))
```

```Python提供的 sum() 函数可以接受一个 list 并求和，请编写一个 prod() 函数，可以接受一个 list 并利用 reduce() 求积：```
```python
from functools import reduce

def prod(L):
  def mult(x, y):
    return x * y
  return reduce(mult, L)

print(prod([3, 5, 7, 9]))
```

```利用 map 和 reduce 编写一个 str2float 函数，把字符串'123.456'转换成浮点数 123.456：```
```python
from functools import reduce

DIGITS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
def str2float(s):
  def char2num(s):
    return DIGITS[s]
  def fn(x, y):
    return x * 10 + y
  n = s.index('.')
  s1 = s[:n]
  s2 = s[n+1:]
  l1 = reduce(fn, map(char2num, s1))
  l2 = reduce(fn, map(char2num, s2))
  return l1 + (l2 / 10**len(s2))

print(str2float('123.456'))
```

### filter
```回数是指从左向右读和从右向左读都是一样的数，例如12321，909。请利用 filter() 筛选出回数：```
```python
def is_palindrome(n):
  it = str(n)
  return it == it[::-1]

print(is_palindrome(12321))
print(list(filter(is_palindrome, range(1, 200))))
```

### sorted
```请用 sorted() 对列表分别按名字排序，再按成绩从高到低排序：```
```python
L = [('Bob', 75), ('Adam', 92), ('Bart', 66), ('Lisa', 88)]

def by_name(d):
  return d[0]

def by_score(d):
  return -d[1]

print(sorted(D, key=by_name))
print(sorted(D, key=by_score))
```

### 返回函数
```利用闭包返回一个计数器函数，每次调用它返回递增整数：```
```python
def createCounter():
  c = 0
  def counter():
    nonlocal c
    c = c + 1
    return c
  return counter

counterA = createCounter()
print(counterA, counterA(), counterA(), counterA(), counterA(), counterA())
counterB = createCounter()
print([counterB(), counterB(), counterB(), counterB()])
```

### 匿名函数
```请用匿名函数改造下面的代码：```
```python
def is_odd(n):
  return n % 2 == 1

L = list(filter(is_odd, range(1, 20)))
L2 = list(filter(lambda x: x % 2 == 1, range(1, 20)))
```

### 装饰器
```请设计一个 decorator，它可作用于任何函数上，并打印该函数的执行时间：```
```python
import time, functools

def metric(fn):
  @functools.wraps(fn)
  def wrapper(*args, **kw):
    print('%s executed in %s ms' % (fn.__name__, 10.24))
    return fn(*args, **kw)
  return wrapper

@metric
def fast(x, y):
  time.sleep(0.0012)
  return x + y

@metric
def slow(x, y, z):
  time.sleep(0.1234)
  return x * y * z

f = fast(11, 22)
s = slow(11, 22, 33)
print('fast', f)
print('slow', s)
```

## 面向对象编程
### 访问限制
```请把下面的 Student 对象的 gender 字段对外隐藏起来，用 get_gender() 和 set_gender() 代替，并检查参数有效性：```
```python
class Student(object):
  def __init__(self, name, gender):
    self.__name = name
    self.__gender = gender
  def set_gender(self, gender):
    if gender == 'male' or gender == 'female':
      self.__gender = gender
  def get_gender(self):
    return self.__gender

bart = Student('Bart', 'male')
print(bart.get_gender())
bart.set_gender('female')
print(bart.get_gender())
```

### 实例属性和类属性
```为了统计学生人数，可以给Student类增加一个类属性，每创建一个实例，该属性自动增加：```
```python
class Student(object):
  count = 0
  def __init__(self, name):
    self.name = name
    Student.count += 1

print(Student.count)
bart = Student('Bart')
print(Student.count)
lisa = Student('Bart')
print(Student.count)
```

## 面向对象高级编程
### 使用@property
```请利用@property给一个Screen对象加上width和height属性，以及一个只读属性resolution：```
```python
class Screen(object):
  @property
  def width(self):
    return self._width
  @width.setter
  def width(self, value):
    self._width = value
  @property
  def height(self):
    return self._height
  @height.setter
  def height(self, value):
    self._height = value
  @property
  def resolution(self):
    return self._width * self._height

s = Screen()
s.width = 1024
s.height = 768
print('resolution =', sc.resolution)
```

### 使用枚举类
```把 Student 的 gender 属性改造为枚举类型，可以避免使用字符串：```
```python
from enum import Enum, unique

class Gender(Enum):
  Male = 0
  Female = 1

class Student(object):
  def __init__(self, name, gender):
    self.name = name
    self.gender = gender

bart = Student('Bart', Gender.Male)
print(bart.gender == Gender.Male)
```

## 错误、调试和测试
### 错误处理
```运行下面的代码，根据异常信息进行分析，定位出错误源头，并修复：```
```python
import logging
from functools import reduce

def str2num(s):
  return int(s)

def calc(exp):
  ss = exp.split('+')
  ns = map(str2num, ss)
  return reduce(lambda acc, x: acc + x, ns)

def main():
  r = calc('100 + 200 + 345')
  print('100 + 200 + 345 =', r)
  r = calc('99 + 88 + 7.6')
  print('99 + 88 + 7.6 =', r)

try:
  main()
except BaseException as e:
  logging.exception(e)

# 结果：
# ERROR:root:invalid literal for int() with base 10: ' 7.6'
# 改为：r = calc('99 + 88 + 7')
```

### 单元测试
```对 Student 类编写单元测试，结果发现测试不通过，请修改 Student 类，让测试通过：```
```python
import unittest

# 原 Student 类
# class Student(object):
#   def __init__(self, name, score):
#     self.name = name
#     self.score = score
#   def get_grade(self):
#     if self.score >= 60:
#       return 'B'
#     if self.score >= 80:
#       return 'A'
#     return 'C'

# 改为
class Student(object):
  def __init__(self, name, score):
    self.name = name
    self.score = score
  def get_grade(self):
    if self.score > 100 or self.score < 0:
      raise ValueError('Invalid value: %s' % self.score)
    if self.score >= 80:
      return 'A'
    if self.score >= 60:
      return 'B'
    return 'C'
```

### 文档测试
```对函数fact(n)编写doctest并执行：```
```python
def fact(n):
  '''
  Calculate 1*2*...*n

  >>> fact(1)
  1
  >>> fact(10)
  3628800
  >>> fact(-1)
  Traceback (most recent call last):
    ...
  ValueError
  '''
  if n < 1:
    raise ValueError()
  if n == 1:
    return 1
  return n * fact(n - 1)

if __name__ == '__main__':
  import doctest
  doctest.testmod()
```

## 正则表达式
```请尝试写一个验证Email地址的正则表达式。版本一应该可以验证出类似的Email：```
```python
# someone@gmail.com
# bill.gates@microsoft.com

import re

def is_valid_email(addr):
  return re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', addr)

assert is_valid_email('someone@gmail.com')
assert is_valid_email('bill.gates@microsoft.com')
assert not is_valid_email('bob#example.com')
assert is_valid_email('mr-bob@example.com')
print('ok')

def name_of_email(addr):
  res = re.match(r'^(<(\w[\w\s]+)>)?[\s]?([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', addr)
  if res.group(1) != None:
    return res.group(2)
  return res.group(3)

assert name_of_email('<Tom Paris> tom@voyager.org') == 'Tom Paris'
assert name_of_email('tom@voyager.org') == 'tom'
print('ok')
```
