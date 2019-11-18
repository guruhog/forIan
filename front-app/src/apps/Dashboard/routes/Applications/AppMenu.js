import React from 'react';
import { Icon, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { MenuItemStyled, MenuStyled, MenuName } from 'core/components/UI/MenuAG';
import PropTypes from 'prop-types';

const ContainerStyled = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const menu = [
  { name: 'Application MGT', icon: 'th large' },
  { name: 'Dictionary MGT', icon: 'book' }
];

function AppMenu({ activeMenu, setActiveMenu }) {
  return (
    <ContainerStyled>
      <MenuStyled compact icon="labeled">
        {menu.map((item, i) => (
          <MenuItemStyled
            name={item.name}
            active={i === activeMenu}
            key={i}
            onClick={() => setActiveMenu(i)}
          >
            <Icon name={item.icon} />
            <MenuName>{item.name}</MenuName>
          </MenuItemStyled>
        ))}
      </MenuStyled>
    </ContainerStyled>
  );
}

AppMenu.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  setActiveMenu: PropTypes.func.isRequired
};

export default React.memo(AppMenu);
