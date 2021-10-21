/**
 * Selection Sort
 */
export function selectionSort(arr) {
  const res = arr.slice();
  const len = res.length;
  if (!len) {
    return res;
  }

  let min = 0;
  let temp = 0;

  for (let i = 0; i < len; i++) {
    min = i
    for (let j = i + 1; j < len; j++) {
      if (res[j] < res[min]) {
        min = j;
      }
    }
    temp = res[i];
    res[i] = res[min];
    res[min] = temp;
  }

  return res;
}
