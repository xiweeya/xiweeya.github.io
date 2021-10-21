/**
 * Test file
 */
import { selectionSort } from './selection.js';
import { insertionSort, insertionSortByMove } from './insertion.js';

const arr = ['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

console.log(arr.join(' '));
console.log(selectionSort(arr).join(' '));
console.log(insertionSort(arr).join(' '));
console.log(insertionSortByMove(arr).join(' '));
