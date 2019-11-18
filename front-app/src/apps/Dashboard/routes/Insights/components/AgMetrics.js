import React, { useContext, useEffect, useState } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AuthContext from 'core/providers/Auth/Context';

import { GridColumnStyled } from './style';

function AgMetrics({ metrics }) {
  const [usersOnline, setUsersOnline] = useState(0);

  const {
    state: { socket }
  } = useContext(AuthContext);

  useEffect(() => {
    if (socket) {
      socket.emit('current-online-users', noUsersOnline => {
        setUsersOnline(noUsersOnline);
      });

      socket.on('update-online-users-no', noUsersOnline => {
        setUsersOnline(noUsersOnline);
      });

      return () => {
        socket.removeAllListeners('update-online-users-no');
      };
    }
  }, [socket]);

  return (
    <div style={{ paddingBottom: '30px' }}>
      <Grid style={{ marginTop: '30px' }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment color="blue">
              <Header as="h2" color="blue">
                AG System Metrics
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="6">
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Apps</Header>
              <Header as="h3">{metrics.applications}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Users</Header>
              <Header as="h3">{metrics.users}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Day</Header>
              <Header as="h3">{metrics?.AGTraffic?.day.toFixed(2)}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Week</Header>
              <Header as="h3">{metrics?.AGTraffic?.week.toFixed(2)}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Month</Header>
              <Header as="h3">{metrics?.AGTraffic?.month.toFixed(2)}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Online Now</Header>
              <Header as="h3">{usersOnline}</Header>
            </Segment>
          </GridColumnStyled>
        </Grid.Row>
      </Grid>

      {/* AG System Metrics Charts ////////////////////////////////////////// */}
      {/* <Grid style={{ marginTop: '10px' }} columns="2">
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Segment></Segment>
        </Grid.Column>
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Segment></Segment>
        </Grid.Column> */}
      {/* <Grid.Column width={14} style={{ padding: 0 }}>
          <Grid columns={2}>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment><LineAGUsage /></Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment><LineHitsRealtime /></Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column> */}
      {/* </Grid> */}
    </div>
  );
}

export default React.memo(AgMetrics);
