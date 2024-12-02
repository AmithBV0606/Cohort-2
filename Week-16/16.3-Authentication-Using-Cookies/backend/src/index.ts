import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "Amith@0101";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    // Will put the cookie in the set-cookie header
    res.cookie("token", token);
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (decode) {
        res.send({
            userId: decode.id
        })
    } else {
        res.send({
            message: "Something went wrong"
        });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    // res.cookie("token", "")
    res.json({
        message: "Logged out"
    })
});

app.listen(3000);