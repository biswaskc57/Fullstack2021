import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createAddNotification,
  removeNotification,
} from "../reducers/NotificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(createAddNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};
export default AnecdoteForm;
