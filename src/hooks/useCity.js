import { createContext, useContext, useState } from "react";

const cityContext = createContext();

const useCity = () => {
  const localCityData = JSON.parse(localStorage.getItem("cityData") || "[]");
  const [cityData, setCityData] = useState(localCityData);
  const [cityAlreadyThere, setCityAlreadyThere] = useState(false);
  return {
    cityData,
    cityAlreadyThere,
    cityDataIs(city) {
      return new Promise((res) => {
        setCityData((prev) => {
          if (prev.some((cD) => cD.cityName === city.cityName)) {
            setCityAlreadyThere(true);
            setTimeout(() => {
              setCityAlreadyThere(false);
            }, 1000);
            return [...prev];
          }
          localStorage.setItem("cityData", JSON.stringify([...prev, city]));
          return [...prev, city];
        });
        res();
      });
    },
    cityDataIsNot(cityToDelete) {
      return new Promise((res) => {
        setCityData((prev) => {
          const filteredCityData = prev.filter(
            ({ cityName }) => cityName !== cityToDelete
          );
          localStorage.setItem("cityData", JSON.stringify(filteredCityData));
          return filteredCityData;
        });
        res();
      });
    },
  };
};

export const CityProvider = ({ children }) => {
  const city = useCity();

  return <cityContext.Provider value={city}>{children}</cityContext.Provider>;
};

const CityConsumer = () => useContext(cityContext);

export default CityConsumer;
