import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { GridColumnStyled } from './style';

import BarTraffic from './Charts/BarTraffic';
import BarRated from './Charts/BarRated';
import BarClickthroughs from './Charts/BarClickthroughs';

const MainGrid = styled(Grid)`
  margin-top: 30px !important;
`;

function AppSummary({ metrics }) {
  return (
    <>
      <MainGrid>
        <Grid.Row>
          <Grid.Column textAlign="left" computer={16} tablet={16}>
            <Segment color="blue">
              <Header as="h2" color="blue">
                App Summary (All Apps)
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="5">
          <GridColumnStyled>
            <div className="ui segment">
              <Header as="h4">Visitors/Day</Header>
              <Header as="h3">
                {metrics.visitors.day > 0 ? metrics.visitors.day.toFixed(1) : 0.0}
              </Header>
            </div>
          </GridColumnStyled>
          <GridColumnStyled>
            <div className="ui segment">
              <Header as="h4">Visitors/Week</Header>
              <Header as="h3">
                {metrics.visitors.week > 0 ? metrics.visitors.week.toFixed(1) : 0.0}
              </Header>
            </div>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Month</Header>
              <Header as="h3">
                {metrics.visitors.month > 0 ? metrics.visitors.month.toFixed(1) : 0.0}
              </Header>
            </Segment>
          </GridColumnStyled>

          <GridColumnStyled>
            <Segment>
              <Header as="h4"># Ratings</Header>
              <Header as="h3">{metrics.ratings}</Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <div className="ui segment">
              <Header as="h4"># Comments</Header>
              <Header as="h3">{metrics.comments}</Header>
            </div>
          </GridColumnStyled>
        </Grid.Row>
      </MainGrid>

      <Grid style={{ marginTop: '10px' }}>
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Segment>
            <BarTraffic metrics={metrics.apps} />
          </Segment>
        </Grid.Column>
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Segment>
            <BarRated metrics={metrics.apps} />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8} tablet={16} mobile={16}>
          <Segment>
            <BarClickthroughs metrics={metrics.apps} />
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default React.memo(AppSummary);
