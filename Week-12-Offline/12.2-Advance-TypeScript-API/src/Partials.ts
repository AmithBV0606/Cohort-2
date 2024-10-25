interface UserInfo2 {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

// What if user doesn't wants to update every fiels?
// interface updateProps2 {
//     name?: string;
//     age?: number;
//     password?: string;
// }

// Here also we face same problem of datatype being changed twice.

// Solution : 
type updateProps2 = Pick<UserInfo2, 'name' |'age' |'password'>

type updateProps2Optional = Partial<updateProps2>;

function updateUser2(updateProps: updateProps2Optional){
    // hit the database to update the user  
    console.log(`Name: ${updateProps.name}, Age: ${updateProps.age}, Password: ${updateProps.password}`);
}

updateUser2({
    name: "Amith",
    age: 24
});