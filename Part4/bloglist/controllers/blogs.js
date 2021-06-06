blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
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

blogsRouter.post("/", (request, response) => {
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
module.exports = blogsRouter;
