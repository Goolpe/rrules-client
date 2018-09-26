import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  articles: postReducer,
  article: postReducer,
  accounts: authReducer,
  players: playerReducer,
  player: playerReducer,
  games: gameReducer,
  game: gameReducer,
  errors: errorReducer,
  auth: authReducer
});


