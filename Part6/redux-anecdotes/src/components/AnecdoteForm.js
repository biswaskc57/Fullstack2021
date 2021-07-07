import React from "react";

import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/NotificationReducer";
import { connect } from "react-redux";
const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    props.createAnecdote(content);
    props.setNotification(`${content} has been added.`, 5000);
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value));
    },
    setNotification: (value) => {
      dispatch(setNotification(value));
    },
  };
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
