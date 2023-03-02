import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useCity from "../../hooks/useCity"


const WhetherTile = ({ city }) => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");

  const { cityName, cityLat, cityLon } = city;
  const { cityDataIsNot } = useCity();
  useEffect(() => {
    const getWeatherData = () => {
      
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=e203317f0df5474c05874e35b030eda3`

      fetch(weatherURL).then((response) => {
        if (response.ok) return response.json()
      }).then((resJSON) => { 
        setTemperature(Math.round(resJSON.main.temp));
        setDesc(resJSON.weather[0].description);
        setName(cityName);
        setHumidity(resJSON.main.humidity);
        setVisibility(resJSON.visibility / 1000);
        setWineSpeed(resJSON.wind.speed);
        setWicon(resJSON.weather[0].icon);

      })
      .catch((err) => console.error(err));
    }
    getWeatherData();

  }, [])

  const handleDelete = (cityToDelete) => {console.log("ctd:", cityToDelete); cityDataIsNot(cityToDelete);}
  return (
    <div className={styles.whetherTileWrapper}>
      <button className={styles.whetherTileRemover} onClick={() => handleDelete(cityName)}>X</button>
      <div className={styles.whetherDetails}>
          <div className={styles.whetherDetailsTemp}>
            {temperature}
            <span>&deg;</span>
          </div>
          <div className={styles.whetherDetailsSummary}>
            <div>{desc}</div>
            <div style={{ fontWeight: 800, marginTop: "0.5rem" }}>{name}</div>
          </div>
      </div>
      <img className={styles.whetherImage} alt="weatherImg" src={`${wicon}.svg`} />
      <div className={styles.whetherExtraDetails}>
        <div style={{ display: "flex", flexFlow: "row", alignItems: "center", gap: "0.2rem" }}>
          <img    
              alt="humidityImg"
              src="humidity.svg"
              style={{ width: "10%", height: "10%"}}
          />
          <div><b>Humidity</b>  {humidity}%</div>
          
        </div>
        <div style={{ display: "flex", flexFlow: "row", alignItems: "center", gap: "0.2rem" }}>
          <img    
              alt="visibilityImg"
              src="visibility.svg"
              style={{ width: "10%", height: "10% "}}
          />
          <div><b>Visibility</b>  {visibility}</div>
        </div>
        <div style={{ display: "flex", flexFlow: "row", alignItems: "center", gap: "0.2rem" }}>
          <img    
              alt="windSpeedImg"
              src="wind.svg"
              style={{ width: "10%", height: "10% "}}
          />
          <div><b>Wind Speed</b>  {windspeed} mph</div>
        </div>
      </div>
    </div>
  )
}

export default WhetherTile;