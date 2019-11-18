import { SHOW_MODAL, HIDE_MODAL } from './constants';

export default function modalReducer(state, action) {
  switch (action.type) {
    case SHOW_MODAL:
      const { type, props } = action.payload;
      return { ...state, type, props };

    case HIDE_MODAL:
      return { ...state, type: null };

    default:
      return state;
  }
}
