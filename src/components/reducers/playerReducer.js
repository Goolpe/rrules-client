import { FETCH_PLAYERS, FETCH_PLAYER } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
   case FETCH_PLAYER:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_PLAYERS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
