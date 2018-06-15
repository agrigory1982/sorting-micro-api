'use strict';

/*
 * A class to perform sorting algorithms
 */
module.exports = class Sorter {

  /*
   * The class constructor
   *
   * @param {Array} array - array to sort
   */
  constructor(array) {
    this._array = array;
  }

  /**
   * Perform bubble sorting algorithm
   *
   * @returns array - sorted array
   */
  bubbleSort() {
    if (!Array.isArray(this._array)) throw new Error('Provided data must be an Array');
    if (this._array.length === 0) return [];

    // Copy of the array
    const clonedArray = this._array.slice();

    let size = clonedArray.length;
    do {
      let newSize = 0;
      for (let i = 1; i < size; i++) {
        if (clonedArray[i - 1] > clonedArray[i]) {
          this._bubble_swap(clonedArray, i - 1, i);
          newSize = i;
        }
      }
      size = newSize;
    } while (size !== 0);

    return clonedArray;
  };

  _bubble_swap(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };

  /**
   * Perform merge sorting algorithm
   *
   * @returns array - sorted array
   */
  mergeSort() {
    if (!Array.isArray(this._array)) throw new Error('Provided data must be an Array');
    if (this._array.length === 0) return [];
    if (this._array.length === 1) return this._array;
    return this._mergeSort(this._array);
  };

  _mergeSort(array) {
    if (array.length === 1) return array;         // Stop recursive when length is 1 element!
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursive call
    return this._merge(
      this._mergeSort(left),
      this._mergeSort(right)
    );
  }

  _merge (left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        indexRight++;
      }
    }
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }
};
