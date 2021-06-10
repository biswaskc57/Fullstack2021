/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test(" Blog id is defined", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body.map((body) => body.id);

  console.log(id);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Basics of Javascript",
    author: "Mr KC",
    url: "www.bkc.com",
    likes: 4423,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);

  expect(titles).toContain("Basics of Javascript");
});

afterAll(() => {
  mongoose.connection.close();
});
