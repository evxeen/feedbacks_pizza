import "./App.css";
import { useEffect, useState } from "react";

import { GUESTS_API, DIETS_API } from "./config";
import {
  getData,
  changeStrings,
  grouping,
  removeFeedbackPerson,
  addFeedbackPerson,
} from "./helpers";
import { Guest } from "./components/Guest";
import { FormFeedback } from "./components/FormFeedback";
import { ViewFeedback } from "./components/ViewFeedback";

function App() {
  const [persons, setPersons] = useState(
    JSON.parse(localStorage.getItem("guestList"))
  );
  const [listHidden, setListHidden] = useState(false);
  const [formHidden, setFormHidden] = useState(true);
  const [viewHidden, setViewHidden] = useState(true);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState({});
  const [rating, setRating] = useState([true, true, true, false, false]);

  const setData = async () => {
    const { party } = await getData(GUESTS_API);
    const { diet } = await getData(DIETS_API, changeStrings(party));
    const persons = grouping(party, diet);
    localStorage.setItem("guestList", JSON.stringify(persons));
    setPersons(persons);
  };

  useEffect(() => {
    localStorage.setItem("q", JSON.stringify({ name: "q" })); // test data
    if (!localStorage.getItem("guestList")) {
      setData();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("guestList")) {
      addFeedback(feedback.name);
    }
  }, [feedback]);

  const clearApp = () => {
    localStorage.clear();
    setPersons({});
    setData();
  };

  const showForm = (name) => {
    setListHidden(true);
    setFormHidden(false);
    setName(name);
  };

  const showView = (name) => {
    setListHidden(true);
    setViewHidden(false);
    const { feedback } = persons.find((person) => person.name === name);
    setFeedback(feedback);
  };

  const deleteFeedback = (name) => {
    setPersons(removeFeedbackPerson(name, persons));
    localStorage.setItem(
      "guestList",
      JSON.stringify(removeFeedbackPerson(name, persons))
    );
    cancel();
  };

  const addFeedback = (name) => {
    setPersons(addFeedbackPerson(name, persons, feedback));
    localStorage.setItem(
      "guestList",
      JSON.stringify(addFeedbackPerson(name, persons, feedback))
    );
  };

  const cancel = () => {
    setFormHidden(true);
    setViewHidden(true);
    setListHidden(false);
    setRating([true, true, true, false, false]);
  };

  return (
    <div className="App">
      <header>
        {!localStorage.getItem("guestList") && <h1>Loading...</h1>}
      </header>
      <div className="content">
        {localStorage.getItem("guestList") &&
          JSON.parse(localStorage.getItem("guestList")).map((guest, index) => (
            <Guest
              key={index}
              guest={guest}
              listHidden={listHidden}
              showForm={showForm}
              showView={showView}
            />
          ))}
        {!formHidden && (
          <FormFeedback
            name={name}
            setFeedback={setFeedback}
            cancel={cancel}
            rating={rating}
            setRating={setRating}
          />
        )}
        {!viewHidden && (
          <ViewFeedback
            feedbackData={feedback}
            cancel={cancel}
            deleteFeedback={deleteFeedback}
          />
        )}
      </div>
      <button className="clear-data" onClick={clearApp}>
        Clear data
      </button>
    </div>
  );
}

export default App;
