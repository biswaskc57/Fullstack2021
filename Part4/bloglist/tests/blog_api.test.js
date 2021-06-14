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
  await Blog.insertMany(helper.initialBlogs);
});

describe("blogs status", () => {
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
});
describe("addition of a blog", () => {
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

  test("if likes is missing, it is valued to 0", async () => {
    const newBlog = {
      title: "Java over javascript",
      author: "Kari korhonen",
      url: "www.hh-kari.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const blog = blogsAtEnd.filter(
      (blog) => blog.title === "Java over javascript"
    );
    const like = blog[0].likes;
    console.log(blog);

    console.log(like);
    expect(like).toBe(0);
  });

  test("blog without title and url is not added", async () => {
    const newBlog = {
      author: "Lawdasur mama",
      likes: 69,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

/*describe("deletion of a blog", () => {
  test("succeeds with a status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();

    console.log(blogsAtStart);
    const blogToDelete = blogsAtStart[0];

    console.log(blogToDelete.id);

    await api.delete(`/api/blogs/:${blogToDelete.id}`);
    expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    console.log(blogsAtEnd);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});*/

afterAll(() => {
  mongoose.connection.close();
});
