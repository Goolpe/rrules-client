import { FETCH_GAMES, NEW_GAME } from './types';

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

export const createGame = gameData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/games',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(gameData)
     })
      .then(res => res.json())
      .then(game =>
      dispatch({
        type: NEW_GAME,
        payload: game
    })
  );
};