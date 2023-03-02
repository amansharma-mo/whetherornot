import styles from "./styles.module.css"
import useCity from "../../hooks/useCity"
import WhetherTile from "./whetherTile";

const Whether = () => {
  const { cityData } = useCity();
  if (!cityData) return null;
  if (cityData && cityData.length === 0) return null;
  return (
    <div className={styles.whetherWrapper}>
      {cityData.map((city) => <WhetherTile key={city.cityName} city={city}/>)}
    </div>
)
}
export default Whether;