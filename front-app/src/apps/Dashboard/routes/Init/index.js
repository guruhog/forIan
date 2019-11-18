import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/** Routes */
import Applications from '../Applications';
import Users from '../Users';
import Insights from '../Insights';
import DashboardLayout from 'core/containers/DashboardLayout';

function Init(props) {
  const {
    match: { path }
  } = props;

  return (
    <DashboardLayout>
      <Switch>
        <Redirect exact from={`${path}`} to={`${path}/applications`} />

        <Route path={`${path}/applications`} component={Applications} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/insights`} component={Insights} />
      </Switch>
    </DashboardLayout>
  );
}

export default React.memo(Init);
