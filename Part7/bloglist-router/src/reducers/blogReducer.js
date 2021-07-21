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

      //user object is derived from the object to be edited
      //user id is derived from the object to be edited
      const user = action.originalUser;

      console.log(blogToLike);
      console.log(user);

      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes,
        user: user,
        id: action.id,
      };
      console.log(likedBlog);

      const blogs = state.map((blog) =>
        blog.id === action.id ? likedBlog : blog
      );
      return blogs;

    case "DELETE":
      const deletedBlog = action.data;

      return state.filter((blog) => blog.id !== deletedBlog.id);

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
export const likeBlog = (likedBlog, id, blogUser) => {
  return async (dispatch) => {
    const blog = await blogServices.update(id, likedBlog);

    //returned blog doesnt contain user detail and id
    console.log(blog);
    //so the bloguser and id from blog to be edited has been used
    dispatch({
      type: "LIKE",
      data: blog,
      originalUser: blogUser,
      id: id,
    });
  };
};
export default blogReducer;
