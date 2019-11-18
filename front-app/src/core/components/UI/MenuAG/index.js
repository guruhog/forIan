import { APP_MENU_HOVER_COLOR, BLUE } from 'core/constants/colors';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

export const MenuStyled = styled(Menu)`
  border: 1px solid #ccc !important;
`;

// export const MenuItemStyled = styled(Menu.Item)`
//   ${props =>
//     props.padding ? `padding: ${props.padding} !important` : 'padding: 20px 30px !important;'}
//   font-weight: 600 !important;
//   color: #6c757d !important;
//   ${props => (props.width ? `width: ${props.width}` : '')}

//   &:hover {
//     background-color: ${APP_MENU_HOVER_COLOR} !important;
//     color: #fff !important;
//     cursor: pointer;
//   }

//   &.active {
//     background-color: ${BLUE} !important;
//     color: #fff !important;
//   }
// `;
export const MenuItemStyled = styled(Menu.Item)`
  flex-direction: ${props => (props.flex ? props.flex : 'row !important')}
  align-items: center;
  justify-content: center;
  font-weight: 600 !important;
  color: #6c757d !important;
  ${props =>
    props.padding ? `padding: ${props.padding} !important` : 'padding: 20px 30px !important;'}
  ${props => (props.width ? `width: ${props.width}` : '')}

  &:hover {
    background-color: ${APP_MENU_HOVER_COLOR} !important;
    color: #fff !important;
    cursor: pointer;
  }

  &.active {
    background-color: ${BLUE} !important;
    color: #fff !important;
  }

  i {
    margin-bottom: 0 !important;
  }
`;

export const MenuName = styled.div`
  margin-left: 10px;
`;
