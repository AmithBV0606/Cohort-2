console.log("At the top 1");

function promisifiedTimeOut() {
    console.log("Function called 3");
    return new Promise((resolve, reject) => {
        console.log("Inside promise callback 4");
        setTimeout(() => {
            console.log("SetTimeout called 5");
            resolve("I'm done baby!!!");
        }, 5000);
    })
}

console.log("In the middle 2");

promisifiedTimeOut().then((res) => {
    console.log("Promisified then 6");
    console.log(res);
})