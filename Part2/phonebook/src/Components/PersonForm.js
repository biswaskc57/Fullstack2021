import React, { useState } from "react";

const PersonForm = (props) => {
  console.log(props.persons);
  console.log(props.nameHandler);
  console.log(props.numberHandler);
  return (
    <div>
      <form>
        name: <input onChange={props.nameHandler} />
        <p>
          Phone no: <input onChange={props.numberHandler} />
        </p>
        <button type="submit" onClick={props.addPerson}>
          add
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
