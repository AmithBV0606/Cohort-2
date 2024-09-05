// Authentication Assignment

// Lets start by creating our assignment for today, A website which has 2 endpoints - 

// 1) POST /signin
// Body:{
//     username: string
//     password: string
// }

// Returns a json web token with username encrypted

// 2) GET /users
// Headers - Authorization header

// Returns an array of all users if user is signed in (token is correct). Returns 403 status code if not. 

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "amithbv0606@gmail.com",
    password: "123",
    name: "Amith B V",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
    // write logic to return true or false if this user exists in ALL_USERS array
    const verifyUser = ALL_USERS.filter((item) => {
        if (username === item.username && password === item.password) {
            return item;
        }
    });

    if (verifyUser) {
        return true;
    } else {
        return false;
    }
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);

  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    res.json({
        users: ALL_USERS.filter((item) => {
            if (item.username === username) {
                return false;
            } else {
                return true;
            }
        })
    })
});

app.listen(3000)