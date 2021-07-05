import anecdoteService from "../services/Anecdotes";
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      const anecdoteToVote = action.data;
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes,
      };
      return state.map((anecdote) =>
        anecdote.id !== anecdoteToVote.id ? anecdote : votedAnecdote
      );

    default:
      console.log(state);
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({ type: "NEW ANECDOTE", data: newAnecdote });
  };
};

export const voteAnecdote = (updatedAnecdote, id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.updateVote(id, updatedAnecdote);
    dispatch({
      type: "VOTE",
      data: anecdotes,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
