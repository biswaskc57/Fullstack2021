const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER ANECDOTES":
      const msg = action.filter;
      console.log(msg);
      return msg;
    default:
      console.log(state);
      return state;
  }
};
export const setFilter = (filter) => {
  return {
    type: "FILTER ANECDOTES",
    filter,
  };
};
export default filterReducer;
