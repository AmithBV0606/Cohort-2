const express = require("express");
const app = express();

// A function which returns a boolean value based on the age of the person

function isOldEnough(age) {
    if (age >= 14) {
        return true;
    } else {
        return false;
    }
}

app.get("/ride1", (req, res) => {
    if (isOldEnough(req.query.age)) {
        res.json({
            msg: "You have successfully riden the ride 1"
        });   
    } else {
        res.json({
            msg: "Sorry you're too young for the ride1"
        });
    }
});

app.get("/ride2", (req, res) => {
    if (isOldEnough(req.query.age)) {
        res.json({
            msg: "You have successfully riden the ride 2"
        });   
    } else {
        res.json({
            msg: "Sorry you're too young for the ride2"
        });
    }
});

app.listen(3000);