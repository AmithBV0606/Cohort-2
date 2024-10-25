"use strict";
// Records 
const users = {
    "abc123": {
        id: "abc123",
        username: "Amith"
    },
    "abc456": {
        id: "abc456",
        username: "Vikram"
    },
};
console.log(users);
// ____________________________________________________
// Maps
const customer = new Map();
customer.set("a1", { id: "a1", age: 30, email: "jdwb@123.com" });
customer.set("a2", { id: "a2", age: 13, email: "det@123.com" });
const customer2 = new Map();
customer2.set('abc123', { id: 'abc123', age: 30 });
customer2.set('xyz789', { id: 'xyz789', age: 24 });
console.log(customer2.get('xyz789'));
