import React from 'react';
import { HorizontalBar } from 'react-chartjs-3';
import { Grid } from 'semantic-ui-react';
import { style } from '../style';

const optionsBar = {
  legend: {
    display: false
  }
};

export default function BarRated({ metrics }) {
  const apps = Object.values(metrics);
  apps.sort((a, b) => (a.ratings < b.ratings ? 1 : -1));

  const data = {
    labels: apps.map(item => item.title),
    datasets: [
      {
        ...style,
        data: apps.map(item => item.ratings)
      }
    ]
  };
  return (
    <Grid centered verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <h4>Highest Rated</h4>
          <HorizontalBar data={data} options={optionsBar} width={40} height={50} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
