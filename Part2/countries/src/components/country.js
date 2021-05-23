import Weather from "./weather";
export default function Country(props) {
  return (
    <div>
      {props.country.length <= 10 &&
      props.country.length !== 1 &&
      props.country.length !== 0 ? (
        <div>
          {props.country.map((country) => (
            <table>
              <thead></thead>
              <tbody key={country.callingCodes}>
                <tr>
                  <td>
                    {country.value}:
                    {
                      <button onClick={() => props.buttonHandler(country.name)}>
                        show details
                      </button>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      ) : props.country.length === 1 ? (
        <div>
          {props.country.map((country, i) => (
            <li key={i}>{country.value}</li>
          ))}
          <p>Capital: {props.country[0].capital}</p>
          <p>Population: {props.country[0].population}</p>
          <img
            src={props.country[0].flag}
            alt="text"
            width="170"
            height="100"
          />
          <p>Languages:</p>
          <ul>
            {props.country[0].languages.map((language, i) => (
              <li key={i}>{language.name}</li>
            ))}
          </ul>
          <Weather capital={props.country[0].capital} />
        </div>
      ) : props.country.length === 0 && props.countryName !== undefined ? (
        <div>No countries found with such a name</div>
      ) : (
        ""
      )}
    </div>
  );
}
