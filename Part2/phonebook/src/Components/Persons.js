import React from "react";

const PersonForm = (props) => {
  console.log(props.person);

  return (
    <div>
      {props.person
        .filter((name) => name.name.toLowerCase().includes(props.filter))
        .map((open) => (
          <li key={open.name}>
            {open.name}: {open.number}
          </li>
        ))}
    </div>
  );
};

export default PersonForm;
