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

function BarHitsPerPage({ metrics }) {
  const [viewOptions, setViewOptions] = useState({ view: 'onlyWithValues', limit: 'all' });

  const pages = Object.entries(metrics.hitsPerPage);
  pages.sort((a, b) => (a[1] < b[1] ? 1 : -1));

  let labels = [];
  let views = [];

  pages.forEach(([pageName, value]) => {
    labels.push(pageName);
    views.push(value);
  });

  if (viewOptions.limit !== 'all') {
    labels = labels.slice(0, viewOptions.limit);
    views = views.slice(0, viewOptions.limit);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        ...style,
        data: views
      }
    ]
  };

  return (
    <Grid>
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
            <h4># Most visited page</h4>
            <div>
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
              height: `${labels.length === 1 ? 80 : labels.length * 30}px`,
              paddingTop: '20px'
            }}
          >
            <HorizontalBar data={data} options={optionsBar} />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default React.memo(BarHitsPerPage);
