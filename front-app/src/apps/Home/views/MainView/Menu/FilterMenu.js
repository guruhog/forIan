import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

import styled from 'styled-components';

const DropdownStyled = styled(Dropdown)`
  background-color: #2185d0 !important;
  color: #fff !important;
  height: 100%;
  width: 100%;
  padding-top: 13px !important;

  &:hover {
    background-color: #1678c2 !important;
  }
`;

function FilterMenu({ targetGroups, target, handleSetTarget }) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(false);

  useEffect(() => {
    setOpen(!!target.type);
  }, [target.type]);

  useEffect(() => {
    const handler = () => {
      setOpen(false);
    };

    if (open) {
      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }
  }, [open]);

  const options = !target.type
    ? { ...targetGroups }
    : Object.values(targetGroups).filter(item => item.type === target.type);

  return (
    <DropdownStyled
      scrolling
      ref={dropRef}
      item
      button
      className="icon"
      labeled
      text="Filters"
      open={open}
      onClick={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Dropdown.Menu style={{ marginTop: '5px' }}>
        {Object.values(options).map(item => (
          <Dropdown.Item
            text={item.title}
            icon={target.values[item._id] && <Icon name="check circle" color="blue" />}
            key={item._id}
            value={item._id}
            onClick={() => handleSetTarget({ title: item.title, id: item._id }, item.type)}
          />
        ))}
      </Dropdown.Menu>
    </DropdownStyled>
  );
}

export default React.memo(FilterMenu);
