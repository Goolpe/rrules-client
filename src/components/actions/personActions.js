import { FETCH_PERSONS, FETCH_PERSON } from './types';
import server from "./server.json";

export const fetchPersons = () => dispatch => {
  fetch(server.online + '/players/all')
    .then(
      res => res.json(),
      err => console.log(err)
    )
    .then(persons => 
    dispatch({
      type: FETCH_PERSONS,
      payload: persons
    })
  );
};

export const fetchPerson = (personData, history) => dispatch => {
  fetch(server.online + '/players/one/' + personData)
    .then(
      res => res.json()
    )
    .then(player => 
    dispatch({
      type: FETCH_PERSON,
      payload: player
    }))
    .catch(err => history.push('/404'))
};

export const changePersonData = (personData) => dispatch => {
  fetch(server.online + '/players/edit/' + personData.id, {
    method: 'put',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify(personData)
   })
};
