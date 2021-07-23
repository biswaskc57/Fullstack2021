/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import loginServices from "../services/login";

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
    const user = await loginServices.login({ username, password });
    console.log(user);
    dispatch({ type: "LOGIN", data: user });
  };
};
export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: "LOGOUT", data: null });
  };
};

export default userReducer;
