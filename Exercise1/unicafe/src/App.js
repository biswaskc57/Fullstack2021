import React, { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.goodHandler}>Good</button>
      <button onClick={props.badHandler}>Bad</button>
      <button onClick={props.neutralHandler}>Neutral</button>
    </div>
  );
};
const Statistics = (props) => {
  return (
    <div>
      <table style={{ width: "40%" }}>
        <tr>
          <td style={{ width: "30%" }}>{props.text}:</td>
          <td style={{ width: "70%" }}> {props.value}</td>
        </tr>
      </table>
    </div>
  );
};

const Statistic = (props) => {
  console.log(props.good);
  if (props.sum < 1) {
    return (
      <div>
        <p>No feedbacks yet!</p>
      </div>
    );
  } else
    return (
      <div>
        <h1>Statistics:</h1>
        <div>
          {" "}
          <Statistics text="Good" value={props.good} />
          <Statistics text="Neutral" value={props.neutral} />
          <Statistics text="Bad" value={props.bad} />
          <Statistics text="All" value={props.sum} />
          <Statistics text="Average" value={(props.sum / 3).toFixed(2)} />
          <Statistics
            text="positive rate"
            value={(props.good / props.sum).toFixed(2) * 100 + " %"}
          />
        </div>
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

  let sum = good + bad + neutral;

  return (
    <div className="App">
      <h1>Give feedback:</h1>

      <Button
        goodHandler={clickHandlerGood}
        badHandler={clickHandlerBad}
        neutralHandler={clickHandlerNeutral}
      />
      <Statistic sum={sum} good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
