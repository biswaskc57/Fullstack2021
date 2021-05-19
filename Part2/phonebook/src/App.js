import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

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

  console.log(newPhoneNumber);
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhoneNumber,
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
      <p>
        {" "}
        Filter:{" "}
        <input
          name="phoneNumber"
          onChange={(event) => setFilter(event.target.value)}
          value={filter}
        />
      </p>
      <h2>Add a new</h2>
      <form>
        <div>
          name:{" "}
          <input
            name="name"
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
          <p>
            Phone no:{" "}
            <input
              name="phoneNumber"
              onChange={(event) => setNewPhoneNumber(event.target.value)}
              value={newPhoneNumber}
            />
          </p>
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
        <li key={person.name}>
          {person.name}: {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
