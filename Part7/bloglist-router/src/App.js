/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Bloglist from "./components/Bloglist";
import User from "./components/User";
import Loginform from "./components/loginform";
import BlogForm from "./components/Blogform";
import Notification from "./components/notification";

import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { initialBlogs, createBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/userReducer";
import storage from "../src/utils/storage";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const blog = dispatch(initialBlogs());
    console.log(blog);
  }, [dispatch]);

  useEffect(() => {
    const loginUser = storage.getUser();
    console.log(loginUser);
    dispatch(setUser(loginUser));
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  console.log(user);
  const blogs = useSelector((state) => state.blogs);

  const handleLogin = async (event) => {
    try {
      const user = dispatch(loginUser(username, password));
      console.log(user);
      event.preventDefault();
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5000));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");

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
        <Switch>
          <Route path="/"></Route>
          <Bloglist user={user} />
        </Switch>
        <Switch>
          <Route path="/users"></Route>
          <User />
        </Switch>
      </div>
    );
  }
};

export default App;
