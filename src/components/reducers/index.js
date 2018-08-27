import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  articles: postReducer,
  accounts: authReducer,
  players: playerReducer,
  games: gameReducer
});
