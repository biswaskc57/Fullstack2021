const initialState = null;

//These variables are to check the actual time of the notification
// and are not from the exercise
var startDate;
var endDate;
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW NOTIFICATION":
      startDate = new Date();
      state = action.notification;
      console.log(state);

      return state;

    case "REMOVE NOTIFICATION":
      endDate = new Date();
      var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
      console.log(seconds);
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
