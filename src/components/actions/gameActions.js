import { FETCH_GAMES, FETCH_GAME } from './types';
import server from "./server.json";

export const fetchGames = () => dispatch => {
  fetch(server.online + '/games/all')
    .then(
      res => res.json(),
      err => console.log(err)
    )
    .then(games => 
    dispatch({
      type: FETCH_GAMES,
      payload: games
    })
  );
};

export const fetchGame = (gameData, history) => dispatch => {
  fetch(server.online + '/games/one/' + gameData)
    .then(
      res => res.json(),
      err => console.log(err)
    )
    .then(game => 
    dispatch({
      type: FETCH_GAME,
      payload: game
    }))
    .catch(err => history.push('/404'))
};

export const createGame = (gameData) => dispatch => {
  fetch(server.online + '/games/new', {
    method: 'post',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify(gameData)
   })
    .then(
      res => res.json(),
      err => console.log(err)
    )
    .then(game =>
    dispatch({
      type: FETCH_GAME,
      payload: game
    })
  );
};

export const changeGameData = (gameData) => dispatch => {
  fetch(server.online + '/games/edit/' + gameData.id, {
    method: 'put',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify(gameData)
   })
    .then(
      res => res.json(),
      err => console.log(err)
    )
    .then(game => 
      dispatch({
        type: FETCH_GAME, 
        payload: game
      })
    );
};

export const deleteGame = (gameData) => dispatch => {
  fetch(server.online + '/games/delete/' + gameData, {
    method: 'delete',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
   })
    .then(
      res => res.json(),
      err => console.log(err)
    )
};