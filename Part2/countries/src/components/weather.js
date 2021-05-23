import { useEffect, useState } from "react";
import axios from "axios";
export default function Weather(props) {
  console.log(props.capital);

  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    console.log("effect");
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          props.capital +
          "%20&APPID=d763e9e5a37ce1d7bde6af9100b11e66"
      )
      .then((response) => {
        console.log("promise fulfilled");

        setTemp(response.data.main.temp);
        setWeather(response.data.weather[0].description);
        setUrl(response.data.weather[0].icon);
        console.log(temp);
        console.log(weather);
      });
  }, []);
  console.log(temp);
  console.log(weather);

  return (
    <div>
      <p>Temparature: {(temp - 273.15).toFixed(2)} °C</p>
      <p>Weather desc: {weather} </p>
      <img alt="" src={`http://openweathermap.org/img/wn/${url}.png`} />
    </div>
  );
}
