import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Loginform from "./components/loginform";
import Noteform from "./components/noteform";
import Notification from "./components/notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const usernameHandler = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const titleHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  console.log(username, password);

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
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMsg(`wrong credentials`);
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

  const addBlog = (blog) => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      blogService.create(blogObject).then((response) => {
        setBlogs(blogs.concat(blogObject));
        setMsg(`a new blog ${blogObject.title} by ${blogObject.author} added`);
        setTimeout(() => {
          setMsg(null);
          console.log(setMsg);
        }, 5000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={msg} />
        <Loginform
          username={usernameHandler}
          password={passwordHandler}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={msg} />
      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <Noteform
        create={addBlog}
        title={titleHandler}
        author={authorHandler}
        url={urlHandler}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
