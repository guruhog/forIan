import React, { useState } from 'react';
import HomeLayout from 'core/containers/HomeLayout';
import { Container, Icon, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { MenuItemStyled, MenuName } from 'core/components/UI/MenuAG';
import MainView from './views/MainView';

const ContainerStyled = styled(Container)`
  padding-top: 80px !important;
`;

const MenuWrapper = styled.div`
  margin-bottom: 50px;
  text-align: center;
`;

const menu = [
  { name: 'Favorites', icon: 'heart', key: 'favorites' },
  { name: 'My Apps', icon: 'user circle', key: 'personal' },
  { name: 'Explore All', icon: 'th large', key: 'all' }
];

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('all');

  return (
    <HomeLayout>
      <ContainerStyled>
        <MenuWrapper>
          <Menu compact icon="labeled">
            {menu.map(item => (
              <MenuItemStyled
                name={item.name}
                active={item.key === activeMenu}
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
              >
                <Icon name={item.icon} />
                <MenuName>{item.name}</MenuName>
              </MenuItemStyled>
            ))}
          </Menu>
        </MenuWrapper>

        <MainView activeMenu={activeMenu} />
      </ContainerStyled>
    </HomeLayout>
  );
}
