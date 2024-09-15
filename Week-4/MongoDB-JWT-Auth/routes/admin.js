const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../models");
const router = Router();

const jwt = require("jsonwebtoken");
const secret = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await Admin.findOne({
    username: username,
    password: password,
  });

  if (result) {
    return res.json({
      msg: "Admin already exists.",
    });
  } else {
    const response = await Admin.create({
      username,
      password,
    });

    if (response) {
      return res.json({
        msg: "Admin account created successfully, now you can signin to your Admin account",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const adminExists = await Admin.find({
    username,
    password,
  });

  if (adminExists) {
    // Token creation
    const token = jwt.sign(
      {
        username,
      },
      secret
    );

    // Token returned to user
    res.json({
      token,
    });
  } else {
    res.status(411).json({
      msg: "Incorrect email or password"
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = parseInt(req.body.price);

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  if (newCourse) {
    res.json({
      msg: "Course created successfully",
      courseId: newCourse._id,
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const result = await Course.find({});

  if (result) {
    res.json(result);
  } else {
    res.json({
      msg: "Something went wrong",
    });
  }
});

module.exports = router;