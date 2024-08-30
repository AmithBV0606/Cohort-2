const express = require("express");
const app = express();
const port = 5000;

let users = [{
    name:"Jhon",
    kidneys: [{
        healthy:true,
    }, {
        healthy: true,
    }]
}]

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
    const jhonKidneys = users[0].kidneys;
    const numberofKidneys = jhonKidneys.length;
    let healthyKidneys = jhonKidneys.filter((item) => {
        return item.healthy === true;
    })
    let unhealthyKidneys = numberofKidneys - healthyKidneys.length;
    res.json({
        NumberofKidneys : numberofKidneys,
        NumberofhealthyKidneys : healthyKidneys.length,
        NumberofunhealthyKidneys : unhealthyKidneys,
    })
});
// Note : While using get request best way to send the data is through query parameters.

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!",
    })
});
// Note : While using post request best way to send the data is through body.

app.put("/", (req, res) => {
    const updated = users[0].kidneys.map((item) => {
        return {healthy:false}
    });
    users[0].kidneys = updated;
    res.json({
        Update: "Success",
    })
});

app.delete("/", (req, res) => {
    users[0].kidneys = [];

    res.json({
        msg: "Done!!"
    });
});

app.listen(port);