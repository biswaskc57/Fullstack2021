/* eslint-disable no-undef */
blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "title or url missing" });
  }

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

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    const blogToDelete = await Blog.findById(request.params.id);

    if (blogToDelete === null) {
      return response.status(404).json({ error: "blog not found" });
    } else if (
      user._id.toString() === blogToDelete.user.toString() &&
      blogToDelete !== null
    ) {
      const deletedBlog = await blogToDelete.delete();
      return response.json(deletedBlog);
    } else {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = new Blog(request.body);

  if (!body.likes) {
    body.likes = 0;
  }
  console.log(request.user._id.toString());

  const blogToUpdate = await Blog.findById(request.params.id);
  console.log(blogToUpdate);
  try {
    if (!blogToUpdate.user || !request.user._id) {
      return response.status(404);
    } else if (blogToUpdate.user.toString() === request.user._id.toString()) {
      const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      };
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        {
          new: true,
        }
      );
      return response.json(updatedBlog);
    } else {
      return response
        .status(401)
        .json({ error: "token is missing or invalid" });
    }
  } catch {
    next(error);
  }
});

module.exports = blogsRouter;
