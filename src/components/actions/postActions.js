import { FETCH_ARTICLES, FETCH_ARTICLE } from './types';

export const fetchArticles = () => dispatch => {
  fetch("https://randomrulesdb.herokuapp.com/articles/all")
      .then((res) => res.json())
      .then(articles => 
      dispatch({
        type: FETCH_ARTICLES,
        payload: articles
      })
    );
};

export const fetchArticle = (articleId) => dispatch => {
  fetch("https://randomrulesdb.herokuapp.com/articles/one/" + articleId)
      .then((res) => res.json())
      .then(article => 
      dispatch({
        type: FETCH_ARTICLE,
        payload: article
      })
    );
};

export const createArticle = articleData => dispatch => {
  fetch('https://randomrulesdb.herokuapp.com/articles/new',{
      method: 'post',
      headers: {
        'Authorization': localStorage.jwtToken,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(articleData)
     })
      .then(res => res.json())
      .then(article =>
      dispatch({
        type: FETCH_ARTICLE,
        payload: article
    })
  );
};

