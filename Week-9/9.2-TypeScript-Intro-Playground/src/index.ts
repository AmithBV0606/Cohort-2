const x: number = 10;
// x = 20;
console.log(x);

// Problem 1 - Hello world : Write a function that greets a user given their first name.

function greet(firstName:string) {
    console.log(`Hello ${firstName}`);
}

greet("Amith");

// Thing to learn - How to give types to arguments of a function 

// ___________________________________________________________________________________________

// Problem 2 - Sum function : Write a function that calculates the sum of two functions

const sum = (a: number, b: number): number => {
    let add = a + b;
    return add;
}

console.log(sum(10, 20));

// Thing to learn - How to assign a return type to a function.

// ___________________________________________________________________________________________

// Problem 3 - Return true or false based on if a user is 18+

function isLegal(age:number) {
    if (age > 18) {
        return true;
    } else {
        return false;
    }
}

let legal = isLegal(20);
console.log(legal);

// Thing to learn - Type inference

// ___________________________________________________________________________________________

// Problem 4 - Create a function that takes another function as input, and runs it after 1 second.
function anotherFunc(fn : () => void){
    setTimeout(fn, 2000);
}

anotherFunc(function () {
    console.log("Hello there")
})

// tsconfig
const greet1 = (name: string) => `Hello, ${name}!`;