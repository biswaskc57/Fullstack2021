/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Loginform from "./components/loginform";
import BlogForm from "./components/Blogform";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { initialBlogs, createBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/userReducer";
import storage from "../src/utils/storage";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const blog = dispatch(initialBlogs());
    console.log(blog);
  }, [dispatch]);

  useEffect(() => {
    const loginUser = storage.getUser();
    console.log(loginUser);
    dispatch(setUser(loginUser));
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");
      dispatch(setNotification("welcome to the blog app", 5000));
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5000));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setNotification("logged out", 5000));
    dispatch(logoutUser());
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <Loginform
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create blog">
        <BlogForm createBlog={addBlog} user={user} />
      </Togglable>
    );
  };

  const addBlog = async (blogObject) => {
    try {
      if (blogObject.title && blogObject.author) {
        dispatch(createBlog(blogObject));
        dispatch(
          setNotification(
            `a new blog '${blogObject.title}' by ${blogObject.author} added!`,
            5000
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    );
  } else if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        {blogForm()}
        {blogs
          .sort(function (a, b) {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <Blog blog={blog} blogs={blogs} user={user} key={blog.id} />
          ))}
      </div>
    );
  }
};

export default App;