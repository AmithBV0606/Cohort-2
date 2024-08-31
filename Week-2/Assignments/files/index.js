/*
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,

  Task 1 : GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
    
  Task 2 : GET /file/:filename - Returns content of given file by name
    Description: Use the filename from the request path parameter to read the file from `./files/` directory
    Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
    Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */

const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to file system backend</h1><p>Please Visit http://localhost:3000/files</p>");
})

app.get("/files", (req, res) => {
  // console.log(__dirname); // C:\Users\Admin\OneDrive\Desktop\Cohort-2\Week-2\Assignments\files
  fs.readdir(__dirname, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve files' });
    } else {
      res.status(200).send(data);
    }
  })
});

app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, req.params.filename);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    } 
    res.send(data)
  })
})

app.listen(port); 