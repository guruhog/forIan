import React from 'react';
import { Line } from 'react-chartjs-3';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import { getBetweenDates } from 'core/utils/helpers';

const optionsLine = {
  legend: {
    display: false
  }
};

function LineHitPerDay({ metrics, searchParams }) {
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

  if (metrics.trafficByDate && Object.values(metrics.trafficByDate).length > 0) {
    const { startDate, endDate } = getBetweenDates(
      searchParams.year,
      searchParams.from + 1,
      searchParams.to + 1
    );

    const start = moment(startDate);
    const end = moment(endDate);

    let labels = [];
    let dataSet = [];
    while (start.isSameOrBefore(moment(end), 'day')) {
      labels.push(start.format('MMM-DD'));

      const value = metrics.trafficByDate[start.format('MM-DD')]
        ? metrics.trafficByDate[start.format('MM-DD')]
        : 0;
      dataSet.push(value);

      start.add(1, 'days');
    }

    data.datasets[0].data = dataSet;
    data.labels = labels;
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <h4># Hits </h4>
          <Line data={data} options={optionsLine} height={100} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default React.memo(LineHitPerDay);
