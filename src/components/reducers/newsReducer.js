import { FETCH_ARTICLES, FETCH_ARTICLE } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
