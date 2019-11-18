import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { MenuItem } from './style';

function SortByMenu({ settings, setSettings }) {
  return (
    <Menu compact>
      <Menu.Item>Sort By :</Menu.Item>
      <MenuItem
        active={settings.sort === 'alphaDesc' || settings.sort === 'alphaAsc' ? true : false}
        onClick={() =>
          setSettings({
            ...settings,
            sort:
              settings.sort === 'alphaDesc' || settings.sort === 'alphaAsc'
                ? settings.sort === 'alphaDesc'
                  ? 'alphaAsc'
                  : 'alphaDesc'
                : 'alphaDesc'
          })
        }
      >
        <Icon name={`sort alphabet ${settings.sort === 'alphaDesc' ? 'down' : 'up'}`} />
      </MenuItem>
      <MenuItem
        active={settings.sort === 'ratingDesc' || settings.sort === 'ratingAsc' ? true : false}
        onClick={() =>
          setSettings({
            ...settings,
            sort:
              settings.sort === 'ratingDesc' || settings.sort === 'ratingAsc'
                ? settings.sort === 'ratingDesc'
                  ? 'ratingAsc'
                  : 'ratingDesc'
                : 'ratingDesc'
          })
        }
      >
        <Icon name="star" />
      </MenuItem>
    </Menu>
  );
}

export default React.memo(SortByMenu);
