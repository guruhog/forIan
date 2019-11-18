import React, { useContext, useState } from 'react';
import { Table, Button, Input, Image, Loader, Segment, Confirm, Icon } from 'semantic-ui-react';
import { ButtonWrapper, HeaderCellStyled } from 'core/components/UI/TableAG';

import ModalContext from 'core/providers/Modal/Context';
import { showModal } from 'core/providers/Modal/actions';
import { MODAL_TYPES } from 'core/providers/Applications/constants';

import {
  useGetApplicationsDashboard,
  useShowHideApplication,
  useDeleteApplication
} from 'core/providers/Applications/actions/application';

import NoImage from 'assets/images/noImage.png';

function ApplicationsTab() {
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [search, setSearch] = useState('');

  const { dispatch } = useContext(ModalContext);

  const { result, loading } = useGetApplicationsDashboard();
  const { handleChange } = useShowHideApplication();
  const { handleDelete } = useDeleteApplication();

  const handleShowHideApp = (appId, visible) => {
    handleChange({ variables: { appId, visible } });
  };

  const handleConfirmation = () => {
    handleDelete({ variables: { appId: confirm.id } }).then(() => setConfirm({ open: false }));
  };

  let apps = [...result];
  if (search.trim() !== '') {
    apps = result.filter(app => app.title.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <React.Fragment>
      <ButtonWrapper>
        <Button
          content="Add Application"
          color="blue"
          icon="plus"
          labelPosition="right"
          onClick={() => dispatch(showModal(MODAL_TYPES.ADD_APPLICATION))}
        />

        <Input
          placeholder="Search..."
          icon={search ? <Icon name="close" onClick={() => setSearch('')} link /> : 'search'}
          name="searchTxt"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '400px' }}
        />
      </ButtonWrapper>

      <Table color="blue" celled striped unstackable={true}>
        <Table.Header>
          <Table.Row>
            <HeaderCellStyled width={2} textAlign="center">
              Image
            </HeaderCellStyled>
            <HeaderCellStyled width={4}>App Name</HeaderCellStyled>
            <HeaderCellStyled width={6}>Url</HeaderCellStyled>
            <HeaderCellStyled width={1} textAlign="center">
              Version
            </HeaderCellStyled>
            <HeaderCellStyled width={3} textAlign="center">
              Actions
            </HeaderCellStyled>
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
            apps.length > 0 &&
            apps.map((app, i) => (
              <Table.Row key={`appKey${i}`}>
                <Table.Cell textAlign="center">
                  <Image
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                    onClick={() =>
                      dispatch(showModal(MODAL_TYPES.SHOW_APPLICATION_ID, { appId: app._id }))
                    }
                    src={app.picture ? app.picture : NoImage}
                    size="tiny"
                  />
                </Table.Cell>
                <Table.Cell>{app.title}</Table.Cell>
                <Table.Cell style={{ wordBreak: 'break-all' }}>{app.url}</Table.Cell>
                <Table.Cell textAlign="center">{app.currentVersion}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    icon={app.visible ? 'eye' : 'eye slash'}
                    {...(app.visible ? { color: 'green' } : '')}
                    onClick={() => handleShowHideApp(app._id, !app.visible)}
                  />
                  <Button
                    icon="edit"
                    color="blue"
                    onClick={() =>
                      dispatch(showModal(MODAL_TYPES.EDIT_APPLICATION, { appId: app._id }))
                    }
                  />
                  <Button
                    icon="delete"
                    color="red"
                    onClick={() => setConfirm({ open: true, id: app._id })}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <Confirm
        open={confirm.open}
        confirmButton="Yes"
        onCancel={() => setConfirm({ open: false })}
        onConfirm={handleConfirmation}
        size="tiny"
      />
    </React.Fragment>
  );
}

export default React.memo(ApplicationsTab);
