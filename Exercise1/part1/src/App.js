import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].name} : {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].name} : {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name} : {props.parts[2].exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  console.log(props.exercises);
  return (
    <p>
      Number of exercises:{" "}
      {props.part[0].exercises +
        props.part[1].exercises +
        props.part[2].exercises}
    </p>
  );
};

export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts} />
      <Total part={course.parts} />
    </div>
  );
}
