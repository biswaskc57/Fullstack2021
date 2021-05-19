import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleButtonChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
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
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleButtonChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div> {persons.name}</div>
      {persons.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </div>
  );
};

export default App;
