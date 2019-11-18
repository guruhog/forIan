import { useEffect, useContext } from 'react';
import AuthContext from 'core/providers/Auth/Context';

import IO from 'socket.io-client';
import { setSocket } from 'core/providers/Auth/actions';
import { config } from 'core/constants/service';
import { checkCookie } from 'core/utils/token';

export default function SocketIO() {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    // const token = localStorage.getItem(TOKEN_NAME);
    const token = checkCookie();
    const socket = IO(`${config.url.BACKEND_API}`, { query: { token } });
    dispatch(setSocket(socket));
  }, [dispatch]);

  return false;
}
