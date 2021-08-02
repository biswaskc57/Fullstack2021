/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";

import { setNotification } from "../reducers/notificationReducer";

import { initialBlogs, createBlog } from "../reducers/blogReducer";

const Bloglist = ({ user, blogs }) => {
  return (
    <div>
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
