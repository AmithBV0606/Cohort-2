# Interfaces 

### 1) What are interfaces ?
How can you assign types to objects? For example, a user object that looks like this - 
```javascript
const user = {
	firstName: "harkirat",
	lastName: "singh",
	email: "email@gmail.com".
	age: 21,
}
```

To assign a type to the `user` object, you can use `interfaces`.

```javascript
interface User {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
}
```

### Assignment #1 : 
Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.

```javascript
interface User {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
}

function isLegal(user: User) {
    if (user.age > 18) {
        return true
    } else {
        return false;
    }
}
```

### Assignment #2 : 
Create a React component that takes todos as an input and renders them

```javascript
// Todo.tsx
interface TodoType {
  title: string;
  description: string;
  done: boolean;
}

interface TodoInput {
  todo: TodoType;
}

function Todo({ todo }: TodoInput) {
  return <div>
    <h1>{todo.title}</h1>
    <h2>{todo.description}</h2>
    
  </div>
}
```

### 2) Implementing interfaces
Interfaces have another special property. You can implement interfaces as a class.

Let’s say you have an personinterface - 
```javascript
interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}
```

You can create a class which implements this interface.

```javascript
class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}
```

**NOTE :** This is useful since now you can create multiple variants of a person (Manager, CEO …)

### Summary
1) You can use interfaces to aggregate data
2) You can use interfaces to implement classes from

<!-- ----------------------------------------------------------------------------------- -->

# Types

### What are types?
Very similar to interfaces , types let you aggregate data together.

```javascript
type User = {
	firstName: string;
	lastName: string;
	age: number
}
```

But they let you do a few other things, like 

### 1. Unions

Let’s say you want to print the id of a user, which can be a number or a string.

**NOTE :** You can not do this using `interfaces`.

```javascript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(101); // ID: 101
printId("202"); // ID: 202
```

### 2. Intersections 

What if you want to create a type that has every property of multiple types/ interfaces

```javascript
type Employee = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software developer"
};
```

<!-- ----------------------------------------------------------------------------------- -->

# Arrays in TypeScript

If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type

### Example 1 : 

Given an array of positive integers as input, return the maximum value in the array

```javascript
const nums : number[] = [1,2,7,4,5];

let highest = Number.NEGATIVE_INFINITY;

for (let index = 0; index < nums.length; index++) {
    if (highest < nums[index]) {
        highest = nums[index]
    }
}

console.log(highest);
```

### Example 2 :

Given a list of users, filter out the users that are legal (greater than 18 years of age)

```javascript
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
```