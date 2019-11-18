import React, { useContext, useReducer, useEffect } from 'react';
import Context from './Context';
import authReducer from './reducer';
import { doLogin } from './actions';
import { checkCookie, setCookie } from 'core/utils/token';
import { config } from 'core/constants/service';

export default function AuthProvider({ children }) {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const getCookieStatus = async () => {
      const token = await checkCookie();

      if (token) {
        dispatch(doLogin(token));
      } else {
        // dispatch(stopLoader());
        window.location.replace(config.url.SSO_LINK);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const incomingToken = params.get('incomingToken');

    if (incomingToken) {
      setCookie(incomingToken);
      dispatch(doLogin(incomingToken));
      window.location.replace('/home');
    } else {
      getCookieStatus();
    }
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
