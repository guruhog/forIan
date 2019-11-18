import React, { useState } from 'react';
import { Menu, Icon, Dropdown, Label } from 'semantic-ui-react';
import styled from 'styled-components';

const DropdownStyled = styled(Dropdown)`
  &:hover {
    background-color: #e9ecef !important;
  }

  &.active {
    color: #fff !important;
    background-color: #1678c2 !important;
    font-weight: 600 !important;
  }
`;

function GroupMenu({ target, handleSetTarget, targetGroups }) {
  return (
    <Menu compact>
      <Menu.Item>Filter By :</Menu.Item>
      <CustomDropDown
        name="Function"
        type="targetFunctions"
        target={target}
        targetGroups={targetGroups}
        handleSetTarget={handleSetTarget}
      />
      <CustomDropDown
        name="Role"
        type="targetRoles"
        target={target}
        targetGroups={targetGroups}
        handleSetTarget={handleSetTarget}
      />
      <CustomDropDown
        name="Division"
        type="targetFranchises"
        target={target}
        targetGroups={targetGroups}
        handleSetTarget={handleSetTarget}
      />
    </Menu>
  );
}

const CustomDropDown = ({ name, type, target, targetGroups, handleSetTarget }) => {
  const [menuOpen, setMenuOpen] = useState({ type: false, open: false });

  return (
    <DropdownStyled
      scrolling
      item
      labeled
      open={menuOpen.type === type && menuOpen.open}
      onBlur={() => setMenuOpen({ type, open: false })}
      onClick={() => setMenuOpen({ type, open: true })}
      style={{ height: '41px' }}
      trigger={
        <span>
          <Label size="tiny" color="grey" style={{ marginLeft: '-5px', marginRight: '10px' }}>
            {target.type === type ? Object.values(target.values).length : 0}
          </Label>
          {name}
        </span>
      }
    >
      <Dropdown.Menu>
        {Object.values(targetGroups)
          .filter(item => item.type === type)
          .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
          .map(item => (
            <Dropdown.Item
              key={item._id}
              text={item.title}
              icon={target.values[item._id] && <Icon name="check circle" color="blue" />}
              onClick={e => {
                e.stopPropagation();
                handleSetTarget({ title: item.title, id: item._id }, item.type);
              }}
            ></Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </DropdownStyled>
  );
};

export default React.memo(GroupMenu);
