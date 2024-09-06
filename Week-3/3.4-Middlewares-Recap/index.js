const express = require("express");
const app = express();

function ageMiddleware(req, res, next) {
    const age = req.query.age;

    if (age >= 14) {
        next();
    } else {
        res.json({
            msg : "Sorry you're too young for the ride"
        })
    }
}

app.use(ageMiddleware);

app.get("/ride1", (req, res) => {
    res.json({
        msg: "You have successfully riden the ride 1"
    })
});

app.get("/ride2", (req, res) => {
    res.json({
        msg: "You have successfully riden the ride 2"
    })
});

// app.use(ageMiddleware);
// If we use the "app.use" here, the "ageMiddleware" middleware function will only be applied to the last route i.e "/ride3".

app.get("/ride3", (req, res) => {
    res.json({
        msg: "You have successfully riden the ride 3"
    })
});

app.listen(3000);