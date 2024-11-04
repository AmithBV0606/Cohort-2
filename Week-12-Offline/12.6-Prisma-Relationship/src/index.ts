import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Insert Operation : 
async function insertUser(username: string, password:string, firstName: string, lastName:string, email:string) {
    const response = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            email
        }
    });

    console.log(response);
}

// insertUser("amith_rao", "Amith@123", "Amith", "Rao", "amithrao0606@gmail.com");
// insertUser("sid0505", "Sid@123", "Sidvin", "Hegde", "sid0505@gmail.com");

// Update Operation : 
interface updateParams {
    firstName : string;
    lastName : string;
}

async function updateUser(username: string, {firstName, lastName} : updateParams) {
    const response = await prisma.user.update({
        where: {
            username
        },
        data: {
            firstName,
            lastName
        }
    });

    console.log(response);
}

// updateUser("amith_rao", {firstName:"Vikranth", lastName:"Rona"});

// Get a user’s details
async function getUser(username: string) {
    const response = await prisma.user.findFirst({
        where: {
            username
        }
    });

    console.log(response);
}

// getUser("amith_rao");
// getUser("sid0505");

// ___________________________________________________________________________________

// createTodo
async function createTodo(userId: number, title: string, description: string) {
    const response = await prisma.todo.create({
        data : {
            userId,
            title,
            description
        }
    });

    console.log(response);
}

// createTodo(1, "go to gym", "go to gym and do 10 pushups");

// Get Todos
async function getTodos(userId: number, ) {
    const todos = await prisma.todo.findMany({
        where: {
        userId: userId,
        },
    });
    console.log(todos);
}

// getTodos(1);

// getTodosAndUserDetails (JOINS)
async function getTodosAndUserDetails(userId: number, ) {
    const response = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            title: true,
            description: true,
            User: true
        }
    });

    console.log(response);
}

getTodosAndUserDetails(1);