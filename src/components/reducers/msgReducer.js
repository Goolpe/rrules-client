import { FETCH_MSGS, FETCH_MSG } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MSGS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_MSG:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
