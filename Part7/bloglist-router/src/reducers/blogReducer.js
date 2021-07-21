/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL BLOGS":
      console.log(action.data);
      state = action.data;
      return state;
    case "NEW BLOG":
      return [...state, action.data];
    case "LIKE":
      const blogToLike = action.data;
      console.log(blogToLike);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes,
      };
      console.log(likedBlog);
      console.log(action.id);
      const blogs = state.map((blog) =>
        blog.id === action.id ? blogToLike : blog
      );
      console.log(blogs);
      return blogs;

    default:
      return state;
  }
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(object);
    dispatch({ type: "NEW BLOG", data: newBlog });
  };
};

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    console.log(blogs);
    dispatch({ type: "INITIAL BLOGS", data: blogs });
  };
};
export const likeBlog = (likedBlog, id) => {
  return async (dispatch) => {
    const blog = await blogServices.update(id, likedBlog);
    console.log(blog);
    dispatch({
      type: "LIKE",
      data: blog,
      id: id,
    });
  };
};
export default blogReducer;
