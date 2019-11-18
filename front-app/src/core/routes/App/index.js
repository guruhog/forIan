import React, { useContext } from 'react';

/** Routing */
import { Router, Switch } from 'react-router-dom';
import history from 'core/utils/history';

/** Routes */
// import Login from 'core/routes/Login';
import LoggedIn from 'core/routes/LoggedIn';
import ProtectedRoute from 'core/containers/ProtectedRoute';

import AuthContext from 'core/providers/Auth/Context';
import Spinner from 'core/components/Spinner';

export default function App() {
  const {
    state: { isLoading }
  } = useContext(AuthContext);

  return isLoading ? (
    <Spinner />
  ) : (
    <Router history={history}>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <ProtectedRoute path="/" component={LoggedIn} />
      </Switch>
    </Router>
  );
}
