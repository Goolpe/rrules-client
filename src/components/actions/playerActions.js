import { FETCH_PLAYERS, NEW_PLAYER } from './types';

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

export const createPlayer = playerData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/players',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify( playerData)
     })
      .then(res => res.json())
      .then( player =>
      dispatch({
        type: NEW_PLAYER,
        payload: player
    })
  );
};
