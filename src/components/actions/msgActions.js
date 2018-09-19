import { FETCH_MSGS, FETCH_MSG } from './types';
import server from "./server.json";

export const fetchMsgs = msgData => dispatch => {
  fetch(server.online + '/messages/all/' + msgData, {
      method: 'post',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'}
      })
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(msgs => 
      dispatch({
        type: FETCH_MSGS,
        payload: msgs
      })
    );
};

export const fetchMsg = msgData => dispatch => {
  fetch(server.online + '/messages/one/' + msgData.msgId, {
      method: 'post',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(msgData)
    })
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(msg => {
      dispatch({
        type: FETCH_MSG,
        payload: msg
      })}
    );
};

export const createMsg = msgData => dispatch => {
  fetch(server.online + '/messages/new',{
      method: 'post',
      headers: {
      	'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(msgData)
     })
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(msg =>
      dispatch({
        type: FETCH_MSG,
        payload: msg
    })
  );
};

export const changeMsgData = msgData => dispatch => {
  fetch(server.online + '/messages/edit/' + msgData.msgId,{
      method: 'put',
      headers: {
        'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(msgData)
     })
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(msg =>
      dispatch({
        type: FETCH_MSG,
        payload: msg
    })
  );
};

