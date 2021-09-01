/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import Bloglist from "./components/Bloglist";
import Blog from "./components/Blog";
import User from "./components/User";
import UserInfo from "./components/UserInfo";
import Loginform from "./components/loginform";
import BlogForm from "./components/Blogform";
import Notification from "./components/notification";

import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { initialBlogs, createBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/userReducer";
import { initialUsers } from "./reducers/userInfoReducer";
import storage from "../src/utils/storage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  console.log(users);
  const blogs = useSelector((state) => state.blogs);

  const userList = useSelector((state) => state.userList);
  console.log(userList);

  useEffect(() => {
    dispatch(initialBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loginUser = storage.getUser();
    console.log(loginUser);
    dispatch(setUser(loginUser));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initialUsers());
  }, [dispatch]);
  console.log(userList);

  const matchUser = useRouteMatch("/users/:id");
  const matchBlog = useRouteMatch("/blogs/:id");
  const history = useHistory();

  const handleLogin = async (event) => {
    const user = dispatch(loginUser(username, password));
    console.log(user);
    event.preventDefault();
    setUsername("");
    setPassword("");
    history.push("/");
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
        <BlogForm createBlog={addBlog} user={users} />
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

  if (users === null) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    );
  } else if (users !== null) {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ padding: "10" }}>
            <Link to="/">home</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">users</Link>

            <em>{users.name} logged in</em>
            <Button onClick={handleLogout}>logout</Button>
          </Toolbar>
        </AppBar>
        <div>
          <Notification />
        </div>
        <Switch>
          <Route path="/users/:id">
            <UserInfo match={matchUser} userList={userList} />
          </Route>
          <Route path="/blogs/:id">
            <Blog match={matchBlog} user={users} blogs={blogs} />
          </Route>
          <Route path="/blogs">
            <h1>Blogs:</h1>
            <h2>Create new Blog</h2>
            {blogForm()}
            <Bloglist user={users} blogs={blogs} />
          </Route>
          <Route path="/users">
            {" "}
            <User users={userList} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default App;
