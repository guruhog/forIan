import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const style = {
  backgroundColor: 'rgb(0,114,198,1.0)',
  borderColor: 'rgb(0,114,198,1.0)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(0,85,147)',
  hoverBorderColor: 'rgba(255,99,132,1)'
};

export const GridColumnStyled = styled(Grid.Column)`
  padding-top: 10px;
  min-width: 155px;
`;
