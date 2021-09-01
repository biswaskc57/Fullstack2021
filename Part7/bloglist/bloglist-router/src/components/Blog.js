import React, { useState } from "react";

import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog, createComments } from "../reducers/blogReducer";

const Blog = ({ match, blogs, user }) => {
  const [comment, setComment] = useState(null);

  const dispatch = useDispatch();
  console.log(comment);
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  console.log(user);
  console.log(blog);
  console.log(user);

  const commentsHandler = (event) => {
    event.preventDefault();
    setComment({ desc: event.target.value });
  };

  console.log(comment);

  const commentButtonHandler = async () => {
    if (comment === null || comment.desc === "") {
      dispatch(setNotification("Empty comment.", 5000));
    } else {
      try {
        const id = blog.id;
        const blogObject = {
          user: blog.user.id,
          likes: blog.likes,
          author: blog.author,
          title: blog.title,
          url: blog.url,
          comments: blog.comments.concat(comment),
        };
        console.log();
        dispatch(createComments(id, blogObject));
        dispatch(
          setNotification(
            `New comment added for the blogpost  ${blogObject.title}`,
            5000
          )
        );
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleLike = async () => {
    try {
      const id = blog.id;
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        comments: blog.comments,
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
      <div>
        <p>
          Comments:
          <input id="comments" onChange={commentsHandler} />
          <button onClick={commentButtonHandler}>Add comment</button>
        </p>
        <h1>Comments</h1>
        {blog.comments.map((comment, id) => (
          <li key={id}>{comment.desc}</li>
        ))}
      </div>
    </div>
  );
};

export default Blog;
