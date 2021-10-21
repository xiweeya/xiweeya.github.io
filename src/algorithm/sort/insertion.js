/**
 * Insertion sort
 * 将 a[i] 与 a[0]~a[i-1] 中比它小的所有元素依次有序地交换
 */
export function insertionSort(arr) {
  const res = arr.slice();
  const len = res.length;
  if (!len) {
    return res;
  }

  let temp = 0;

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (res[j] < res[j - 1]) {
        temp = res[j - 1];
        res[j - 1] = res[j];
        res[j] = temp;
        continue;
      }
      break;
    }
  }

  return res;
}

export function insertionSortByMove(arr) {
  const res = arr.slice();
  const len = res.length;
  if (!len) {
    return res;
  }

  let temp;

  for (let i = 1; i < len; i++) {
    temp = res[i];
    let j = i;

    while(j && temp < res[j - 1]) {
      res[j] = res[j - 1];
      j--;
    }
    res[j] = temp;
  }

  return res;
}
