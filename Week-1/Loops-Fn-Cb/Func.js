function findSum(n) {
    let a = 0;
    for (let i = 1; i <= n; i++) {
        a += i;
    }
    return a;
}

const result = findSum(10);
console.log(result);