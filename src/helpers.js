export const changeStrings = (party) => {
  let result = [];
  party.forEach((person) => {
    result.push(`${person.name.replace(" ", "%20")}`);
  });
  return result.join();
};

export const getData = (api, str = "") => {
  return fetch(`${api}${str}`).then((res) => res.json());
};

export const grouping = (party, diet) => {
  const members = party;

  for (let i = 0; i < members.length; i++) {
    if (members[i].name) {
      members[i].isVegan = diet[i].isVegan;
    }
  }
  return members;
};

export const removeFeedbackPerson = (name, persons) => {
  return persons.reduce((acc, person) => {
    const newFeedback = { ...person };
    if (person.name === name) {
      delete newFeedback["feedback"];
    }
    acc.push(newFeedback);
    return acc;
  }, []);
};

export const addFeedbackPerson = (name, persons, feedback) => {
  return persons.reduce((acc, person) => {
    const newFeedback = { ...person };
    if (person.name === name) {
      newFeedback.feedback = { ...feedback };
    }
    acc.push(newFeedback);
    return acc;
  }, []);
};
