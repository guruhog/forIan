import React from 'react';
import ContributorAG from 'core/components/UI/ContributorAG';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { BLUE } from 'core/constants/colors';

function Contributors({ data }) {
  return (
    <Grid.Row style={{ marginTop: '15px', padding: 0 }}>
      <Grid.Column>
        <Segment>
          <Header as="h3" style={{ color: BLUE }}>
            Contributors
          </Header>
          <Grid style={{ marginTop: '15px' }}>
            <Grid.Row columns="2">
              {data.map((contributor, i) => (
                <Grid.Column key={i} style={{ marginLeft: '-15px', marginBottom: '10px' }}>
                  <ContributorAG contributor={contributor} hasCloseIcon={false} />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}

export default React.memo(Contributors);
