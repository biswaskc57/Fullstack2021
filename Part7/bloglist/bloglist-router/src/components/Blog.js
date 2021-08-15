import React from "react";

import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ match, blogs, user }) => {
  const dispatch = useDispatch();

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  console.log(user);
  console.log(blog);

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

    const result = window.confirm(
      `Remove blog  ${blog.title} by ${blog.author}`
    );
    if (result === true) {
      try {
        dispatch(deleteBlog(id));
        dispatch(
          setNotification(`${blog.title} by ${blog.author} deleted`, 5000)
        );
      } catch (exception) {
        dispatch(setNotification(exception.message, 5000));
      }
    } else {
      dispatch(setNotification("Nothing was deleted", 5000));
    }
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!blog) {
    return null;
  }
  return (
    <div style={blogStyle}>
      <h2>
        {" "}
        <span>{blog.title}</span> {blog.author}
      </h2>
      <a href={blog.url} target="blank">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <button
        id="likeButton"
        style={{
          backgroundColor: "skyblue",
        }}
        onClick={handleLike}
      >
        like
      </button>
      <p>Added by {blog.user.name}</p>
      {user.name === blog.user.name ? (
        <button
          style={{
            backgroundColor: "red",
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

export default Blog;
