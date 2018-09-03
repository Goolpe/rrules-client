import { FETCH_GAMES, FETCH_GAME } from './types';
import axios from 'axios';

export const fetchGames = () => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/games')
      .then((resp) => resp.json())
      .then(games => 
      dispatch({
        type: FETCH_GAMES,
        payload: games
      })
    );
};

export const fetchGame = (gameData) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/games/' + gameData)
      .then((resp) => resp.json())
      .then(game => 
      dispatch({
        type: FETCH_GAME,
        payload: game
      })
    );
};

export const createGame = (gameData) => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/games', {
      method: 'post',
      headers: {
        'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(gameData)
     })
      .then(res => res.json())
      .then(game =>
      dispatch({
        type: FETCH_GAME,
        payload: game
    })
  );
};

export const changeGameData = (user, gameData) => dispatch => {
  axios.put('https://randomrulesdb.herokuapp.com/games/' + user.id, user, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(gameData)
     })
      .then(res => dispatch({type: FETCH_GAME, payload: res.data}))
};

export const deleteGame = (user, gameData) => dispatch => {
  axios.delete('https://randomrulesdb.herokuapp.com/games/', user, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
     })

      .then(res => dispatch({type: FETCH_GAMES, payload: res.data}))
};