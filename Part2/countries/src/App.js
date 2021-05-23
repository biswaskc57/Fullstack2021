import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import Country from "./components/country";

import axios from "axios";
const App = (props) => {
  const [countries, setCountries] = useState([]);

  const [countryName, setCountryName] = useState("");

  const [button, setButton] = useState(false);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const buttonHandler = (value) => {
    console.log(countryName);
    setCountryName(value);
    console.log(countryName);
    button === false ? setButton(true) : setButton(false);
  };

  const filterHandler = (event) => {
    setCountryName(event.target.value);
  };
  let value;
  let all = countries
    .filter((names) =>
      names.name.toLowerCase().includes(countryName.toLocaleLowerCase())
    )
    .map((open) => ({
      name: open.name,
      capital: open.capital,
      population: open.population,
      value: open.name,
      flag: open.flag,
      languages: open.languages,
    }));

  console.log(countryName);
  console.log(all.length);

  return (
    <div>
      Find countries:
      <Filter handler={filterHandler} />
      <Country
        country={all}
        countryName={countryName}
        buttonHandler={buttonHandler}
        value={value}
        button={button}
      />
    </div>
  );
};

export default App;
