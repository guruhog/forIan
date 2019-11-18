import React, { useEffect, useState } from 'react';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import { GridColumnStyled } from './style';
import LineUserPerDay from './Charts/LineUserPerDay';
import LineHitPerDay from './Charts/LineHitPerDay';
import BarHitsPerPage from './Charts/BarHitsPerPage';

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
          <Grid.Column width={16}>
            <Segment color="blue">
              <Grid style={{ padding: 0, margin: 0 }}>
                <Grid.Row style={{ padding: 0, margin: 0 }}>
                  <Grid.Column
                    computer={3}
                    tablet={16}
                    style={{ padding: 0, margin: 0, minWidth: '225px' }}
                  >
                    <Header as="h2" color="blue" style={{ margin: 0 }}>
                      App Breakdown for :
                    </Header>
                  </Grid.Column>
                  <Grid.Column
                    computer={4}
                    tablet={16}
                    mobile={16}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <Dropdown
                      style={{ width: '400px' }}
                      selection
                      options={Object.entries(allApps).map(([key, value]) => ({
                        key,
                        text: value.title,
                        value: key
                      }))}
                      value={selectedApp}
                      onChange={(_, e) => setSelectedApp(e.value)}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Day</Header>
              <Header as="h3">
                {summary?.visitors?.day > 0 ? summary?.visitors?.day.toFixed(1) : 0.0}
              </Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Week</Header>
              <Header as="h3">
                {summary?.visitors?.week > 0 ? summary?.visitors?.week.toFixed(1) : 0.0}
              </Header>
            </Segment>
          </GridColumnStyled>
          <GridColumnStyled>
            <Segment>
              <Header as="h4">Visitors/Month</Header>
              <Header as="h3">
                {summary?.visitors?.month > 0 ? summary?.visitors?.month.toFixed(1) : 0.0}
              </Header>
            </Segment>
          </GridColumnStyled>
        </Grid.Row>
      </Grid>

      <Grid centered style={{ marginTop: '10px' }}>
        <Grid.Column computer="8" tablet="16" mobile="16">
          <Segment>
            {summary && <LineUserPerDay metrics={summary} searchParams={searchParams} />}
          </Segment>
        </Grid.Column>
        <Grid.Column computer="8" tablet="16" mobile="16">
          <Segment>
            {summary && <LineHitPerDay metrics={summary} searchParams={searchParams} />}
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer="8" tablet="16" mobile="16">
          <Segment>{summary && <BarHitsPerPage metrics={summary} />}</Segment>
        </Grid.Column>
      </Grid>
    </>
  );
}
export default React.memo(AppBreakDown);
