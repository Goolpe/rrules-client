import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import playerReducer from './playerReducer';

export default combineReducers({
  articles: postReducer,
  accounts: authReducer,
  players: playerReducer
});
