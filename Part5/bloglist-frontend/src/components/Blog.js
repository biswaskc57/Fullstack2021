import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user, setMsg }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  console.log(blog.user.name);
  const handleLike = async () => {
    try {
      const id = blog.id;
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      const updatedBlog = await blogService.update(id, blogObject);
      console.log(updatedBlog);
      blog.likes = updatedBlog.likes;
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (exception) {
      setMsg(exception.message);
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setLoginVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button>
        <p>{blog.url}</p>
        {blog.likes} likes<button onClick={handleLike}>like</button>
        <p>
          {blog.user.name}
          {"hello"}
        </p>
      </div>
    </div>
  );
};

export default Blog;
