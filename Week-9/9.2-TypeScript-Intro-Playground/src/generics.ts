// 1. Problem Statement

// Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.
// How would you solve this problem?

// type Input = string | number;

// function firstEle(arr:Input[]) {
//     return arr[0];
// }

// const value = firstEle(['Amith', 'Rao']);
// console.log(value.toUpperCase());

// Solution - Generics

function firstEle<T>(arr: T[]) {
    return arr[0];
}

const value = firstEle(["harkiratSingh", "ramanSingh"]);
const value2 = firstEle([1,2,3,4]);
console.log(value.toUpperCase());