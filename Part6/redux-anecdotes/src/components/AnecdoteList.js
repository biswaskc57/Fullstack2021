import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

import {
  createVoteNotification,
  removeNotification,
} from "../reducers/NotificationReducer";
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} has {anecdote.votes} votes
      <button onClick={handleClick}>vote</button>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      const anecdote = state.anecdotes
        .filter((anecdotes) =>
          anecdotes.content.toLowerCase().includes(state.filter.toLowerCase())
        )
        .map((anecdoteAfterFilter) => ({
          content: anecdoteAfterFilter.content,
          vote: anecdoteAfterFilter.votes,
          id: anecdoteAfterFilter.id,
        }));

      console.log(anecdote);
      return anecdote;
    } else if (state.filter === "") return state.anecdotes;
  });
  console.log(anecdotes);
  const handleVoteButton = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(createVoteNotification(anecdote.content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <ul>
      {anecdotes
        .sort(function (a, b) {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <Anecdote
            anecdote={anecdote}
            key={anecdote.id}
            handleClick={() => handleVoteButton(anecdote)}
          />
        ))}
    </ul>
  );
};
export default AnecdoteList;
