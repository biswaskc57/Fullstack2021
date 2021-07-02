import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content} has {anecdote.votes} votes
      <button onClick={handleClick}>vote</button>
    </li>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

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
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          />
        ))}
    </ul>
  );
};
export default AnecdoteList;
