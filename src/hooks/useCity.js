import { createContext, useContext, useState } from "react";

const cityContext = createContext();

const useCity = () => {
  const [cityData, setCityData] = useState([]);
  return {
    cityData,
    cityDataIs(city) {
      return new Promise((res) => {
        setCityData((prev) => {
          if (prev.some((cD) => cD.cityName === city.cityName)) {
            return [...prev];
          }
          return [...prev, city];
        });
        res();
      });
    },
    cityDataIsNot(cityToDelete) {
      return new Promise((res) => {
        setCityData((prev) =>
          prev.filter(({ cityName }) => cityName !== cityToDelete)
        );
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
