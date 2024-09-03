// ZOD library for input validation

const express = require("express");
const app = express();
const zod = require("zod");
const port = 3001;

app.use(express.json());

const mySchema = zod.array(zod.number());

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const validate = mySchema.safeParse(kidneys);

    if (!validate.success) {
        // res.status(411).json({
        //     msg: "Invalid Input"
        // });
        res.send({validate})
    }

    const length = kidneys.length;
    res.send("You have " + length + " Kidneys!!");
});

app.listen(port);