import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

const Statistic = (props) => {
  console.log(props.good);
  if (props.sum < 1) {
    return (
      <div>
        <p>
          <button onClick={props.goodHandler}>good</button>
          <button onClick={props.badHandler}>bad</button>
          <button onClick={props.neutralHandler}>neutral</button>
        </p>
        No feedbacks yet!
      </div>
    );
  } else
    return (
      <div>
        <h1>
          <p>
            <button onClick={props.goodHandler}>good</button>
            <button onClick={props.badHandler}>bad</button>
            <button onClick={props.neutralHandler}>neutral</button>
          </p>

          <p>Statistics:</p>
        </h1>
        <h5>good: {props.good}</h5>
        <h5>neutral: {props.neutral}</h5>
        <h5>bad: {props.bad}</h5>
        <h5>all: {props.sum}</h5>
        <h5>average: {(props.sum / 3).toFixed(2)}</h5>
        <h5>average: {(props.good / props.sum).toFixed(2) * 100}%</h5>
      </div>
    );
};

function App(props) {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
  let sum = good + bad + neutral;

  return (
    <div className="App">
      <h1>
        Give feedback:
        <p>
          <Statistic
            goodHandler={clickHandlerGood}
            badHandler={clickHandlerBad}
            neutralHandler={clickHandlerNeutral}
            sum={sum}
            good={good}
            bad={bad}
            neutral={neutral}
          />
        </p>
      </h1>
    </div>
  );
}

export default App;
