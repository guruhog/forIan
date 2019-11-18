import { SET_USER, STOP_LOADER, SET_SOCKET, SET_BACKGROUND, BG_LOCAL_STORAGE } from './constants';

export default function authReducer(state, { type, payload }) {
  switch (type) {
    case SET_USER:
      return { ...state, ...payload };

    case STOP_LOADER: {
      return { ...state, isLoading: false };
    }

    case SET_SOCKET: {
      return { ...state, socket: payload.socket };
    }

    case SET_BACKGROUND: {
      localStorage.setItem(BG_LOCAL_STORAGE, JSON.stringify(payload));
      return { ...state, background: payload };
    }

    default:
      return state;
  }
}
