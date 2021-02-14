const express = require("express");
const morgan = require("morgan");

// express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// listen for requests

app.listen(3000, "localhost", () => {
  console.log("server is listen on port 3000");
});

// middleware & statics files
app.use(express.static('public'))
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// 404 pages

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});
