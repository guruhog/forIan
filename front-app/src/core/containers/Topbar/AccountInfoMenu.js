import React, { useContext } from 'react';
import { Image, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import AuthContext from 'core/providers/Auth/Context';
import NoImage from 'assets/images/noImage.png';

const UserNameWrapper = styled.span`
  margin-right: 15px;
  font-weight: 700;
  color: #6c757d;
`;

export const AccountInfoMenuItem = styled(Menu.Item)`
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 0 20px !important;

  &:hover {
    cursor: pointer;
    background-color: #eee !important;
  }
`;

export function AccountInfoMenu({ ...rest }) {
  const {
    state: { fullname }
  } = useContext(AuthContext);

  return (
    <AccountInfoMenuItem {...rest} style={{ height: '100%', whiteSpace: 'nowrap' }}>
      <UserNameWrapper>{fullname}</UserNameWrapper>
      <Image src={NoImage} avatar style={{ objectFit: 'cover' }} />
    </AccountInfoMenuItem>
  );
}
