import { useContext } from 'react';
import AuthContext from 'core/providers/Auth/Context';
import axios from 'axios';
import { doLogin } from './actions';
import { TOKEN_NAME, TOKEN_REFRESH_NAME } from 'core/utils/token';
import { config } from 'core/constants/service';

/** Custom hooks */
import { useForm } from 'core/utils/useForm';

export const useAuth = (initialValues, history) => {
  const { inputValues, handleInputChange, error, setError } = useForm(initialValues);

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = event => {
    event.preventDefault();

    setError(false);

    const { username, password } = inputValues;

    axios
      .post(`${config.url.AUTH_API}/auth/login`, { username, password })
      .then(({ data: { token, refreshToken } }) => {
        localStorage.setItem(TOKEN_NAME, token);
        localStorage.setItem(TOKEN_REFRESH_NAME, refreshToken);

        dispatch(doLogin(token));

        history.push('/');
      })
      .catch(err => {
        // setError(err.response.data.error);
        console.log(err);
      });
  };

  return { inputValues, handleInputChange, handleSubmit, error };
};
