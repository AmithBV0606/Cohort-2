"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Insert Operation : 
function insertUser(username, password, firstName, lastName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
                email
            }
        });
        console.log(response);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const response = yield prisma.user.update({
            where: {
                username
            },
            data: {
                firstName,
                lastName
            }
        });
        console.log(response);
    });
}
// updateUser("amith_rao", {firstName:"Vikranth", lastName:"Rona"});
// Get a user’s details
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findFirst({
            where: {
                username
            }
        });
        console.log(response);
    });
}
// getUser("amith_rao");
// getUser("sid0505");
// ___________________________________________________________________________________
// createTodo
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todo.create({
            data: {
                userId,
                title,
                description
            }
        });
        console.log(response);
    });
}
// createTodo(1, "go to gym", "go to gym and do 10 pushups");
// Get Todos
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId,
            },
        });
        console.log(todos);
    });
}
// getTodos(1);
// getTodosAndUserDetails (JOINS)
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todo.findMany({
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
    });
}
getTodosAndUserDetails(1);
