import React, { useState, useEffect } from 'react';
import { Grid, Segment, Form } from 'semantic-ui-react';
import moment from 'moment';
import { MenuItemStyled, MenuStyled, MenuName } from 'core/components/UI/MenuAG';

import { useGetSummary } from 'core/providers/Insights/actions';
import AppSummary from './tabs/AppSummary';
import AppBreakDown from './tabs/AppBreakDown';
import AgMetrics from './tabs/AgMetrics';

/** @media only screen and (max-width: 768px) {
    margin-top: 350px !important;
  } */

let years = [];
for (let i = 2019; i <= moment().year(); i++) {
  years.push({ key: i, text: i, value: i });
}

const yearOptions = years.reverse();

const menu = [{ name: 'App Summary' }, { name: 'App BreakDown' }, { name: 'AG Metrics' }];

function Insights() {
  const [metrics, setMetrics] = useState({});

  const [searchParams, setSearchParams] = useState({
    from: moment().month(),
    to: moment().month(),
    year: moment().year()
  });

  const [selectedApp, setSelectedApp] = useState('ba689918-56a5-4dcb-a4a8-978fe57b2892');

  const { data, loading } = useGetSummary(searchParams);

  useEffect(() => {
    if (data && data.getSummary) {
      setMetrics(JSON.parse(data.getSummary));
    }
  }, [data, searchParams]);

  const [activeMenu, setActiveMenu] = useState(0);

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
      <div style={{ textAlign: 'center', marginTop: '130px' }}>
        <MenuStyled compact icon="labeled">
          {menu.map((item, i) => (
            <MenuItemStyled
              name={item.name}
              active={i === activeMenu}
              key={i}
              onClick={() => setActiveMenu(i)}
              padding="5px"
              width="160px"
            >
              <MenuName>{item.name}</MenuName>
            </MenuItemStyled>
          ))}
        </MenuStyled>
      </div>
      {metrics.visitors &&
        (() => {
          switch (activeMenu) {
            case 0:
              return <AppSummary metrics={metrics} loading={loading} />;

            case 1:
              return (
                <AppBreakDown
                  allApps={metrics.apps}
                  selectedApp={selectedApp}
                  setSelectedApp={setSelectedApp}
                  searchParams={searchParams}
                  loading={loading}
                />
              );

            default:
              return <AgMetrics metrics={metrics} loading={loading} />;
          }
        })()}
    </div>
  );
}

export default React.memo(Insights);
