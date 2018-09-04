import { FETCH_MSGS, FETCH_MSG, NEW_MSG } from './types';

export const fetchMsgs = (user) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/msgs', {
      method: 'get',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }})
      .then((res) => res.json())
      .then(msgs => 
      dispatch({
        type: FETCH_MSGS,
        payload: msgs
      })
    );
};

export const fetchMsg = (user) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/msgs/' + user, {
      method: 'get',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }})
      .then((res) => res.json())
      .then(msg => {
      dispatch({
        type: FETCH_MSG,
        payload: msg
      })}
    );
};

export const createMsg = msgData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/msgs',{
      method: 'post',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(msgData)
     })
      .then(res => res.json())
      .then(msg =>
      dispatch({
        type: NEW_MSG,
        payload: msg
    })
  );
};
