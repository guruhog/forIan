import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/** Routes */
import Home from 'apps/Home/Loadable';
import Dashboard from 'apps/Dashboard/Loadable';

/** Providers */
import ModalProvider from 'core/providers/Modal';
import Applications from 'core/providers/Applications';
import Dictionary from 'core/providers/Dictionary';
import { ApolloProvider } from 'react-apollo-hooks';
import NotificationsProvider from 'core/providers/Notifications';
import SocketIO from 'core/providers/SocketIO';
import Profile from 'core/providers/Profile';
import Messages from 'core/providers/Messages';

/** Apollo client */
import apolloClient from 'core/providers/Apollo';

function LoggedIn() {
  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <NotificationsProvider />
        <Applications />
        <Dictionary />
        <SocketIO />
        <Profile />
        <Messages />

        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </ModalProvider>
    </ApolloProvider>
  );
}

export default React.memo(LoggedIn);
