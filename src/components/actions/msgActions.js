import { FETCH_MSGS, NEW_MSG } from './types';

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
