const jwt = require("jsonwebtoken");

const value = {
    name:"Amith",
    accountNumber: 12345678
}

// JWT methods 

// 1) Generating a JWT token : Sign method is used.
const token = jwt.sign(value, "secret");

// this token has been generated using this secret, and hence this token can only be verified using this secret.

// console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW1pdGgiLCJhY2NvdW50TnVtYmVyIjoxMjM0NTY3OCwiaWF0IjoxNzI1NTQ0MDY2fQ.JoSoxc_KNn_eLYBhylJ1JP_d8n0lUqDVXrIIla0xQaA

// This is your checkbook. The above string can be decoded by anyone.

// 2) Verifying a Token : 
const verify = jwt.verify(token, "secret");
console.log(verify);
// { name: 'Amith', accountNumber: 12345678, iat: 1725544435 }

// 3) Decoding the token : 
var decoded = jwt.decode(token);
console.log(decoded);
// { name: 'Amith', accountNumber: 12345678, iat: 1725545424 }

// ______________________________________________________

// Trying to verify the decoded JWT, which was decoded by intruder.js file. 

// const verify2 = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW1pdGgiLCJhY2NvdW50TnVtYmVyIjoxMjM0NTY3OCwiaWF0IjoxNzI1NTQ0MDY2fQ.Ng3V0Onbkmvag0W7EckeSMrzQbASIqjq0KQ5T-wIuUk", "secret");

// console.log(verify2); // invalid signature

// ______________________________________________________