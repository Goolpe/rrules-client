import { FETCH_PLAYERS, FETCH_PLAYER } from './types';

export const fetchPlayers = () => dispatch => {
  fetch('//localhost:5000/players/all')
      .then((res) => res.json())
      .then(players => 
      dispatch({
        type: FETCH_PLAYERS,
        payload: players
      })
    );
};

export const fetchPlayer = (playerData) => dispatch => {
  fetch('//localhost:5000/players/one/' + playerData)
      .then((res) => res.json())
      .then(player => 
      dispatch({
        type: FETCH_PLAYER,
        payload: player
      })
    );
};

export const changePlayerData = (playerData) => dispatch => {
  fetch('//localhost:5000/players/edit/' + playerData.id, {
      method: 'put',
      headers: {
        'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(playerData)
     })
      .then((res) => res.json())
      .then(player => 
        dispatch({
          type: FETCH_PLAYER, 
          payload: player 
        })
      );
};
