import React, { useState, useEffect } from 'react';
import { Grid, Segment, Divider, Form } from 'semantic-ui-react';
import moment from 'moment';

import AppSummary from './components/AppSummary';
import AppBreakDown from './components/AppBreakDown';

import { useGetSummary } from 'core/providers/Insights/actions';
import AgMetrics from './components/AgMetrics';

function Insights() {
  let years = [];
  for (let i = 2019; i <= moment().year(); i++) {
    years.push({ key: i, text: i, value: i });
  }

  const yearOptions = years.reverse();

  const [searchParams, setSearchParams] = useState({
    from: moment().month(),
    to: moment().month(),
    year: moment().year()
  });

  const [selectedApp, setSelectedApp] = useState('ba689918-56a5-4dcb-a4a8-978fe57b2892');
  const [metrics, setMetrics] = useState({});

  const { data } = useGetSummary(searchParams);

  useEffect(() => {
    if (data && data.getSummary) {
      setMetrics(JSON.parse(data.getSummary));
    }
  }, [data, searchParams]);

  return (
    <div style={{ padding: '0 40px' }}>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            textAlign="left"
            computer={7}
            tablet={10}
            mobile={10}
            style={{ position: 'fixed', zIndex: 1, padding: 0, margin: 0 }}
          >
            <Segment tertiary basic>
              <Form>
                <Form.Group inline widths="equal">
                  <Form.Select
                    fluid
                    label="From Month"
                    options={Array.from({ length: 12 }, (_, key) => {
                      return {
                        key,
                        text: moment()
                          .month(parseInt(key))
                          .format('MMMM'),
                        value: key
                      };
                    })}
                    value={searchParams.from}
                    onChange={(_, e) => {
                      setSearchParams({ ...searchParams, from: e.value });
                    }}
                    placeholder="Month"
                  />
                  <Form.Select
                    fluid
                    label="To Month"
                    options={Array.from({ length: 12 }, (_, key) => {
                      return {
                        key,
                        text: moment()
                          .month(parseInt(key))
                          .format('MMMM'),
                        value: key
                      };
                    })}
                    value={searchParams.to}
                    onChange={(_, e) => {
                      setSearchParams({ ...searchParams, to: e.value });
                    }}
                    placeholder="Month"
                  />
                  <Form.Select
                    fluid
                    label="Year"
                    options={yearOptions}
                    value={moment().year()}
                    onChange={(_, e) => {
                      setSearchParams({ ...searchParams, year: e.value });
                    }}
                    placeholder="Year"
                  />
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {metrics.visitors && <AppSummary metrics={metrics} />}
      <Divider />
      {metrics.apps && (
        <AppBreakDown
          allApps={metrics.apps}
          selectedApp={selectedApp}
          setSelectedApp={setSelectedApp}
          searchParams={searchParams}
        />
      )}

      <AgMetrics metrics={metrics} />
    </div>
  );
}

export default React.memo(Insights);
