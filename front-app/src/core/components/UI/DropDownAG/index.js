import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Icon, Label } from 'semantic-ui-react';

export const DropdownStyled = styled(Dropdown)`
  background-color: #2185d0 !important;
  color: #fff !important;

  &:hover {
    background-color: #1678c2 !important;
  }
`;

export const DropDownAG = props => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownStyled
      trigger={
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '-10px', padding: '5px 0' }}
        >
          <Label circular size="mini">
            {props.type === props.groupFilter.type
              ? Object.keys(props.groupFilter.values).length
              : 0}
          </Label>
          <div style={{ marginLeft: '10px' }}>{props.text}</div>
        </div>
      }
      button
      multiple
      className="icon"
      labeled
      open={open}
      onClick={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Dropdown.Menu>
        {Object.values(props.appGroups)
          .filter(group => group.type === props.type)
          .map(group => (
            <Dropdown.Item
              text={group.title}
              icon={
                props.groupFilter.values[group._id] && <Icon name="check circle" color="blue" />
              }
              key={group._id}
              value={group._id}
              onClick={(_, e) => props.setFilter({ title: group.title, id: group._id }, props.type)}
            />
          ))}
      </Dropdown.Menu>
    </DropdownStyled>
  );
};
