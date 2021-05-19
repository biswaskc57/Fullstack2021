import React, { useState } from "react";

const PersonForm = (props) => {
  console.log(props.person);
  console.log(props.nameHandler);
  console.log(props.numberHandler);
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
