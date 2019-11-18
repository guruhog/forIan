import React, { useState } from 'react';
import AppMenu from './AppMenu';

import { Segment, Container } from 'semantic-ui-react';
import styled from 'styled-components';

/** Tabs */
import ApplicationsTab from './tabs/ApplicationsTab';
import DictionariesTab from './tabs/DictionariesTab';
import RealmsTab from './tabs/RealmsTab';

const ContainerStyled = styled(Container)`
  padding: 30px 15px;
`;

const SegmentStyled = styled(Segment)`
  margin-top: 40px !important;
  padding: 40px !important;
`;

function Applications() {
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <>
      <AppMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <ContainerStyled fluid>
        <SegmentStyled>
          {(() => {
            switch (activeMenu) {
              case 1:
                return <DictionariesTab />;

              case 2:
                return <RealmsTab />;

              default:
                return <ApplicationsTab />;
            }
          })()}
        </SegmentStyled>
      </ContainerStyled>
    </>
  );
}

export default React.memo(Applications);
