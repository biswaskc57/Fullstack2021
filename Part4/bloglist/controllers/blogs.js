/* eslint-disable no-undef */
blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = new Blog(request.body);

  let bloglikes;

  if (body.likes === undefined) {
    bloglikes = 0;
  } else {
    bloglikes = body.likes;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: bloglikes,
  });
  console.log(body);
  console.log(body.save());
  const savedBlog = await blog.save();

  console.log(savedBlog);

  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = new Blog(request.body);

  console.log(body);
  const blog = {
    likes: body.likes,
  };

  console.log(request.params.id);
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  console.log(updatedBlog);
  response.json(updatedBlog);
});

module.exports = blogsRouter;
