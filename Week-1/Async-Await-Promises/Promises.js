// This code is ugly

// function findSum(n) {
//     let ans = 0;
//     for (let i = 0; i < n; i++) {
//         ans += i;
//     }
//     return ans;
// }

// function findSumTill100(){
//     console.log(findSum(100));
// }

// setTimeout(findSumTill100, 2000);
// console.log("Hello World");

// Promises are syntactical sugar that makes the above code  slightly more readable

// The reason to introduce Promises was to get rid of callbacks

// Creating our own asynchronous code
const fs = require("fs");

function customReadFile() {
    return new Promise((resolve, reject) => {
        fs.readFile("a.txt","utf-8", function(err, data){
            resolve(data);
        });
    })
}

function onDone(data) {
    console.log(data);
}

customReadFile().then(onDone)