import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { MenuItem } from './style';

export default function LayoutMenu({ settings, setSettings }) {
  return (
    <Menu compact>
      <Menu.Item>Layout :</Menu.Item>
      <MenuItem
        active={settings.view === 'card' ? true : false}
        onClick={() => {
          setSettings({ ...settings, view: 'card' });
        }}
      >
        <Icon name="th" />
      </MenuItem>
      <MenuItem
        active={settings.view === 'table' ? true : false}
        onClick={() => {
          setSettings({ ...settings, view: 'table' });
        }}
      >
        <Icon name="list" />
      </MenuItem>
    </Menu>
  );
}
