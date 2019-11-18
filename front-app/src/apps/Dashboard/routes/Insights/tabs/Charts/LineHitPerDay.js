import React, { useState } from 'react';
import { Line } from 'react-chartjs-3';
import { Grid, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import { getBetweenDates } from 'core/utils/helpers';

const optionsLine = {
  legend: {
    display: false
  }
};

let data = {
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgb(0,114,198,1.0)',
      borderColor: 'rgb(0,114,198,1.0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10
    }
  ]
};

function LineHitPerDay({ metrics, searchParams }) {
  const [displayBy, setDisplayBy] = useState('day');

  const { startDate, endDate } = getBetweenDates(
    searchParams.year,
    searchParams.from + 1,
    searchParams.to + 1
  );

  const start = moment(startDate);
  const end = moment(endDate);

  const renderByDay = () => {
    let labels = [];
    let dataSet = [];
    while (start.isSameOrBefore(moment(end), 'day')) {
      labels.push(start.format('MMM-DD'));

      const value = metrics.trafficByDay[start.format('MM-DD')]
        ? metrics.trafficByDay[start.format('MM-DD')]
        : 0;
      dataSet.push(value);

      start.add(1, 'day');
    }

    return { labels, dataSet };
  };

  const renderByMonth = () => {
    let labels = [];
    let dataSet = [];
    while (start.isSameOrBefore(moment(end), 'month')) {
      labels.push(start.format('MMM'));

      const value = metrics.trafficByMonth[start.format('MM')]
        ? metrics.trafficByMonth[start.format('MM')]
        : 0;
      dataSet.push(value);

      start.add(1, 'month');
    }

    return { labels, dataSet };
  };

  const result = displayBy === 'day' ? renderByDay() : renderByMonth();

  data.datasets[0].data = result.dataSet;
  data.labels = result.labels;

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <h4># Traffic </h4>
            <Dropdown
              selection
              options={[
                { key: 'day', text: 'Day', value: 'day' },
                { key: 'month', text: 'Month', value: 'month' }
              ]}
              onChange={(_, option) => setDisplayBy(option.value)}
              value={displayBy}
              compact
            />
          </div>
          <Line data={data} options={optionsLine} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default React.memo(LineHitPerDay);
