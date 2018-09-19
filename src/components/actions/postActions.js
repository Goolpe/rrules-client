import { FETCH_ARTICLES, FETCH_ARTICLE } from './types';
import server from "./server.json";

export const fetchArticles = () => dispatch => {
  fetch(server.online + '/articles/all')
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(articles => 
      dispatch({
        type: FETCH_ARTICLES,
        payload: articles
      })
    );
};

export const fetchArticle = (articleId,history) => dispatch => {
  fetch(server.online + '/articles/one/' + articleId)
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(article => 
      dispatch({
        type: FETCH_ARTICLE,
        payload: article
      }))
      .catch(err => history.push('/404'))
};

export const createArticle = articleData => dispatch => {
  fetch(server.online + '/articles/new',{
      method: 'post',
      headers: {
        'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(articleData)
     })
      .then(
        res => res.json(),
        err => console.log(err)
      )
      .then(article =>
      dispatch({
        type: FETCH_ARTICLE,
        payload: article
    })
  );
};

