const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if (!usernameResponse.success || !passwordResponse.success) {
        return null;
    }

    const signature = jwt.sign({
        username
    }, jwtPassword);

    return signature;
}

function decodeJwt(token) {
    const decoded = jwt.decode(token);

    if (decoded) {
        return true;
    } else {
        return false;
    }
}

function verifyJwt(token){
    // If there is any error in the token, the jwt.verify method throws an exception which cannot be handled by the if-else statements, we need to use try-catch

    let ans = true;
    try {
        jwt.verify(token, jwtPassword);
    } catch (error) {
        ans = false;
    }
    return ans;
}

const ans1 = signJwt("efjkvn@gmail.com", "1234567");
console.log(ans1);

const ans2 = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
console.log(ans2);

const ans3 = verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVmamt2bkBnbWFpbC5jb20iLCJpYXQiOjE3MjU1NDg1NTd9.zyLnwfSH4NoqeDU8z5dKPmCdZK4qJWLWwK6YXijqGZM");
console.log(ans3)