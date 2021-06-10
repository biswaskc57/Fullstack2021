/* eslint-disable no-undef */
blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
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

blogsRouter.post("/", async (request, response) => {
  const body = new Blog(request.body);
  console.log(request.body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  response.json(savedBlog);
});

/*app.delete("/api/blogs/:id", (request, response) => {
    const id = Number(request.params.id);
    blogs = blogs.filter((blog) => blog.id !== id);
    console.log(blogs);
    response.status(204).end();
  });*/
module.exports = blogsRouter;
