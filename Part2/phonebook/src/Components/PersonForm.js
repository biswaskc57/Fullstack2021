import React from "react";

const PersonForm = (props) => {
  console.log(props.persons);

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
