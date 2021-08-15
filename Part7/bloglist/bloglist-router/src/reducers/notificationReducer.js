/* eslint-disable indent */
const initialState = null;
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW NOTIFICATION":
      state = action.notification;
      console.log(state);

      return state;

    case "REMOVE NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};
let timeoutId;
export const setNotification = (notification, sec) => {
  clearTimeout(timeoutId);
  console.log(notification);
  console.log(sec);

  return async (dispatch) => {
    dispatch({
      type: "NEW NOTIFICATION",
      notification,
    });

    timeoutId = setTimeout(() => {
      dispatch({ type: "REMOVE NOTIFICATION", notification: null });
    }, sec);
  };
};

export default notificationReducer;
