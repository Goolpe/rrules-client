import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwtDecode from 'jwt-decode';
import server from "./server.json";

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

export const registerUser = (user, history) => async (dispatch) => {
  try{
    await axios.post(server.online + '/auth/register', user);
    return history.push('/email-verification')
  }
  catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
}

export const loginUser = (user) => async (dispatch) => {
  try{
    const response = await axios.post(server.online + '/auth/login', user);
    const { token } = await response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
  }
  catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/');
}

// export const loginSocial = () => dispatch => {
//   fetch(server.online + '/auth/vkontakte')
//     .then(
//       res => console.log(res.json())
//     )
//     .then(games => 
//     dispatch()
//   );
// };

