"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const resullt = sumOfAge({
    name: "Amith",
    age: 24
}, {
    name: "Vijaya",
    age: 58
});
console.log(resullt);
