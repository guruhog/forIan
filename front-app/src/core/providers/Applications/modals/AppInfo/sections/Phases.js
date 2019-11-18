import React from 'react';
import { Grid, Header, Segment, Label } from 'semantic-ui-react';
import { BLUE } from 'core/constants/colors';

function Phases({ data }) {
  return (
    <Grid.Row style={{ marginTop: '15px', padding: 0 }}>
      <Grid.Column>
        <Segment>
          <Header as="h3" style={{ color: BLUE }}>
            Study Phase Applicability
          </Header>
          <div style={{ marginTop: '15px' }}>
            {data.map(item => (
              <Label key={item._id} pointing="right" {...(item.active ? { color: 'blue' } : '')}>
                {item.title}
              </Label>
            ))}
          </div>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}

export default React.memo(Phases);
