import React, { useState } from "react";
import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const copy = { ...points };

  const clickHandler = () => {
    setSelected(Math.floor(Math.random() * 5));

    return selected;
  };
  const voteClickHandler = () => {
    setPoints({ ...points, [selected]: points[selected] + 1 });
  };

  const highestVotedAnecdote = () => {
    let highestNum = 0;
    let answer;
    for (var i = 0; i < 5; i++) {
      if (points[i] > highestNum) {
        highestNum = points[i];
        console.log(i);
        console.log(anecdotes[i]);
        answer = anecdotes[i] + " has " + points[i] + " votes";
      }
    }
    return answer;
  };

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      {anecdotes[selected]}
      <p></p>
      Has {copy[selected]} votes
      <p>
        <button onClick={voteClickHandler}>Vote</button>
        <button onClick={clickHandler}>Next anecdote</button>
      </p>
      <div>
        <h1>Anecdote with most votes:</h1>
        <p>{highestVotedAnecdote()}</p>
      </div>
    </div>
  );
}

export default App;
