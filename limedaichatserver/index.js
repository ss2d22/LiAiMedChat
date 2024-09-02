const express = require("express");
const dotenv = require("dotenv");

//setup
dotenv.config();
const app = express();

// PORT setup
const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle the error
    throw new Error(error.message);
  });
