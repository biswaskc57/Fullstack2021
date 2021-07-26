/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import loginServices from "../services/login";
import storage from "../utils/storage";
import blogService from "../services/blogs";
const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      state = action.data;
      console.log(state);
      return state;
    case "LOGOUT":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  console.log(username, password);
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password });
      console.log(user);
      dispatch({ type: "LOGIN", data: user });
      storage.saveUser(user);
      blogService.setToken(user.token);
    } catch (error) {
      console.log(error);
      storage.saveUser("user is overrated");
    }
  };
};
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT", data: null });
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    storage.saveUser(user);
    if (user !== null) {
      blogService.setToken(user.token);
    }
    await dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};
export default userReducer;
