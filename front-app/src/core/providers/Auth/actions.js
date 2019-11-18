import { SET_USER, STOP_LOADER, SET_SOCKET, SET_BACKGROUND } from './constants';
import jwt_decode from 'jwt-decode';
import { TOKEN_NAME, TOKEN_REFRESH_NAME } from 'core/utils/token';

export const doLogin = token => {
  const decodedToken = jwt_decode(token);
  const { username, fullname, _id } = decodedToken;
  return {
    type: SET_USER,
    payload: { isLoggedIn: true, isLoading: false, username, fullname, _id }
  };
};

export const stopLoader = () => {
  return { type: STOP_LOADER };
};

export const setSocket = socket => {
  return { type: SET_SOCKET, payload: { socket } };
};

export const setBackground = background => {
  return { type: SET_BACKGROUND, payload: background };
};

export const doLogout = () => {
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(TOKEN_REFRESH_NAME);
  return { type: SET_USER, payload: { isLoggedIn: false, username: '', fullname: '' } };
};
