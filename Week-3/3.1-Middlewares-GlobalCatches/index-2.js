// Global Catches : Global error handling in Express.js

const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Amith!!")
});

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const length = kidneys.length;

    res.send("You have " + length + " Kidneys!!");
});

// If user doesn't sends any form of data in the body, then the server might crash and the error or exception messages will be exposed to the user, which might be dangerous for our website, in order to prevent this we use ZOD library

// We also have another middleware called global catches or ERROR based middleware using which we can handle these type of errors.

// Global Catches : Have to add this middleware only once in our codebase
app.use((err, req, res, next) => {
    res.send({
        msg: "Sorry,  our server is Down!!"
    })
});

app.listen(port);