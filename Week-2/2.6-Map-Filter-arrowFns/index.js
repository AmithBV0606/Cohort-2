// Arrow Functions 

const sum = (a, b) => {
    return a + b;
} 

const result = sum(10, 20);
console.log(result);

const obj = {
    name: "Amith",
    sayName: function () {
        console.log(`This is ${this.name}`);
    },
    again : () => {
        console.log(`This is ${this.name}`);
    }
}

obj.sayName();
obj.again();

// Given an array, return a new array in which every value is multiplied by 2

const arr = [1,2,3,4,5];

let newArr1 = arr.map((item) => {
    return item * 2;
});

console.log(newArr1);

// Given an array, return a new array in which every even value is present

const newArr2 = arr.filter((item) => {
    return (item % 2 === 0);
});

console.log(newArr2)