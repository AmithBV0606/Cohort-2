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
exports.client = void 0;
// // write a function to create a users table in your database.
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    connectionString: "postgresql://testDB_owner:t2rjwZ3uSdRI@ep-restless-cloud-a5504hb6.us-east-2.aws.neon.tech/testDB?sslmode=require"
});
// t2rjwZ3uSdRI
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.client.connect(); // It takes some time for "pg" library to connect to the postgres database
        const result = yield exports.client.query(`
        CREATE TABLE users (
            id   SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );    
    `);
        console.log(result);
    });
}
createUserTable();
