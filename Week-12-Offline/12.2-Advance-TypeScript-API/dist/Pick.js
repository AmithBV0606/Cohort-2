"use strict";
function updateUser(updateProps) {
    // hit the database to update the user  
    console.log(`Name: ${updateProps.name}, Age: ${updateProps.age}, Password: ${updateProps.password}`);
}
const user = {
    name: "Amith",
    age: 24,
    password: "Amith@123"
};
updateUser(user);
