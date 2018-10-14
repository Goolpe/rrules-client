import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import authReducer from './authReducer';
import personReducer from './personReducer';
import gameReducer from './gameReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  articles: newsReducer,
  article: newsReducer,
  accounts: authReducer,
  persons: personReducer,
  person: personReducer,
  games: gameReducer,
  game: gameReducer,
  errors: errorReducer,
  auth: authReducer
});


