# [译]JavaScript中的计算机科学：合并排序

## 前言

原文：[Computer science in JavaScript: Merge sort](https://humanwhocodes.com/blog/2012/10/02/computer-science-and-javascript-merge-sort/)

原作者这个系列的 Github 项目地址：[Computer Science in JavaScript](https://github.com/humanwhocodes/computer-science-in-javascript)


## 正文
合并排序可以说是您在计算机科学中，学到的第一个有用的排序算法。合并排序算法复杂度为 **O(n log n)**，这使它成为高效的排序算法之一。此外，合并排序也是一种稳定的排序算法（像插入算法一样），因为在排序前后，同一级项目的相对顺序保持不变。这个优点也是 Firefox 和 Safari 浏览器用合并排序来作为 **Array.prototype.sort()** 的实现方式的原因。  
此合并排序算法基于这个想法：合并两个已经排序好的列表，比处理单个未排序列表更容易。为此，首先需要创建 n 个只有一个项的单项列表（one item list），其中 n 是原始待排序列表的项目总数。之后，算法持续合并这些单项列表，使其重新组合成为一个已排序列表。  
已经排序的两个列表的合并是一种相当直接的算法。现在假设有两个列表：列表 A 和列表 B。从每个列表中的第一项开始比较两个列表中的值。哪个项的值较小，就插入到结果列表 array 中。假设更小的值来自列表 A；将该值放入到结果数组中。接下来，将列表 A 中的第二项和列表 B 中的第一项进行比较。再一次，将两个值中较小的那个加入结果数组中。所以，如果现在较小的值来自于列表B，那么下一步则是比较列表 A 中的第二项和列表 B 中的第二项。这部分代码如下：  
```javascript
function merge(left, right) {
  const result = []
  let il = 0
  let ir = 0

  whilte (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }

  return result.concat(left.slice(il)).concat(right.slice(ir))
}
```
该方法合并两个数组：*left* 和 *right*。变量 *il* 保存着列表 *left* 当前进行比较的项目的索引，*ir* 对于列表 *right* 的作用相同。每当一个值被添加到结果数组中时，其对应的索引值都会自增。只要其中一个列表的值比对完毕，就用 *concat()* 方法将剩下未比对的值添加到结果数组的末尾。  
函数 *merge()* 非常简单，但是需要两个已排序的列表用来合并。如前所述，这是通过将一个数组拆分成多个单项列表，然后系统地合并这些列表来完成的。像这样用一个递归算法可以很轻松地实现：  
```javascript
function mergeSort(items) {
  // 0 或者 1 项的数组不需要排序
  if (items.length < 2) {
    return items
  }

  const middle = Math.floor(items.length / 2)
  const left = items.slice(0, middle)
  const right = items.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}
```
首先需要注意的是仅有 0 或 1 项的数组的情况。这样的数组不需要进行排序，并且可以直接原样返回。对于超过 2 项值的数组，其首先被对半分并创建出 *left* 和 *right* 数组。随后将拆分后的每个数组传回 *mergeSort()* 方法，并将其运行结果作为参数传给 *merge()* 方法。因此算法会先对数组的左半部分进行排序，随后对右半部分进行排序，然后合并它们的结果。通过这种递归，最终达到对两个单项数组进行合并的那一步。  
合并排序的这种实现方式，返回的结果数组和传入时的不同（这不是一个“就地”排序）。如果你想要创建一个就地排序，你可以选择始终清空原始数组，并用排序后的数组项重新填充它：  
```javascript
function mergeSort(items) {
  if (items.length < 2) {
    return items
  }

  const middle = Math.floor(items.length / 2)
  const left = items.slice(0, middle)
  const right = items.slice(middle)
  const params = merge(mergeSort(left), mergeSort(right))

  // 替换该数组 0 到 最后一项的所有值
  params.unshift(0, items.length)
  items.splice.apply(items, params)
  return items
}
```
这版的 *mergeSort()* 方法将排序结果储存在变量 *param* 中。替换数组项目最好的方式就是使用 *splice()* 方法，该方法接受 2 个或更多参数。第一个参数是要替换的第一个值的索引值，第二个参数是要替换掉的项目数。后续的参数都是将要插入在那个位置的值。由于无法将一整个数组的值直接传递给 *splice()*，因此需要利用 *apply()*，并将其和已排序数组作为前两个参数传入。因此，使用 *unshift()* 将 *0* 和 *item.length* 添加到数组的最前面，这样 *apply()* 就可以和 *splice()* 一起使用。然后返回原始数组。  
排序算法的合并排序有可能是你认识到的最有用的排序算法，因为它的良好性能和易于实现。和我介绍的其他排序算法一样，相对于尝试自己额外实现一个算法，最好还是直接使用本地方法 *Array.prototype.sort()*。多数情况下，本地方法可靠且高效。但注意，不是所有的实现都使用稳定的排序算法。如果使用稳定的排序算法对你来说很重要，那你最好还是自己实现一个。  
你可以从我的 GitHub 项目获取两种版本的 *mergeSort()* 方法：[Computer Science in JavaScript](https://github.com/humanwhocodes/computer-science-in-javascript)。
