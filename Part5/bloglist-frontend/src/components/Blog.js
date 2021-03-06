import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user, setMsg }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

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

  const handleDelete = async () => {
    const id = blog.id;
    const result = window.confirm(
      `Remove blog  ${blog.title} by ${blog.author}`
    );
    if (result === true) {
      try {
        const deletedBlog = await blogService.remove(id);
        console.log(deletedBlog);
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
        setMsg(`${deletedBlog.title} by ${deletedBlog.author} deleted`);
        setTimeout(() => {
          setMsg(null);
          console.log(setMsg);
        }, 5000);
      } catch (exception) {
        setMsg(exception.message);
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      }
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideVisible = () => {
    return (
      <div style={hideWhenVisible} className="defaultBlog">
        <p>{blog.title} </p>
        {blog.author}{" "}
        <button onClick={() => setLoginVisible(true)}>show</button>
      </div>
    );
  };
  const showVisible = () => {
    return (
      <div style={showWhenVisible}>
        <span>{blog.title}</span> {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button>
        <p>{blog.url}</p>
        {blog.likes} likes
        <button id="likeButton" onClick={handleLike}>
          like blog
        </button>
        <p>{blog.user.name}</p>
        {user.name === blog.user.name ? (
          <button
            style={{
              backgroundColor: "azure",
            }}
            onClick={handleDelete}
          >
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      {hideVisible()}
      {showVisible()}
    </div>
  );
};

export default Blog;
