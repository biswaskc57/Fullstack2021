import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
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
      ? setPersons(persons.concat(personObject))
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
