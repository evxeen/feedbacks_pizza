export const changeStrings = (party) => {
  let result = [];
  party.forEach((person) => {
    result.push(`${person.name.replace(' ' , '%20')}`);
  })
  return result.join();
}

export const getData = (api, str = '') => {
   return fetch(`${api}${str}`).then(res => res.json());
}

export const getPizza = (data) => {
  const vegans = data.filter(person => person.isVegan).length;

  function getPercent() {
    const percent = Math.floor((vegans / data.length) * 100);
    if (percent > 51) {
      return 'vegan'
    }
    return 'meat'
  }

  return `${getPercent()}/${vegans}`;
}

export const grouping = (party, diet) => {
  const members = party;

  for (let i = 0; i < members.length; i++) {
    if (members[i].name) {
      members[i].isVegan = diet[i].isVegan
    }
  }
  return members
}