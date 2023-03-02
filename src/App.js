import Cinput from "./components/cityInput";
import Whether from "./components/whether";
import { CityProvider } from "./hooks/useCity";
function App() {
  return (
    <div>
      <CityProvider>
        <Cinput />
        <Whether />
      </CityProvider>
    </div>
  );
}

export default App;
