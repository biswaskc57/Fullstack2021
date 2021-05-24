import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";
import useService from "./Components/services/persons";

const App = (props) => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    useService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response);
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
  console.log(newName);

  const deletePersonOf = (id, name) => {
    let confirms = window.confirm("Press ok to delete  " + name);
    confirms == true
      ? useService.deletePersons(id).then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
        })
      : alert(name + "was not deleted");
  };

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

    if (!checkName.includes(newName) && newName !== "") {
      useService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        console.log(response);
      });
    } else if (checkName.includes(newName)) {
      let confirms = window.confirm(
        "Do you want to change the phone number of " + newName + " ?"
      );

      //
      if (confirms === true) {
        const newPerson = persons.filter(
          (person) => person.name === newName
        )[0]; //returns a array of object which is same

        //changed person with the changed number
        const changedPerson = { ...newPerson, number: newPhoneNumber };

        const toUpdateId = newPerson.id;

        useService.update(toUpdateId, changedPerson).then((response) => {
          console.log(response);
          setPersons(
            persons.map((person) =>
              person.id !== toUpdateId ? person : response
            )
          );
          console.log(persons);
        });
      } else alert("something went wrong");
    }
  };
  console.log(persons);
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
      <ul>
        {persons
          .filter((name) => name.name.toLowerCase().includes(filter))
          .map((open, i) => (
            <Persons
              key={i}
              person={open}
              deletePerson={() => deletePersonOf(open.id, open.name)}
            />
          ))}
      </ul>

      <div></div>
    </div>
  );
};

export default App;
