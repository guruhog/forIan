import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { DARK, LIGHT_GRAY, BLUE, SIDE_MENU_HOVER_COLOR } from 'core/constants/colors';

import { Link, withRouter } from 'react-router-dom';

const StyledMenu = styled(Menu)`
  background-color: ${DARK} !important;
  width: 100%;
  border-radius: 0 !important;
  padding: 10px !important;
`;

const StyledMenuItem = styled(Menu.Item)`
  display: flex !important;
  height: 40px !important;
  font-size: 14px;
  font-weight: 700 !important;
  color: ${LIGHT_GRAY} !important;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${SIDE_MENU_HOVER_COLOR} !important;
    color: #fff !important;
    cursor: pointer;
  }

  & span {
    margin-left: 10px;
  }

  &.active {
    background-color: ${BLUE} !important;
    color: #fff !important;
  }
`;

const NavNameWrapper = styled.div`
  font-size: 10px;
  color: #7c8086;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  padding: 10px;
`;

const menu = [
  { path: '/dashboard/applications', icon: 'th', name: 'Applications' },
  { path: '/dashboard/users', icon: 'users', name: 'Users' },
  { path: '/dashboard/insights', icon: 'chart pie', name: 'Metrics Dashboard' }
];

function Sidemenu(props) {
  const {
    location: { pathname }
  } = props;

  return (
    <StyledMenu vertical>
      <NavNameWrapper>navigation</NavNameWrapper>
      {menu.map(item => (
        <Link to={item.path} key={item.path}>
          <StyledMenuItem active={item.path === pathname}>
            <Icon name={item.icon} />
            <span>{item.name}</span>
          </StyledMenuItem>
        </Link>
      ))}
    </StyledMenu>
  );
}

export default withRouter(Sidemenu);
