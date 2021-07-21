import React, { useState } from "react";

import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };
  const dispatch = useDispatch();

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

      dispatch(likeBlog(blogObject, id));
      dispatch(setNotification(`You have voted ${blogObject.title}`, 5000));
    } catch (exception) {
      dispatch(setNotification(exception.message, 5000));
    }
  };

  const handleDelete = async () => {
    const id = blog.id;
    dispatch(deleteBlog(id));
    const result = window.confirm(
      `Remove blog  ${blog.title} by ${blog.author}`
    );
    if (result === true) {
      try {
        dispatch(
          setNotification(`${blog.title} by ${blog.author} deleted`, 5000)
        );
      } catch (exception) {
        dispatch(setNotification(exception.message, 5000));
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
