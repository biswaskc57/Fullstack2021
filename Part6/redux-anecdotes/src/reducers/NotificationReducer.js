const initialState = "this is a notification";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW NOTIFICATION":
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
