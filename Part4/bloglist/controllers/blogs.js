/* eslint-disable no-undef */
blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const user = await User.findById(body.userId);

  console.log(user);
  let bloglikes;

  if (body.likes === undefined) {
    bloglikes = 0;
  } else {
    bloglikes = body.likes;
  }

  //new Blog object is created.
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: bloglikes,
    user: user._id,
  });
  console.log(blog);

  //.save()method
  // Inserts a new document with request parameters
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
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
