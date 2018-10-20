import { FETCH_PERSONS, FETCH_PERSON } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PERSON:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_PERSONS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
