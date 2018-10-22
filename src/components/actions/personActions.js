import { FETCH_PERSONS, FETCH_PERSON } from './types';
import server from "./server.json";

export const fetchPersons = () => async (dispatch) => {
  const response = await fetch(server.online + '/persons/all');
  const data = await response.json();
  dispatch({
    type: FETCH_PERSONS,
    payload: data,
  });
};

export const fetchPerson = (personData, history) => async (dispatch) => {
  try{
    const response = await fetch(server.online + '/persons/one/' + personData);
    const data = await response.json();
    dispatch({
      type: FETCH_PERSON,
      payload: data,
    });
  }
  catch(err) {
    history.push('/404');
  }
};

export const changePersonData = (personData) => async (dispatch) => {
  await fetch(server.online + '/persons/edit/' + personData.id, {
    method: 'put',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });
};
