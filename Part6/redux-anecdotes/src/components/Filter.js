import React from "react";
import { setFilter } from "../reducers/FilterReducer";
import { useDispatch } from "react-redux";
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    event.preventDefault();
    dispatch(setFilter(event.target.value));
    console.log(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
