// Enums 

// Alternatives to Enums 

// type keyInput = "up" | "down" | "left" | "right";

// function doSomething(keyPressed:keyInput) {
    
// }

// doSomething('up');
// doSomething("no"); // Error

enum Direction {
    Up,
    Down,
    Left,
    Right
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Up);
console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);

// This tells you that by default, enums get values as 0 , 1, 2...