/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import BlogForm from "./Blogform";
import Togglable from "./Togglable";
import { setNotification } from "../reducers/notificationReducer";

import { initialBlogs, createBlog } from "../reducers/blogReducer";

const Bloglist = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const blog = dispatch(initialBlogs());
    console.log(blog);
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);

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

  return (
    <div>
      <p>hello</p>
      {blogs
        .sort(function (a, b) {
          return b.likes - a.likes;
        })
        .map((blog) => (
          <Blog blog={blog} blogs={blogs} user={user} key={blog.id} />
        ))}
    </div>
  );
};

export default Bloglist;
