const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");


// express app
const app = express();

// Connect to Mongo Db
const dbURL = "mongodb://localhost:27017/node-tuts";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)
    )
    .catch((err) => {
        console.log(err);
    });

// Register view engine
app.set("view engine", "ejs");


// middleware & statics files
app.use(express.static('public'))
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
// moongose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get("/all-blog", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("602923316723ce1094061106")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });



// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

app.get("/", (req, res) => {

    res.redirect("/blogs");
});
app.use((req, res, next) => {
  console.log("in the next middleware");
  next();
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog Routes
app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render("index", { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Details Blog", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

// 404 pages
  app.use((req, res) => {
    res.status(404).render("404", { title: "404 Page" });
  });
