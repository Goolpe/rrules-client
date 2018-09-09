import { FETCH_PLAYERS, FETCH_PLAYER } from './types';
import server from "./server.json";

export const fetchPlayers = () => dispatch => {
  fetch(server.online + '/players/all')
      .then((res) => res.json())
      .then(players => 
      dispatch({
        type: FETCH_PLAYERS,
        payload: players
      })
    );
};

export const fetchPlayer = (playerData) => dispatch => {
  fetch(server.online + '/players/one/' + playerData)
      .then((res) => res.json())
      .then(player => 
      dispatch({
        type: FETCH_PLAYER,
        payload: player
      })
    );
};

export const changePlayerData = (playerData) => dispatch => {
  fetch(server.online + '/players/edit/' + playerData.id, {
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
