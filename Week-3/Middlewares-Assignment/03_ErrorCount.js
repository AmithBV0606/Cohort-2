// Problem Statement :

/* 
You have been given an express server which has a few endpoints. Your task is to : 
1. Ensure that if there is ever an exception, the end user sees a status code of 404
2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint
*/

const express = require("express");

const app = express();
let errorCount = 0;

app.get("/user", function (req, res) {
  throw new Error("User not found");
  res.status(200).json({
    name: "john",
    count: errorCount,
  });
});

app.post("/user", function (req, res) {
  res.status(200).json({
    msg: "created dummy user",
    count: errorCount,
  });
});

app.get("/errorCount", function (req, res) {
  res.status(200).json({ count: errorCount });
});

// Error-handling middleware [Global catches]
app.use((err, req, res, next) => {
    errorCount += 1;
    res.status(404).send({
        msg:"ERROR",
        count:errorCount
    })
});

app.listen(3000);