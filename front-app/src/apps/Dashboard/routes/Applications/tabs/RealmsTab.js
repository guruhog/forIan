import React from 'react';
import { Table } from 'semantic-ui-react';

import { HeaderCellStyled } from 'core/components/UI/TableAG';

function RealmsTab() {
  return (
    <Table color="blue" celled striped unstackable={true} style={{ width: '800px' }}>
      <Table.Header>
        <Table.Row>
          <HeaderCellStyled width={7}>Name</HeaderCellStyled>
          <HeaderCellStyled width={2} textAlign="center">
            Type
          </HeaderCellStyled>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>GDO GDD</Table.Cell>
          <Table.Cell textAlign="center">LEVEL_1_GRP</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>TBO GDO GDD</Table.Cell>
          <Table.Cell textAlign="center">LEVEL_2_GRP</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default React.memo(RealmsTab);
