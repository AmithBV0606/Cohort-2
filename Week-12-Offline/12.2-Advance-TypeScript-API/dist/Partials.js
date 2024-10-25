"use strict";
function updateUser2(updateProps) {
    // hit the database to update the user  
    console.log(`Name: ${updateProps.name}, Age: ${updateProps.age}, Password: ${updateProps.password}`);
}
updateUser2({
    name: "Amith",
    age: 24
});
