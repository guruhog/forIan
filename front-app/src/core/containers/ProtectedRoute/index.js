import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from 'core/providers/Auth/Context';

export default function ProtectedRoute(props) {
  const {
    state: { isLoggedIn }
  } = useContext(AuthContext);

  const { connected, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => (isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired
};
