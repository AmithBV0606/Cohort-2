// Interfaces

// How can you assign types to objects? For example, a user object that looks like this - 

// const user = {
// 	firstName: "harkirat",
// 	lastName: "singh",
// 	email: "email@gmail.com".
// 	age: 21,
// }

// Solution : To assign a type to the user object, you can use interfaces

interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    age : number;
}

// Assignment #1 - Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

function isLegalAge(user: User): boolean {
    if (user.age > 18) {
        return true;
    } else {
        return false;
    }
}

isLegalAge({
    age: 24
});