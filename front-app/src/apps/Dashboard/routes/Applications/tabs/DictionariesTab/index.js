import React, { useState } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import DataSourcesTab from './tabs/DataSourcesTab';
import TargetAudienceTab from './tabs/TargetAudienceTab';
import ContributorsTab from './tabs/ContributorsTab';
import PhasesTab from './tabs/PhasesTab';

const menu = [
  { name: 'DataSources' },
  { name: 'TargetAudience' },
  { name: 'Contributor Roles' },
  { name: 'App Phases' }
];

function DictionariesTab() {
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <Grid>
      <Grid.Column computer={4} tablet={16} mobile={16}>
        <Menu fluid vertical tabular>
          {menu.map((item, i) => (
            <Menu.Item
              active={activeMenu === i}
              color="blue"
              onClick={() => setActiveMenu(i)}
              icon={item.icon}
              key={i}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column computer={12} tablet={16} mobile={16} style={{ paddingLeft: '20px' }}>
        {(() => {
          switch (activeMenu) {
            case 0:
              return <DataSourcesTab />;

            case 1:
              return <TargetAudienceTab />;

            case 2:
              return <ContributorsTab />;

            case 3:
              return <PhasesTab />;

            default:
              return;
          }
        })()}
      </Grid.Column>
    </Grid>
  );
}

export default React.memo(DictionariesTab);
