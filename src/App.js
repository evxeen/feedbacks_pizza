import './App.css';
import {useEffect, useState} from "react";

import {GUESTS_API, DIETS_API} from "./config";
import {getData, changeStrings, grouping} from "./helpers";

function App() {
  const [guestList, setGuestList] = useState([]);

  const checkStore = async () => {
    if (localStorage.length === 0) {
      const { party } = await getData(GUESTS_API);
      const { diet } = await getData(DIETS_API, changeStrings(party));
      setGuestList(grouping(party, diet));
    }
  }

  useEffect(() => {
    checkStore();
  }, [])

  console.log(guestList);
  return (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
