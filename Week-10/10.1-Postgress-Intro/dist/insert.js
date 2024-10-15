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
function insertUserData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const result = yield _1.client.query(insertQuery, values);
        if (result) {
            console.log("Insertion successful : ", result);
        }
    });
}
insertUserData("Varun M B", "vmb1221@gmail.com", "vmb@123");
