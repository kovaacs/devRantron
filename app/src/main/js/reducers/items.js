import DEFAULT_STATES from '../consts/default_states';
import { FEED, STATE } from '../consts/types';

export default (state = DEFAULT_STATES.ITEMS, action) => {
  switch (action.type) {
    case FEED.ACTION.FETCH:
      switch (action.state) {
        case STATE.SUCCESS: {
          return {
            ...state,
            type: action.itemType,
            state: STATE.SUCCESS,
            items: [
              ...state.items,
              ...action.items,
            ],
            page: action.page + 1,
            sort: action.sort,
            range: action.range,
          };
        }
        case STATE.FAILED:
          return {
            ...state,
            type: action.itemType,
            state: STATE.FAILED,
          };
        case STATE.LOADING:
          return {
            ...state,
            type: action.itemType,
            state: STATE.LOADING,
            items: action.page !== 0 ? state.items : [],
            page: action.page !== 0 ? state.page : 0,
          };
        case STATE.INITIAL:
          return {
            ...state,
            type: action.itemType,
            state: STATE.INITIAL,
          };
        default:
          return state;
      }
    case FEED.ACTION.RESET:
      return DEFAULT_STATES.ITEMS;
    default:
      return state;
  }
};