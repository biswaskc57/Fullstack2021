import React, { useState } from "react";
export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input onChange={titleHandler} />
        </p>
        <p>
          Author:
          <input onChange={authorHandler} />
        </p>
        <p>
          Url:
          <input onChange={urlHandler} />
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </div>
  );
}
