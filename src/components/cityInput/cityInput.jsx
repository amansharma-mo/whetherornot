import { useState } from "react";
import useCity from "../../hooks/useCity"

const CityInput = () => {
  const [city, setCity] = useState("");
  const [validZip, setValidZip] = useState(true);
  const { cityDataIs, cityAlreadyThere } = useCity();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setCity(value);
    }
  }

  // const message = () => {
  //   if (!validZip) return "Invalid Zip";
  //   else if (cityAlreadyThere) return "Weather Info Already Present";
  //   else return "Enter 5-Digit US Zip"
  // }

  const InputMessage = () => {
    let message = 'Enter 5-Digit US Zip';
    if (!validZip) {
      message = "Invalid Zip";
      return <h1>🌧️ {message} 🌧️</h1>
    }
    else if (cityAlreadyThere) {
      message = "Weather Info Already Present";
      return <h1>🌞 {message} 🌞</h1>
    }
    return <h1>{message}</h1>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity("");
    const geoURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${city},us&appid=e203317f0df5474c05874e35b030eda3`;
    fetch(geoURL)
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((resJSON) => {
      const { name: cityName, lat: cityLat, lon: cityLon } = resJSON;
      const locationInfo = { cityName, cityLat, cityLon};
      cityDataIs(locationInfo)
    })
    .catch((err) => {
      console.error(err);
      setCity("");
      setValidZip(false);
      setTimeout(() => {
        setValidZip(true);
      }, 1000);
    });
  }

  // const inputHeading = message()
  return (
    <>
      {/* <h1>{inputHeading}</h1> */}
      <InputMessage />
      <form onSubmit={handleSubmit} autoComplete="off">
        <input autoFocus={true} maxLength={5} type="text" value={city} onChange={handleChange}/>
        <button type="submit">Get Weather!</button>
      </form>
    </>
  )
}

export default CityInput;