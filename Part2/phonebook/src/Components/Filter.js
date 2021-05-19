import React, { useState } from "react";

const Filter = (props) => {
  console.log(props.handler);

  return (
    <div>
      <p>
        {" "}
        Filter: <input onChange={props.handler} />
      </p>
    </div>
  );
};

export default Filter;
