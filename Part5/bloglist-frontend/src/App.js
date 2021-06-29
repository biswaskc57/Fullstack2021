import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Loginform from "./components/loginform";
import BlogForm from "./components/Blogform";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [msg, setMsg] = useState(null);

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
      setMsg("wrong username or password");
      setTimeout(() => {
        setMsg(null);
        console.log(setMsg);
      }, 5000);
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
        setMsg(`a new blog ${blogObject.title} by ${blogObject.author} added`);
        setTimeout(() => {
          setMsg(null);
          console.log(setMsg);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={msg} />
        {loginForm()}
      </div>
    );
  } else if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={msg} />
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
              setMsg={setMsg}
              user={user}
              key={blog.id}
            />
          ))}
      </div>
    );
  }
}
