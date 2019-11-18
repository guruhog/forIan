import React from 'react';
import { Grid, Table, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';

export const TableCellStyled = styled(Table.Cell)`
  color: rgba(0, 0, 0, 0.5);
`;

function Informations({ data }) {
  return (
    <Grid.Row style={{ marginTop: '50px', padding: '0' }}>
      <Grid.Column>
        <Header as="h3">Information</Header>
        <Table>
          <Table.Body>
            <Table.Row>
              <TableCellStyled>Application Url</TableCellStyled>
              <Table.Cell textAlign="right">{data.url}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <TableCellStyled>Provider</TableCellStyled>
              <Table.Cell textAlign="right">{data.provider}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <TableCellStyled>Current Version</TableCellStyled>
              <Table.Cell textAlign="right">{data.currentVersion}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <TableCellStyled>Current Release</TableCellStyled>
              <Table.Cell textAlign="right">
                {data.releaseDate && format(parseISO(data.releaseDate), 'dd.MM.yyyy')}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <TableCellStyled>Next Release</TableCellStyled>
              <Table.Cell textAlign="right">
                {data.nextReleaseDate && format(parseISO(data.nextReleaseDate), 'dd.MM.yyyy')}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid.Row>
  );
}

export default React.memo(Informations);
