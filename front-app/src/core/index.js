import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import 'index.css';

import * as serviceWorker from 'serviceWorker';

/** Auth Provider */
import AuthProvider from 'core/providers/Auth';

/** Main Route */
import App from './routes/App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
