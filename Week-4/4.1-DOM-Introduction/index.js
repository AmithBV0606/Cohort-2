// Now, lets say you don’t have access to the calculation logic on the frontend Lets assume its a hard problem that someone has exposed on a backend server And you need to hit the backend server and get back the value

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors()); 

app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a + b;
    res.json({
        sum : sum
    }); 
});

app.listen(port);