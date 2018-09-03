import { FETCH_MSGS, NEW_MSG } from '../actions/types';

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
    case NEW_MSG:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
