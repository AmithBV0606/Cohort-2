const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// Middlewares
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});