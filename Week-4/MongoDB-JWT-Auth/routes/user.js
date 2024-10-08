const { Router } = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../models");
const router = Router();

const jwt = require("jsonwebtoken");
const secret = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const result = await User.findOne({
    username: username,
    password: password,
  });

  if (result) {
    return res.json({
      msg: "User already exists.",
    });
  } else {
    const response = await User.create({
      username,
      password,
    });

    if (response) {
      return res.json({
        msg: "User account created successfully, now you can login to your user account",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = await User.find({
    username,
    password,
  });

  if (userExists) {
    const token = jwt.sign(
      {
        username,
      },
      secret
    );
    res.json({
      token,
    });
  } else {
    res.status(411).json({
      msg: "Incorrect email or password",
    });
  }
});

router.get("/courses", async (req, res) => {
  const result = await Course.find({});

  if (result) {
    res.json(result);
  } else {
    res.json({
      msg: "Something went wrong",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;

  const result = await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  if (result) {
    return res.json({
      msg: "Purchase complete!",
    });
  } else {
    return res.json({
      msg: "Purchase failed!",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.username;
  const result = await User.findOne({
    username: username,
  });

  console.log(result);
  const courses = await Course.find({
    _id: {
      $in: result.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;

//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZtYjA1MDVAZ21haWwuY29tIiwiaWF0IjoxNzI2MTU4NTQ3fQ.zUdwhZHR5QrAI0ym2yao355LqCRdJtDeNHjDq7fUCq0"