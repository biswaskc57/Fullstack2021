import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  console.log(name);
  useEffect(() => {
    const fetchData = async () => {
      if (name === null) {
        setCountry(null);
      } else {
        try {
          const newCountry = await axios.get(
            "https://restcountries.eu/rest/v2/name/" + name + "?fullText=true"
          );
          setCountry(newCountry);
          console.log(country);
        } catch (error) {
          console.log(error.toJSON());
          setCountry("undefined");
        }
      }
    };

    fetchData();
    console.log(fetchData());
  }, [name]);

  console.log(country);
  return country;
};

const Country = ({ country }) => {
  console.log(country);
  if (country === null) {
    return null;
  }

  if (country === "undefined") {
    return <div>not found</div>;
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div>
      <img
        src={country.data[0].flag}
        height="100"
        alt={`flag of ${country.data[0].name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState(null);
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
