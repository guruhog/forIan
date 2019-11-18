import React, { useEffect, useState } from 'react';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import { GridColumnStyled } from './style';
import LineUserPerDay from './Charts/LineUserPerDay';
import LineHitPerDay from './Charts/LineHitPerDay';

import { useGetAppSummary } from 'core/providers/Insights/actions';

function AppBreakDown({ allApps, selectedApp, setSelectedApp, searchParams }) {
  const { data } = useGetAppSummary(searchParams, selectedApp);
  const [summary, setSummary] = useState(false);

  useEffect(() => {
    if (data && data.getAppSummary) {
      setSummary(JSON.parse(data.getAppSummary));
    }
  }, [data]);

  return (
    <>
      <Grid style={{ marginTop: '30px' }}>
        <Grid.Row>
          <Grid.Column textAlign="left" width={16}>
            <Segment color="blue">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Header as="h2" color="blue" style={{ margin: 0 }}>
                  App Breakdown for :
                </Header>
                <Dropdown
                  style={{ marginLeft: '10px', width: '400px' }}
                  selection
                  options={Object.entries(allApps).map(([key, value]) => ({
                    key,
                    text: value.title,
                    value: key
                  }))}
                  value={selectedApp}
                  onChange={(_, e) => setSelectedApp(e.value)}
                />
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Day</Header>
              <Header as="h3">
                {summary?.visitors?.day > 0 ? summary?.visitors?.day.toFixed(2) : 0}
              </Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Week</Header>
              <Header as="h3">
                {summary?.visitors?.week > 0 ? summary?.visitors?.week.toFixed(2) : 0}
              </Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Month</Header>
              <Header as="h3">
                {summary?.visitors?.month > 0 ? summary?.visitors?.month.toFixed(2) : 0}
              </Header>
            </Segment>
          </GridColumnStyled>
        </Grid.Row>
      </Grid>

      <Grid centered style={{ marginTop: '10px' }}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              {summary && <LineUserPerDay metrics={summary} searchParams={searchParams} />}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: '10px' }}>
          <Grid.Column>
            <Segment>
              {summary && <LineHitPerDay metrics={summary} searchParams={searchParams} />}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
export default React.memo(AppBreakDown);
