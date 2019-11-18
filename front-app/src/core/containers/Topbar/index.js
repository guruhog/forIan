import React, { useContext } from 'react';
import { Menu, Icon, Label, Image, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { AccountInfoMenu, AccountInfoMenuItem } from './AccountInfoMenu';
import { Link } from 'react-router-dom';
// import { doLogout } from 'core/providers/Auth/actions';
import Logo from 'assets/images/novartis_logo.jpg';
import ModalContext from 'core/providers/Modal/Context';
import { MODAL_TYPES } from 'core/providers/Profile/constants';
import { SHOW_MESSAGES } from 'core/providers/Messages/constants';
import { showModal } from 'core/providers/Modal/actions';

const LabelStyled = styled(Label)`
  margin: 0 !important;
  top: 7px !important;
  padding: 3px 5px !important;
  left: 85% !important;
`;

const MenuItemNoBorder = styled(Menu.Item)`
  &:before {
    background: none !important;
  }
`;

const DropdownItem = styled(Dropdown.Item)`
  height: 50px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  display: flex !important;
  align-items: center;
`;

function Topbar() {
  const { dispatch } = useContext(ModalContext);

  // const handleDoLogout = () => {
  //   doLogout();

  //   return window.location.replace('/login');
  // };

  return (
    <Menu fixed="top" style={{ height: '60px' }}>
      <Menu.Menu position="left">
        <Menu.Item style={{ paddingRight: '35px' }}>
          <Link to="/home">
            <Image src={Logo} style={{ height: '34px', width: '186px' }} />
          </Link>
        </Menu.Item>
        <MenuItemNoBorder>
          <Link
            to="/home"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              marginLeft: '10px',
              color: '#2185d0',
              paddingTop: '25px',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <h2>Application Gateway</h2>
            <div
              style={{
                fontSize: '12px',
                fontStyle: 'italic',
                marginBottom: '15px',
                marginLeft: '7px'
              }}
            >
              Version 1.0-alpha
            </div>
          </Link>
        </MenuItemNoBorder>
      </Menu.Menu>
      <Menu.Menu position="right">
        {/* <div
          style={{
            display: 'flex',
            width: '200px',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <div style={{ alignSelf: 'flex-end', marginBottom: '18px' }}>
            <i>Powered by</i>
          </div>
          <div style={{ color: '#2185d0', fontWeight: 900, fontSize: '22px', margin: '0 10px' }}>
            TBO
          </div>
        </div> */}
        <Dropdown
          icon={false}
          style={{ borderLeft: '1px solid rgba(0,0,0,.1)' }}
          trigger={
            <AccountInfoMenuItem style={{ height: '100%' }}>
              <Icon name="bell" size="large" color="grey">
                <LabelStyled color="red" floating>
                  1
                </LabelStyled>
              </Icon>
            </AccountInfoMenuItem>
          }
        >
          <Dropdown.Menu style={{ fontSize: '15px', width: '100%', marginTop: '5px' }}>
            <DropdownItem
              active
              style={{ width: '250px', lineHeight: '20px' }}
              onClick={() => dispatch(showModal(SHOW_MESSAGES))}
            >
              <Icon name="info circle" color="red" />
              Application Gateway 1.0 <br />
              Early Adopter launch.
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown trigger={<AccountInfoMenu />} icon={false}>
          <Dropdown.Menu style={{ fontSize: '15px', width: '100%', marginTop: '5px' }}>
            <Dropdown.Item onClick={() => dispatch(showModal(MODAL_TYPES.SHOW_PROFILE))}>
              <Icon name="info circle" />
              My Profile
            </Dropdown.Item>
            {/* <Dropdown.Divider style={{ margin: 0 }} />
            <Dropdown.Item onClick={() => handleDoLogout()}>
              <Icon name="log out" />
              Logout
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <AccountInfoMenuItem as={Link} to="/dashboard">
          <Icon name="cog" size="large" color="grey" />
        </AccountInfoMenuItem>
      </Menu.Menu>
    </Menu>
  );
}

export default Topbar;
