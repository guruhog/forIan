import React, { useContext, useEffect, useState } from 'react';
import AuthContext from 'core/providers/Auth/Context';

import { Segment, Container, Header, Grid, Dropdown, Divider } from 'semantic-ui-react';
import { Line, Bar } from 'react-chartjs-2';
import { useGetUsersCount } from 'core/providers/User/actions';
import { useGetAppPageViews, useGetAppUniqueUsers } from 'core/providers/Insights/actions';

const dropdownDates = [
  { key: 'lastWeek', text: 'Last Week', value: 'lastWeek' },
  { key: 'last30days', text: 'Last 30 Days', value: 'last30days' },
  { key: 'last60days', text: 'Last 60 Days', value: 'last60days' },
  { key: 'last90days', text: 'Last 90 Days', value: 'last90days' },
  { key: 'lastYear', text: 'Last Year', value: 'lastYear' },
  { key: 'all', text: 'All', value: 'all' }
];

// const dropDownTop = [
//   { key: 1, text: 'Top 5', value: '1' },
//   { key: 2, text: 'Top 10', value: '2' },
//   { key: 3, text: 'Top 20', value: '3' },
//   { key: 4, text: 'All', value: '4' }
// ];

function Insights() {
  const {
    state: { socket }
  } = useContext(AuthContext);

  const [usersOnline, setUsersOnline] = useState(0);
  const [selectedApp, setSelectedApp] = useState(123);

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

  const { result } = useGetUsersCount();
  const { resultAppPageViews, loadingAppPageViews } = useGetAppPageViews(selectedApp);
  const { resultAppUniqueUsers, loadingAppUniqueUsers } = useGetAppUniqueUsers(selectedApp);
  return (
    <>
      <Container fluid style={{ padding: '30px 15px' }}>
        <Segment style={{ padding: '0 40px 20px' }}>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Dropdown selection options={dropdownDates} defaultValue="lastWeek" />
          </div>

          <Header as="h3">Application Gateway System</Header>
          <Divider style={{ marginBottom: '30px' }} />

          <Segment style={{ marginBottom: '30px' }}>
            <Grid columns="4" stackable>
              <Grid.Column textAlign="center">
                <div style={{ fontSize: '2.3rem', fontWeight: 600 }}>{result}</div>
                <div style={{ color: '#6f7a7f', marginTop: '20px' }}>Registed Users</div>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div style={{ fontSize: '2.3rem', fontWeight: 600 }}>13</div>
                <div style={{ color: '#6f7a7f', marginTop: '20px' }}>Uniques Active Users</div>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div style={{ fontSize: '2.3rem', fontWeight: 600 }}>123</div>
                <div style={{ color: '#6f7a7f', marginTop: '20px' }}>Average Visitors/Day</div>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div style={{ fontSize: '2.3rem', fontWeight: 600 }}>{usersOnline}</div>
                <div style={{ color: '#6f7a7f', marginTop: '20px' }}>Users Online Now</div>
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment>

        <Segment style={{ padding: '40px' }}>
          <Grid>
            <Grid.Column computer={2} tablet={16} mobile={16} verticalAlign="middle">
              <h3>Application:</h3>
            </Grid.Column>
            <Grid.Column computer={11} tablet={14} mobile={14} verticalAlign="middle">
              <Dropdown
                selection
                search
                options={[
                  { key: 234, text: 'Edo Dashboard version 1.0', value: 234 },
                  { key: 234343434, text: 'Spotfire Test App 1', value: 234343434 },
                  { key: 16956564, text: 'RDI 2.0', value: 16956564 },
                  { key: 123, text: 'DOT Tool version 5.0', value: 123 }
                ]}
                defaultValue={selectedApp}
                onChange={(_, option) => setSelectedApp(option.value)}
              />
            </Grid.Column>
            <Grid.Column computer={3} tablet={16} mobile={16} textAlign="right">
              <Dropdown selection options={dropdownDates} defaultValue="lastWeek" />
            </Grid.Column>
          </Grid>

          <Divider style={{ marginBottom: '30px' }} />

          {!loadingAppPageViews && (
            <div style={{ width: '70%' }}>
              <Bar
                data={{
                  labels: resultAppPageViews.labels,
                  datasets: [
                    {
                      data: resultAppPageViews.data,
                      label: 'Page Views',
                      backgroundColor: 'rgb(33, 133, 208, 0.5)'
                    }
                  ]
                }}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true
                        }
                      }
                    ]
                  }
                }}
              />
            </div>
          )}

          {!loadingAppUniqueUsers && (
            <>
              <div style={{ marginTop: '50px', width: '70%' }}>
                <Line
                  data={{
                    labels: resultAppUniqueUsers.labels,
                    datasets: [
                      {
                        data: resultAppUniqueUsers.data,
                        label: 'Unique Users',
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(33, 133, 208, 0.5)'
                      }
                    ]
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    }
                  }}
                />
              </div>
            </>
          )}
        </Segment>
      </Container>
    </>
  );
}

export default React.memo(Insights);
