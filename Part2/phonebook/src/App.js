import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";
const App = (props) => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "notes");

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const nameHandler = (event) => setNewName(event.target.value);

  const numberHandler = (event) => setNewPhoneNumber(event.target.value);

  const filterHandler = (event) => setFilter(event.target.value);

  console.log(newPhoneNumber);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };
    const checkName = persons.map((allname, index) => {
      console.log(persons);
      console.log(allname);
      return allname.name;
    });

    !checkName.includes(newName)
      ? persons.concat(personObject)
      : alert(newName + " is already on the list");
  };

  return (
    <div>
      <Filter handler={filterHandler} />
      <h2>Add a new:</h2>
      <PersonForm
        persons={persons}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons person={persons} filter={filter} />
      <div></div>
    </div>
  );
};

export default App;
