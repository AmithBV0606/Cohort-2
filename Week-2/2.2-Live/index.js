const express = require('express');
const app = express();
const port = 3000;

// Request handlers
app.get('/', (request, response) => {
    response.send("Hello AmithBV! \!")
});

app.get('/contact', (req, res) => {
    res.send("<h1>Contact</h1> \n ph: +91 6361670056");
})

app.post("/send", (req, res) => {
    res.send({
        msg: "Hello there!!",
    });
    console.log(req.headers)
});

app.listen(port, () => {
    console.log(`Example app  listening on port ${port}`);
});