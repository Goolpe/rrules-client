import { FETCH_GAMES, FETCH_GAME } from './types';
import server from "./server.json";

export const fetchGames = () => async (dispatch) => {
  const response = await fetch(server.online + '/games/all');
  const data = await response.json();
  dispatch({
    type: FETCH_GAMES,
    payload: data,
  });
};

export const fetchGame = (gameData, history) => async (dispatch) => {
  try{
  const response = await fetch(server.online + '/games/one/' + gameData);
  const data = await response.json();
  dispatch({
    type: FETCH_GAME,
    payload: data,
  });
  }
  catch(err) {
    history.push('/404');
  }
};

export const createGame = (gameData) => async (dispatch) => {
  const response = await fetch(server.online + '/games/new', {
    method: 'post',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
     body: JSON.stringify(gameData),
  });
  const data = await response.json();
  dispatch({
    type: FETCH_GAME,
    payload: data,
  });
};

export const changeGameData = (gameData) => async (dispatch) => {
  const response = await fetch(server.online + '/games/edit/' + gameData.id, {
    method: 'put',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
   });
  const data = await response.json();
  dispatch({
    type: FETCH_GAME,
    payload: data
  })
};

export const addPlayerGameData = (gameData) => async (dispatch) => {
  const response = await fetch(server.online + '/games/addplayer/' + gameData.id, {
    method: 'put',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  dispatch({
    type: FETCH_GAME,
    payload: data,
  });
};

export const deleteGame = (gameData) => async (dispatch) => {
  await fetch(server.online + '/games/delete/' + gameData, {
    method: 'delete',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
};