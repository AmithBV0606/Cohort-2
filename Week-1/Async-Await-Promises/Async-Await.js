function newFunc() {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hi there")
        }, 2000);
    })
    return p;
}

async function main() {
    let value = await newFunc();
    console.log(value)
}

main();