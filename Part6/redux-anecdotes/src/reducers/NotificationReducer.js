const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW NOTIFICATION":
      state = action.notification;
      console.log(state);
      return state;

    case "REMOVE NOTIFICATION":
      state = action.notification;
      console.log(state);
      return state;
    default:
      return state;
  }
};

export const setNotification = (notification, min) => {
  console.log(notification);
  return async (dispatch) => {
    dispatch({
      type: "NEW NOTIFICATION",
      notification,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE NOTIFICATION",
        notification: null,
      });
    }, min);
  };
};

export default notificationReducer;
