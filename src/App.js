import "./App.css";
import { useEffect, useState } from "react";

import { GUESTS_API, DIETS_API } from "./config";
import { getData, changeStrings, grouping } from "./helpers";

function App() {
  const [state, setState] = useState(0);
  const setData = async () => {
    const { party } = await getData(GUESTS_API);
    const { diet } = await getData(DIETS_API, changeStrings(party));
    const persons = grouping(party, diet);
    localStorage.setItem("guestList", JSON.stringify(persons));
    setState(1);
  };

  useEffect(() => {
    if (!localStorage.length) {
      setData();
    }
  }, []);

  return (
    <div className="App">
      <h1>Loading...</h1>
      {localStorage.length &&
        JSON.parse(localStorage.getItem("guestList")).map((el, index) => (
          <div key={index}>{el.name}</div>
        ))}
    </div>
  );
}

export default App;
