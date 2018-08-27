import { NEW_ACCOUNT, AUTH_ACCOUNT } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_ACCOUNT:
      return {
        ...state,
        item: action.payload
      };
    case AUTH_ACCOUNT:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
