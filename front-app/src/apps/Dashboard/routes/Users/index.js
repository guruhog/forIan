import React from 'react';
import { Segment, Container, Table, Loader, Image } from 'semantic-ui-react';
import styled from 'styled-components';

import { HeaderCellStyled } from 'core/components/UI/TableAG';
import { useGetUsers } from 'core/providers/User/actions';
import NoImage from 'assets/images/noImage.png';

const ContainerStyled = styled(Container)`
  padding: 30px 15px;
`;

const SegmentStyled = styled(Segment)`
  padding: 20px 40px !important;
`;

function Users() {
  const { result, loading } = useGetUsers({ searchTxt: '', perPage: 10 });

  return (
    <ContainerStyled fluid>
      <SegmentStyled>
        <Table color="blue" celled striped unstackable={true}>
          <Table.Header>
            <Table.Row>
              <HeaderCellStyled width={2} textAlign="center">
                Avatar
              </HeaderCellStyled>
              <HeaderCellStyled>521</HeaderCellStyled>
              <HeaderCellStyled>Name</HeaderCellStyled>
              <HeaderCellStyled>Title</HeaderCellStyled>
              <HeaderCellStyled>Email</HeaderCellStyled>
              <HeaderCellStyled>Department</HeaderCellStyled>
              <HeaderCellStyled width={1}>Country</HeaderCellStyled>
              <HeaderCellStyled>Phone</HeaderCellStyled>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan="5">
                  <Segment basic>
                    <Loader active inline="centered" />
                  </Segment>
                </Table.Cell>
              </Table.Row>
            ) : (
              result.length > 0 &&
              result.map((user, i) => (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">
                    <Image src={NoImage} size="tiny" avatar />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.fullname}</Table.Cell>
                  <Table.Cell>{user.title}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.department}</Table.Cell>
                  <Table.Cell>{user.country}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </SegmentStyled>
    </ContainerStyled>
  );
}

export default React.memo(Users);
