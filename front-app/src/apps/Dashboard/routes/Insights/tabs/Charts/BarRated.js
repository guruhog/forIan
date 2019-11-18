import React, { useState } from 'react';
import { HorizontalBar } from 'react-chartjs-3';
import { Grid, Dropdown } from 'semantic-ui-react';
import { style } from '../style';

const optionsBar = {
  legend: {
    display: false
  },
  maintainAspectRatio: false
};

export default function BarRated({ metrics }) {
  const [viewOptions, setViewOptions] = useState({ view: 'onlyWithValues', limit: 'all' });

  const apps = Object.values(metrics);
  apps.sort((a, b) => (a.ratings < b.ratings ? 1 : -1));

  let labels = [];
  let ratings = [];

  apps.forEach(item => {
    if (viewOptions.view === 'onlyWithValues') {
      if (item.ratings > 0) {
        labels.push(item.title);
        ratings.push(item.ratings);
      }
    } else {
      labels.push(item.title);
      ratings.push(item.ratings);
    }
  });

  if (viewOptions.limit !== 'all') {
    labels = labels.slice(0, viewOptions.limit);
    ratings = ratings.slice(0, viewOptions.limit);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        ...style,
        data: ratings
      }
    ]
  };

  // const data = {
  //   labels: apps.map(item => item.title),
  //   datasets: [
  //     {
  //       ...style,
  //       data: apps.map(item => item.ratings)
  //     }
  //   ]
  // };
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
            <h4>Highest Rated</h4>
            <div>
              <Dropdown
                selection
                options={[
                  { key: 'onlyWithValues', text: 'Only with values', value: 'onlyWithValues' },
                  { key: 'all', text: 'All', value: 'all' }
                ]}
                onChange={(_, option) => setViewOptions({ ...viewOptions, view: option.value })}
                value={viewOptions.view}
              />
              <Dropdown
                selection
                options={[
                  { key: 'all', text: 'Show all', value: 'all' },
                  { key: '10', text: 'Show 10', value: '10' },
                  { key: '20', text: 'Show 20', value: '20' },
                  { key: '50', text: 'Show 50', value: '50' },
                  { key: '100', text: 'Show 100', value: '100' }
                ]}
                onChange={(_, option) => setViewOptions({ ...viewOptions, limit: option.value })}
                value={viewOptions.limit}
                compact
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
          <div
            style={{
              height: `${labels.length > 1 ? labels.length * 30 : 80}px`,
              paddingTop: '20px'
            }}
          >
            {labels.length > 0 && <HorizontalBar data={data} options={optionsBar} />}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    // <Grid centered verticalAlign="middle">
    //   <Grid.Row>
    //     <Grid.Column>
    //       <h4>Highest Rated</h4>
    //       <HorizontalBar data={data} options={optionsBar} width={40} height={apps.length * 2} />
    //     </Grid.Column>
    //   </Grid.Row>
    // </Grid>
  );
}
