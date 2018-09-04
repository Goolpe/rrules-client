import { FETCH_ARTICLES, NEW_ARTICLE } from './types';

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
        'Authorization': localStorage.jwtToken,
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

