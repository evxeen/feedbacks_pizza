import "./App.css";
import { useEffect, useState } from "react";

import { GUESTS_API, DIETS_API } from "./config";
import { getData, changeStrings, grouping } from "./helpers";
import { Guest } from "./components/guest";

function App() {
  const [state, setState] = useState(0);
  const [listHidden, setListHidden] = useState(false);

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
      <header>{!localStorage.length && <h1>Loading...</h1>}</header>
      <div className="content">
        {localStorage.length &&
          JSON.parse(localStorage.getItem("guestList")).map((guest, index) => (
            <Guest
              key={index}
              guest={guest}
              listHidden={listHidden}
              setListHidden={setListHidden}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
