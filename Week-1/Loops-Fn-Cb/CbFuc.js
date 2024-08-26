// Callbacks : Passing functions as arguements

// A function can be called inside of another function 
// function square(n) {
//     return n * n;
// }

// function sumofSquares(a, b) {
//     const val1 = square(a);
//     const val2 = square(b);

//     return val1 + val2;
// }

// console.log(sumofSquares(5, 10));

// Callback functions
function square(n) {
    return n * n;
}

function cube(n) {
    return n * n * n;
}

function sumofSomething(a, b, fn){
    const val1 = fn(a);
    const val2 = fn(b);
    return val1 + val2;
}

console.log(sumofSomething(2,3,square));
console.log(sumofSomething(2,3,cube));
console.log(sumofSomething(2,3,function (a) {
    return a + 2;
}));