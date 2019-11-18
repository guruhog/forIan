import React from 'react';
import { Grid, Label, Icon } from 'semantic-ui-react';

import SortByMenu from './SortByMenu';
import LayoutMenu from './LayoutMenu';
import GroupMenu from './GroupMenu';
// import FilterMenu from './FilterMenu';

function MainViewMenu({ settings, setSettings, targetGroups, target, handleSetTarget }) {
  return (
    <>
      <Grid centered style={{ marginTop: 0 }}>
        {/* Sorting Menu */}
        <Grid.Column
          computer={4}
          tablet={16}
          mobile={16}
          style={{ maxWidth: '220px', minWidth: '220px' }}
        >
          <SortByMenu settings={settings} setSettings={setSettings} />
        </Grid.Column>

        {/* Layout Menu */}
        <Grid.Column
          computer={4}
          tablet={16}
          mobile={16}
          style={{ maxWidth: '220px', minWidth: '220px' }}
        >
          <LayoutMenu settings={settings} setSettings={setSettings} />
        </Grid.Column>

        {/* Group Menu By */}
        <Grid.Column
          computer={7}
          tablet={16}
          mobile={16}
          style={{ maxWidth: '493px', minWidth: '493px' }}
        >
          <GroupMenu
            target={target}
            handleSetTarget={handleSetTarget}
            targetGroups={targetGroups}
          />
        </Grid.Column>
      </Grid>
      <Grid style={{ padding: 0, margin: 0 }}>
        <div style={{ height: '50px', zIndex: 1 }}>
          {Object.keys(target.values).length > 0 && (
            <Grid.Row>
              <Grid.Column>
                <Label style={{ fontSize: '15px', marginRight: '20px', marginLeft: '95px' }}>
                  Selected Filters :
                </Label>
                {Object.entries(target.values).map(([id, title]) => (
                  <Label key={id} style={{ marginRight: '10px' }}>
                    {title}
                    <Icon
                      name="close"
                      onClick={() => handleSetTarget({ id, title }, target.type)}
                    />
                  </Label>
                ))}
                <Label color="red" as="a" onClick={() => handleSetTarget(false, false, true)}>
                  Remove All
                </Label>
              </Grid.Column>
            </Grid.Row>
          )}
        </div>
      </Grid>
    </>
  );
}

export default React.memo(MainViewMenu);
