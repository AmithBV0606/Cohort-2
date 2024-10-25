interface UserInfo {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
}

// interface updateProps {
//     name: string;
//     age: number;
//     password: string;
// }

// If the interface UserInfo's values datatype changes, we also have to change that specific datatype in updateProps interface as well, because updateProps interface is the sub-set of UserInfo interface

// Solution for this probelem is to use "Pick" API

type updateProps = Pick<UserInfo, 'name' | 'age' | 'password'>

function updateUser(updateProps: updateProps){
    // hit the database to update the user  
    console.log(`Name: ${updateProps.name}, Age: ${updateProps.age}, Password: ${updateProps.password}`);
}

const user = {
    name: "Amith",
    age:24,
    password: "Amith@123"
}
updateUser(user);