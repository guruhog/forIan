import { Table, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { TABLE_HEADER_COLOR } from 'core/constants/colors';

export const HeaderCellStyled = styled(Table.HeaderCell)`
  background-color: ${TABLE_HEADER_COLOR} !important;

  &:not(.unstackable) tr {
    padding: 0 !important;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const ItemPerPageWrapper = styled.span`
  margin-left: 10px;
  font-weight: 500;
`;

export const PaginationWrapper = styled.div`
  text-align: right;
`;

export const EditBtn = styled(Button)`
  display: flex !important;
`;

export const DeleteBtn = styled(Button)`
  display: flex !important;
  margin-left: 10px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
`;

export const TableCellStyled = styled(Table.Cell)`
  display: flex;
  justify-content: center;
`;
