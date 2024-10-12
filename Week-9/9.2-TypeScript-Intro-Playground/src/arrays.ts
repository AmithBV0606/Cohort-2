// Example 1 : Given an array of positive integers as input, return the maximum value in the array

const nums : number[] = [-1,-2,-7,-4,-5];

let highest = Number.NEGATIVE_INFINITY;

for (let index = 0; index < nums.length; index++) {
    if (highest < nums[index]) {
        highest = nums[index]
    }
}

console.log(highest);

// Example 2 : Given a list of users, filter out the users that are legal (greater than 18 years of age)

interface Users {
	firstname: string;
	lastname: string;
	age: number;
}

const userArray : Users[] = [{
    firstname: "Amith",
    lastname: "Singh",
    age: 21
}, {
    firstname: "Raman",
    lastname: "Singh",
    age: 16
}, ];

function filteredUser(userArray: Users[]) {
    return userArray.filter((user) => user.age > 18);
}

console.log(filteredUser(userArray));