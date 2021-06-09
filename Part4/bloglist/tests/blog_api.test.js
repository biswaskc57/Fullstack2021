const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "promised freedom",
    author: "Obama",
    url: "www.cnn.com",
    likes: 22,
    id: "60bcf08f008e3f0c2188334c",
  },
  {
    title: "Walk to the moon",
    author: "elon mush",
    url: "www.bbc.com",
    likes: 44,
    id: "60bcf0c4008e3f0c2188334d",
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
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

  expect(response.body).toHaveLength(initialBlogs.length);
});
afterAll(() => {
  mongoose.connection.close();
});
