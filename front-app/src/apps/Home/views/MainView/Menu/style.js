import styled from 'styled-components';
import { BLUE } from 'core/constants/colors';
import { Menu } from 'semantic-ui-react';

export const MenuItem = styled(Menu.Item)`
  cursor: pointer;

  &.active {
    background-color: ${BLUE} !important;
    color: #fff !important;
    font-weight: 600 !important;
  }
`;
