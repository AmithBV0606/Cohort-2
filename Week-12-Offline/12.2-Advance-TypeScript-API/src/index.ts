interface User {
    name : string;
    age: number;
}

function sumOfAge(user1: User, user2: User){
    return user1.age + user2.age;
}

const resullt = sumOfAge({
    name:"Amith",
    age:24
},{
    name: "Vijaya",
    age: 58
});

console.log(resullt);