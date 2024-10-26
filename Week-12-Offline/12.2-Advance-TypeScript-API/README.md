# Advance TypeScript API's

## 1) Pick

    The Pick utility type/interface in TypeScript is a powerful feature that allows you to construct new types/interfaces by selecting a subset of properties from an existing type. 
    
    This can be particularly useful when you need to work with only certain fields of a complex type, enhancing type safety and code readability without redundancy.

#### Syntax :
The `Pick` utility type is part of TypeScript's mapped types, which enable you to create new types based on the keys of an existing type. The syntax for `Pick` is as follows:
```typescript
Pick<Type, Keys>
```
- `Type`: The original type you want to pick properties from.
- `Keys`: The keys (property names) you want to pick from the `Type`, separated by `|` (the union operator).

### Benefits of Using `Pick`

1. **Enhanced Type Safety**: By creating more specific types for different use cases, you reduce the risk of runtime errors and make your intentions clearer to other developers.
2. **Code Readability**: Using `Pick` to create descriptive types can make your code more readable and self-documenting.
3. **Reduced Redundancy**: Instead of defining new interfaces manually for subsets of properties, `Pick` allows you to reuse existing types, keeping your code DRY (Don't Repeat Yourself).

## 2) Partial  
    The Partial utility type in TypeScript is used to create a new type by making all properties of an existing type optional. 
    
    This is particularly useful when you want to update a subset of an object's properties without needing to provide the entire object.

#### Syntax : 
The `Partial` utility type takes a single type argument and produces a type with all the properties of the provided type set to optional. Here's the syntax for using `Partial`:
```typescript
Partial<Type>
```
- `Type`: The original `type` you want to convert to a type with optional properties.

### Benefits of Using `Partial`

1. **Flexibility in Updates**: `Partial` is ideal for update operations where you may only want to modify a few properties of an object.
2. **Type Safety**: Even though the properties are optional, you still get the benefits of type checking for the properties that are provided.
3. **Code Simplicity**: Using `Partial` can simplify function signatures by not requiring clients to pass an entire object when only a part of it is needed.

## 3) Readonly : 
    The Readonly utility type in TypeScript is used to make all properties of a given type read-only. 
    
    This means that once an object of this type is created, its properties cannot be reassigned. It's particularly useful for defining configuration objects, constants, or any other data structure that should not be modified after initialization.

#### Syntax : 
The `Readonly` utility type takes a type `T` and returns a type with all properties of `T` set as read-only.
```typescript
Readonly<Type>
```
- `Type`: The original type you want to convert to a read-only version.

### Example : Real life usecase
Consider an interface Config that represents configuration settings for an application:
```typescript
interface Config {
  endpoint: string;
  apiKey: string;
}
```
To ensure that a Config object cannot be modified after it's created, you can use the Readonly utility type:
```typescript
const config: Readonly<Config> = {
  endpoint: '<https://api.example.com>',
  apiKey: 'abcdef123456',
};

// Attempting to modify the object will result in a TypeScript error
// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.
```

**NOTE :** In this example, `config` is an object that cannot be modified after its initialization. Trying to reassign `config.apiKey` will result in a compile-time error, ensuring the immutability of the `config` object.

### Benefits of Using `Readonly`

1. **Immutability**: Ensures that objects are immutable after they are created, preventing accidental modifications.
2. **Compile-Time Checking**: The immutability is enforced at compile time, catching potential errors early in the development process.
3. **Clarity and Intent**: Using `Readonly` clearly communicates the intent that an object should not be modified, making the code easier to understand.

### Important Note

- It's crucial to remember that the `Readonly` utility type enforces immutability at the TypeScript level, which means it's a compile-time feature. 

- JavaScript, which is the output of TypeScript compilation, does not have built-in immutability, so the `Readonly` constraint does not exist at runtime. 

- This distinction is important for understanding the limitations of `Readonly` and recognizing that it's a tool for improving code quality and safety during development.

## 4) Records [Cleaner way to deal with objects]
    The Record utility type and the Map object in TypeScript offer two powerful ways to work with collections of key-value pairs. 

    Each has its own use cases and benefits, depending on the requirements of your application.

### Example using Records
```typescript
interface User {
  id: string;
  name: string;
}

// Using Record to type an object with string keys and User values
type Users = Record<string, User>;

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }
```

## Maps
    The Map object in TypeScript (inherited from JavaScript) represents a collection of key-value pairs where both the keys and values can be of any type. 
    
    Maps remember the original insertion order of the keys, which is a significant difference from plain JavaScript objects.

### Example using Maps : 
```typescript
interface User {
  id: string;
  name: string;
}

// Initialize an empty Map with string keys and User values
const usersMap = new Map<string, User>();

// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }
```

## 5) Exclude : 
      The Exclude utility type in TypeScript is used to construct a type by excluding from a union type certain members that should not be allowed. 

      It's particularly useful when you want to create a type that is a subset of another type, with some elements removed.

### Example using Exclude : 
```typescript
type EventType = 'click' | 'scroll' | 'mousemove';

// Using Exclude to create a new type without 'scroll'
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

// Function that accepts only 'click' and 'mousemove' events
const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK
handleEvent('mousemove'); // OK
// handleEvent('scroll'); // Error: Argument of type '"scroll"' is not assignable to parameter of type 'ExcludeEvent'.
```

## 6) Type Inferences In Zod

    When using zod we're doing runtime validation.

    Type inference in Zod is a powerful feature that allows TypeScript to automatically determine the type of data validated by a Zod schema. 
    
    This capability is particularly useful in applications where runtime validation coincides with compile-time type safety, ensuring that your code not only runs correctly but is also correctly typed according to your Zod schemas.

    You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .

### How Type Inference Works in Zod
    Zod schemas define the shape and constraints of your data at runtime. 
    
    When you use Zod with TypeScript, you can leverage Zod's type inference to automatically generate TypeScript types based on your Zod schemas. 
    
    This means you don't have to manually define TypeScript interfaces or types that replicate your Zod schema definitions, reducing redundancy and potential for error.

### Example :
```typescript
import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

type FinalUserSchema = z.infer<typeof, userProfileSchema>;

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  // Type of updateBody is inferred from userProfileSchema
  const updateBody:FinalUserSchema  = req.body;

  // update database here
  res.json({
    message: "User updated",
    updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```