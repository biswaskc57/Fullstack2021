const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW NOTIFICATION":
      state = action.data.content;
      return state + " has been added";
    case "VOTE NOTIFICATION":
      state = action.data.content;
      return state + " has been voted";
    case "REMOVE NOTIFICATION":
      state = action.data.content;
      return state;
    default:
      return state;
  }
};
export const createAddNotification = (content) => {
  return {
    type: "NEW NOTIFICATION",
    data: {
      content: content,
    },
  };
};
export const createVoteNotification = (content) => {
  return {
    type: "VOTE NOTIFICATION",
    data: {
      content: content,
    },
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE NOTIFICATION",
    data: {
      content: null,
    },
  };
};

export default notificationReducer;
