// type Me = {
//     readonly name: string;
//     readonly age: number;
// }

// Instead of writting readonly on each line you can do the foloowing : 
type Me = {
    name: string;
    age: number;
}


const obj: Readonly<Me> = {
    name: "Amith",
    age: 24
}

// obj.name = "Vikram"; // This will throw an error.

// This is how we can enforce constants on internal values