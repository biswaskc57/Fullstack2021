import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Loginform from "./components/loginform";
import BlogForm from "./components/Blogform";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import setNotification from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  console.log(blogs);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  console.log(user);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("wrong username or password", 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
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
        const newBlog = await blogService.create(blogObject);
        console.log(newBlog);
        setBlogs(blogs.concat(newBlog));
        dispatch(
          setNotification(
            `a new blog ${blogObject.title} by ${blogObject.author} added`,
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
            <Blog
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              key={blog.id}
            />
          ))}
      </div>
    );
  }
}
