import { FETCH_GAMES, FETCH_GAME } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_GAME:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
