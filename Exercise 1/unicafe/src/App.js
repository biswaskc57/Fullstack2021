import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
const Button = () => {
  return (
    <div>
      <p></p>
    </div>
  );
};

function App(props) {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [positive, setPositive] = useState(0);

  const clickHandlerGood = () => {
    setGood(good + 1);
  };
  const clickHandlerBad = () => {
    setBad(bad + 1);
  };
  const clickHandlerNeutral = () => {
    setNeutral(neutral + 1);
  };

  const all = () => {
    return good + bad + neutral;
  };

  return (
    <div className="App">
      <h1>
        Give feedback:
        <p>
          <button onClick={clickHandlerGood}>good</button>
          <button onClick={clickHandlerBad}>neutral</button>
          <button onClick={clickHandlerNeutral}>bad</button>
        </p>
        <p>Statistics:</p>
      </h1>
      <h5>good: {good}</h5>
      <h5>neutral: {bad}</h5>
      <h5>bad: {neutral}</h5>
      <h5>all: {all()}</h5>
      <h5>average: {(all() / 3).toFixed(2)}</h5>
      <h5>average: {(good / all()).toFixed(2) * 100}%</h5>
    </div>
  );
}

export default App;
