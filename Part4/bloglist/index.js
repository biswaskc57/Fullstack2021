require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});
/*
app.get("/api/blogs/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(request.params.id);
  const blog = blogs.find((blog) => blog.id === id);
  console.log(blog);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});*/

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);
  console.log(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

/*app.delete("/api/blogs/:id", (request, response) => {
  const id = Number(request.params.id);
  blogs = blogs.filter((blog) => blog.id !== id);
  console.log(blogs);
  response.status(204).end();
});*/

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
