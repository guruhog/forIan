import React from 'react';
import { Grid, Header, Label, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { BLUE } from 'core/constants/colors';

const HeaderStyled = styled(Header)`
  margin-bottom: 5px;
  margin-top: 15px;
`;

const LabelStyled = styled(Label)`
  margin-top: 5px !important;
`;

function DataSource({ data }) {
  return (
    <Grid.Row style={{ marginTop: '15px', padding: 0 }}>
      <Grid.Column>
        <Segment>
          <Header as="h3" style={{ color: BLUE }}>
            Data Sources
          </Header>
          <div style={{ marginTop: '15px' }}>
            {data.find(item => item.type === 'dataLevel') && (
              <>
                <HeaderStyled as="h4">Data Level</HeaderStyled>
                {data
                  .filter(item => item.type === 'dataLevel')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}

            {data.find(item => item.type === 'dataType') && (
              <>
                <HeaderStyled as="h4">Data Type</HeaderStyled>
                {data
                  .filter(item => item.type === 'dataType')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}

            {data.find(item => item.type === 'systemIn') && (
              <>
                <HeaderStyled as="h4">System In</HeaderStyled>
                {data
                  .filter(item => item.type === 'systemIn')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}

            {data.find(item => item.type === 'systemOut') && (
              <>
                <HeaderStyled as="h4">System Out</HeaderStyled>
                {data
                  .filter(item => item.type === 'systemOut')
                  .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
                  .map(item => (
                    <LabelStyled key={item._id} color="grey">
                      {item.title}
                    </LabelStyled>
                  ))}
              </>
            )}
          </div>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}

export default React.memo(DataSource);
