import "./App.css";
import { useEffect, useState } from "react";

import { GUESTS_API, DIETS_API } from "./config";
import { getData, changeStrings, grouping } from "./helpers";
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

  const setData = async () => {
    const { party } = await getData(GUESTS_API);
    const { diet } = await getData(DIETS_API, changeStrings(party));
    const persons = grouping(party, diet);
    localStorage.setItem("guestList", JSON.stringify(persons));
    setPersons(persons);
  };

  useEffect(() => {
    if (!localStorage.length) {
      setData();
    }
  }, []);

  useEffect(() => {
    if (localStorage.length) {
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
    const feedbackPerson = persons.reduce((acc, person) => {
      const newFeedback = { ...person };
      if (person.name === name) {
        delete newFeedback["feedback"];
      }
      acc.push(newFeedback);
      return acc;
    }, []);
    setPersons(feedbackPerson);
    localStorage.setItem("guestList", JSON.stringify(feedbackPerson));
    cancel();
  };

  const addFeedback = (name) => {
    const feedbackPerson = persons.reduce((acc, person) => {
      const newFeedback = { ...person };
      if (person.name === name) {
        newFeedback.feedback = { ...feedback };
      }
      acc.push(newFeedback);
      return acc;
    }, []);
    setPersons(feedbackPerson);
    localStorage.setItem("guestList", JSON.stringify(feedbackPerson));
  };

  const cancel = () => {
    setFormHidden(true);
    setListHidden(false);
    setViewHidden(true);
  };

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
              showForm={showForm}
              showView={showView}
              setViewHidden={setViewHidden}
            />
          ))}
        {!formHidden && (
          <FormFeedback name={name} setFeedback={setFeedback} cancel={cancel} />
        )}
        {!viewHidden && (
          <ViewFeedback
            feedbackData={feedback}
            cancel={cancel}
            deleteFeedback={deleteFeedback}
          />
        )}
      </div>
      <button onClick={clearApp}>Clear app</button>
    </div>
  );
}

export default App;
