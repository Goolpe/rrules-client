import { FETCH_PLAYERS, FETCH_PLAYER } from './types';
import axios from 'axios';


export const fetchPlayers = () => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/players')
      .then((resp) => resp.json())
      .then(players => 
      dispatch({
        type: FETCH_PLAYERS,
        payload: players
      })
    );
};

export const fetchPlayer = (playerData) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/players/' + playerData)
      .then((resp) => resp.json())
      .then(player => 
      dispatch({
        type: FETCH_PLAYER,
        payload: player
      })
    );
};

export const changePlayerData = (user, playerData) => dispatch => {
  axios.put('https://randomrulesdb.herokuapp.com/players/' + user.id, user, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(playerData)
     })
      .then(res => dispatch({type: FETCH_PLAYER, payload: res.data}))
};
