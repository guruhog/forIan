import React from 'react';
import { Icon, Container } from 'semantic-ui-react';
import { MenuItemStyled, MenuStyled, MenuName } from 'core/components/UI/MenuAG';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuWrapper = styled(Container)`
  padding: 20px;
  text-align: center;
`;

const menu = [
  { name: 'Details', icon: 'address card' },
  { name: 'Contributors', icon: 'users' },
  // { name: 'Data Sources', icon: 'server' },
  // { name: 'Target Audience', icon: 'announcement' },
  { name: 'Info Panel', icon: 'idea' },
  { name: 'Support Panel', icon: 'help circle' }
];

function EditAppMenu({ activeMenu, setActiveMenu }) {
  return (
    <MenuWrapper>
      <MenuStyled compact icon="labeled">
        {menu.map((item, i) => (
          <MenuItemStyled key={i} onClick={() => setActiveMenu(i)} active={activeMenu === i}>
            <Icon name={item.icon} />
            <MenuName>{item.name}</MenuName>
          </MenuItemStyled>
        ))}
      </MenuStyled>
    </MenuWrapper>
  );
}

EditAppMenu.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  setActiveMenu: PropTypes.func.isRequired
};

export default React.memo(EditAppMenu);
