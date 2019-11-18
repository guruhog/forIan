import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import Topbar from '../Topbar';
import Sidemenu from './Sidemenu';
import styled from 'styled-components';

const Sidepanel = styled(Menu)`
  margin-top: 60px !important;
  width: 100%;
  min-width: 200px;
  z-index: 100 !important;
`;

const MainpanelWrapper = styled.div`
  padding: 60px 0 0 210px;
`;

function DashboardLayout({ children }) {
  return (
    <Container fluid>
      <Topbar />

      <Sidepanel fixed="left">
        <Sidemenu />
      </Sidepanel>

      <MainpanelWrapper>{children}</MainpanelWrapper>
    </Container>
  );
}

export default DashboardLayout;
