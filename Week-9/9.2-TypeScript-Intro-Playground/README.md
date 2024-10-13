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

<!-- ----------------------------------------------------------------------------------- -->

# Enums in TypeScript

    - Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.

    - The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

### Example 1 - Game 

Let’s say you have a game where you have to perform an action based on weather the user has pressed the up arrow key, down arrow key, left arrow key or right arrow key.

```typescript
function doSomething(keyPressed: string) {
	// do something.
}
```
    - What should the type of keyPressed be?

    - Should it be a string? (UP , DOWN , LEFT, RIGHT) ?

    - Should it be numbers? (1, 2, 3, 4) ?

The best thing to use in such a case is an enum.
```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Up)
```
**NOTE :** Enums are used when we know that the inputs to a function are limited

###  How to change values?
```typescript
enum Direction {
    Up = 1,
    Down, // becomes 2 by default
    Left, // becomes 3
    Right // becomes 4
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down)
```

### Can also be strings : 
```typescript
enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down);
```

### Common usecase in express : 
```typescript
enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

app.get("/", (req, res) => {
    if (!req.query.userId) {
        res.status(ResponseStatus.Error).json({})
    }
    res.status(ResponseStatus.Success).json({});
});
```

<!-- ----------------------------------------------------------------------------------- -->

# Generics in TypeScript

### 1. Problem Statement

Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.

How would you solve this problem?

**Solution :** 
```typescript
function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement([1, 2, 3]);
```

### What is the problem in this approach?

 - User can send different types of values in inputs, without any type errors
 ```typescript
function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement([1, 2, '3']);
 ```

 - Typescript isn’t able to infer the right type of the return type
 ```typescript
function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
console.log(el.toLowerCase());
// This will through an error : "Property "toLowerCase" does not exists on type `string | number`"
 ```

 ### Solution - Generics

    Generics enable you to create components that work with any data type while still providing compile-time type safety.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);
```

### Solution to original problem

Can you modify the code of the original problem now to include generics in it?

```typescript
function getFirstElement<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
console.log(el.toLowerCase())
```

<!-- ----------------------------------------------------------------------------------- -->

# Imports and Exports in TypeScript

TypeScript follows the ES6 module system, using import and export statements to share code between different files. Here's a brief overview of how this works:

 - Constant exports
```typescript
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

export function subtract(x: number, y: number): number {
    return x - y;
}
```

```typescript
// main.ts
import { add } from "./math"

add(1, 2)
```

 - Default exports
```typescript
export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
}
```

```typescript
// calculator.ts 
import Calculator from './Calculator';

const calc = new Calculator();
console.log(calc.add(10, 5));
```