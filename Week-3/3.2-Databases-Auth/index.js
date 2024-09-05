const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://amithrao0606:FGIBaaJITOoe0UmC@cluster0.teeye.mongodb.net/user_app?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = mongoose.model("users", {
  name: String,
  email: String,
  pasword: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
  try {
    const data = await userSchema.findOne({ username: username });
    if (data) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function findUserFromDB(email) {
  const response = await userSchema.find({ email: email });
  const data = await response.json();
  return data;
}

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new userSchema({
    name: name,
    email : email,
    password : password
  });

  newUser.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/signin", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!userExists(email, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our database",
    });
  }

  var token = jwt.sign({ email: email }, jwtPassword);

  let siginMsg = `Signed In as ${name}`;

  return res.json({
    siginMsg,
    token,
  });
});

app.get("/user", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const email = decoded.email;

  const data = await userSchema.find({ email: email });

  const name = data.map((item) => {
    return item.name;
  })
  
  res.send(`Logged in as ${name}`)
})

app.listen(3000);