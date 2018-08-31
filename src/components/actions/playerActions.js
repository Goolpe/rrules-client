import { FETCH_PLAYERS, NEW_PLAYER } from './types';
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

export const changePlayerData = (user, playerData) => dispatch => {
    axios.put('https://randomrulesdb.herokuapp.com/players/:id', user)
            .then(res => res.json())
              .then(player =>
              dispatch({
                type: NEW_PLAYER,
                payload: player
            }))
}

// export const changePlayerData = (user, playerData) => dispatch => {
//   fetch('//localhost:5000/api/users/players',{
//       method: 'put',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//       },
//        body: JSON.stringify(playerData)
//      })
//       .then(res => res.json())
//       .then(player =>
//       dispatch({
//         type: NEW_PLAYER,
//         payload: player
//     })
//   );
// };
