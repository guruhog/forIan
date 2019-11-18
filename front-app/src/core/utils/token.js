import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { config } from 'core/constants/service';

export const TOKEN_NAME = 'appGToken';
export const TOKEN_REFRESH_NAME = 'appGTokenRef';
export const COOKIE_NAME = 'AG_AUTH';

export const checkCookie = () => {
  const cookie_name = getCookie();
  return cookie_name;
};

const doRefreshToken = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (!token) {
    return false;
  }

  const decoded_token = decodeToken(token);
  if (!decoded_token) {
    return false;
  }

  //if token expired
  if (hasTokenExpired(decoded_token)) {
    const refresh_token = localStorage.getItem(TOKEN_REFRESH_NAME);
    if (!refresh_token) {
      return false;
    }

    const decoded_refresh_token = decodeToken(refresh_token);
    if (!decoded_refresh_token) {
      return false;
    }

    //is refresh token has expired -> User needs to log in again
    if (hasTokenExpired(decoded_refresh_token)) {
      return false;
    }

    //request a new token
    return axios
      .post(`${config.url.AUTH_API}/auth/refreshToken`, { refresh_token })
      .then(res => {
        const { token, refreshToken } = res.data;

        if (token && refresh_token) {
          localStorage.setItem(TOKEN_NAME, token);
          localStorage.setItem(TOKEN_REFRESH_NAME, refreshToken);
          return { token, refreshToken };
        }

        return false;
      })
      .catch(() => {
        return false;
      });
  }

  return {
    token: localStorage.getItem(TOKEN_NAME),
    refreshToken: localStorage.getItem(TOKEN_REFRESH_NAME)
  };
};

/** */
const hasTokenExpired = token => {
  return token.exp < Date.now() / 1000 ? true : false;
};

export function setCookie(token) {
  document.cookie = `${COOKIE_NAME}=${token}; expires=0; path=/`;
}

export function getCookie() {
  if (!document.cookie) {
    return false;
  }

  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });

  return cookie[COOKIE_NAME];
}

/** */
const decodeToken = token => {
  try {
    return jwt_decode(token);
  } catch (e) {
    return false;
  }
};

export { doRefreshToken };
