// Example for Async

// setTimeout
// fs.readFile
// Fetch

const fs = require("fs");

fs.readFile("a.txt","utf-8", function(err, data){
    if (data) {
        console.log(data);
    } else {
        console.log("Error is : ", err);
    }
});

// Callbacks as a concept makes more sense when used with the asynchronous function