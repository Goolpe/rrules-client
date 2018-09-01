import { FETCH_MSGS } from './types';
import axios from 'axios';

export const fetchMsgs = (user) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/msgs', user)
      .then((resp) => resp.json())
      .then(msgs => 
      dispatch({
        type: FETCH_MSGS,
        payload: msgs
      })
    );
};