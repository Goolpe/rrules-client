import { NEW_ACCOUNT, AUTH_ACCOUNT } from './types';

export const createAccount = accountData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/users',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(accountData)
     })
      .then(account => {if(account.ok)
      dispatch({
        type: NEW_ACCOUNT,
        payload: account
    })}
  )
};

export const authAccount = accountData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/users',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(accountData)
     })
      .then(account => {if(account.ok)
      dispatch({
        type: AUTH_ACCOUNT,
        payload: account
    })}
  );
};