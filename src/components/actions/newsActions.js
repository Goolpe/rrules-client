import { FETCH_ARTICLES, FETCH_ARTICLE } from './types';
import server from "./server.json";

export const fetchArticles = () => async (dispatch) => {
  const response = await fetch(server.online + '/articles/all');
  const data = await response.json();
  dispatch({
    type: FETCH_ARTICLES,
    payload: data,
  });
};

export const fetchArticle = (articleId,history) => async (dispatch) => {
  try{
    const response = await fetch(server.online + '/articles/one/' + articleId);
    const data = await response.json();
    dispatch({
      type: FETCH_ARTICLE,
      payload: data,
    });
  }
  catch(err) {
    history.push('/404');
  }
};

export const createArticle = articleData => async (dispatch) => {
  await fetch(server.online + '/articles/new',{
    method: 'post',
    headers: {
      'Authorization': localStorage.jwtToken,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify(articleData),
  });
};

