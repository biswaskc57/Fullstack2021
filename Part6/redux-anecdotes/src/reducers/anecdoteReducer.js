const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((n) => n.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );

    default:
      console.log(state);
      return state;
  }
};

export const createAnecdote = (data) => {
  return {
    type: "NEW ANECDOTE",
    data,
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export default anecdoteReducer;
