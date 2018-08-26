import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';

export default combineReducers({
  articles: postReducer,
  accounts: authReducer
});
