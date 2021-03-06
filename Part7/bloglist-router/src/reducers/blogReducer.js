/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL BLOGS":
      state = action.data;
      return state;
    case "NEW BLOG":
      return [...state, action.data];
    case "LIKE":
      const blogToLike = action.data;

      const blog = state.find((blog) => blog.id === action.id);
      console.log(blog);

      const likedBlog = { ...blog, likes: blogToLike.likes };

      const blogs = state.map((blog) =>
        blog.id === action.id ? likedBlog : blog
      );
      return blogs;

    case "DELETE":
      const deletedBlog = action.data;
      console.log(deletedBlog);
      const bloglist = state.filter((blog) => blog.id !== deletedBlog.id);
      console.log(bloglist);
      return bloglist;

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
export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogServices.remove(id);
    dispatch({ type: "DELETE", data: deletedBlog });
  };
};

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch({ type: "INITIAL BLOGS", data: blogs });
  };
};
export const likeBlog = (likedBlog, id) => {
  return async (dispatch) => {
    const blog = await blogServices.update(id, likedBlog);
    dispatch({
      type: "LIKE",
      data: blog,
      id: id,
    });
  };
};
export default blogReducer;
