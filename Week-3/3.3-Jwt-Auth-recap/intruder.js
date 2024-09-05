const jwt = require("jsonwebtoken");

const contents = {
    "name": "Amith",
    "accountNumber": 12345678,
    "iat": 1725544066
}

const newToken = jwt.sign(contents, "shshsh");
console.log(newToken);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW1pdGgiLCJhY2NvdW50TnVtYmVyIjoxMjM0NTY3OCwiaWF0IjoxNzI1NTQ0MDY2fQ.Ng3V0Onbkmvag0W7EckeSMrzQbASIqjq0KQ5T-wIuUk

// Now if you pass this jwt into the index.js file to verify this token it would fail and the token will not be accepted.