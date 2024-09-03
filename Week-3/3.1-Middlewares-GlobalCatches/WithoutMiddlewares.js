// UGLY way : of Authentication and input validation

// const express = require("express");
// const app = express();

// app.get("/health-checkup", function (req, res) {
//   // do health checks here
//   const kidneyId = parseInt(req.query.kidneyId);
//   const username = req.headers.username;
//   const password = req.headers.password;

//   if (username != "harkirat" || password != "pass") {
//     res.status(403).json({
//       msg: "User doesnt exist",
//     });
//     return;
//   }

//   if (kidneyId === 1) {
//     res.send("You have only one Kidney!!");
//   } else if(kidneyId === 2){
//     res.send("Your both kidneys are fine!!");
//   } else {
//     res.status(411).json({
//         msg: "wrong inputs",
//       });
//     return;
//   }

//   // do something with kidney here

// //   res.send("Your kidney is healthy");
// });

// app.put("/replace-checkup", function (req, res) {
//     // do health checks here
//     const kidneyId = parseInt(req.query.kidneyId);
//     const username = req.headers.username;
//     const password = req.headers.password;
  
//     if (username != "harkirat" || password != "pass") {
//       res.status(403).json({
//         msg: "User doesnt exist",
//       });
//       return;
//     }
  
//     if (kidneyId === 1) {
//       res.send("We need to replace one of your kidneys!!");
//     } else if(kidneyId === 2){
//       res.send("We need to replace both the kidneys!!");
//     } else {
//       res.status(411).json({
//           msg: "wrong inputs",
//         });
//       return;
//     }
  
//     // do something with kidney here
  
//   //   res.send("Your kidney is healthy");
//   });

// app.listen(3000);

// Slightly better way : 

const express = require("express");
const app = express();

function usernameValidator(username, password) {
    if (username != "harkirat" && password != "pass") {
      return false;
    }
    return true;
  }
  
  function kidneyValidator(kidneyId) {
    if (kidneyId != 1 && kidneyId != 2) {
      return false;
    }
    return true;
  }
  
  app.get("/health-checkup", function (req, res) {
    // do health checks here
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;
  
    if (!usernameValidator(username, password)) {
      res.status(403).json({
        msg: "User doesnt exist",
      });
      return;
    }
  
    if (!kidneyValidator(kidneyId)) {
      res.status(411).json({
        msg: "wrong inputs",
      });
      return;
    }
  
    // do something with kidney here
  
    res.send("Your heart is healthy");
  });
  
  app.put("/replace-kidney", function (req, res) {
    // do health checks here
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;
  
    if (!usernameValidator(username, password)) {
      res.status(403).json({
        msg: "User doesnt exist",
      });
      return;
    }
  
    if (!kidneyValidator(kidneyId)) {
      res.status(411).json({
        msg: "wrong inputs",
      });
      return;
    }
  
    // do kidney replacement logic here
  
    res.send("Your heart is healthy");
  });

app.listen(5000);