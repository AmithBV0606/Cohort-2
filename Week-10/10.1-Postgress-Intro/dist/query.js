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
const _1 = require(".");
function queryUsersTable(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM users WHERE email = $1";
            const values = [email];
            const result = yield _1.client.query(query, values);
            if (result.rows.length > 0) {
                console.log("USER FOUND : ", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user found with the given email.');
                return null;
            }
        }
        catch (error) {
            console.log("ERROR : ", error);
        }
    });
}
queryUsersTable("amirao0606@gmail.com");
