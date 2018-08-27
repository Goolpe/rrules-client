import { FETCH_ARTICLES, NEW_ARTICLE, NEW_ACCOUNT, AUTH_ACCOUNT, FETCH_PLAYERS } from './types';

export const fetchArticles = () => dispatch => {
  fetch("https://randomrulesdb.herokuapp.com/articles")
      .then((resp) => resp.json())
      .then(articles => 
      dispatch({
        type: FETCH_ARTICLES,
        payload: articles
      })
    );
};

export const createArticle = articleData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/articles',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(articleData)
     })
      .then(res => res.json())
      .then(article =>
      dispatch({
        type: NEW_ARTICLE,
        payload: article
    })
  );
};

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

export const fetchPlayers = () => dispatch => {
  fetch("https://randomrulesdb.herokuapp.com/players")
      .then((resp) => resp.json())
      .then(players => 
      dispatch({
        type: FETCH_PLAYERS,
        payload: players
      })
    );
};