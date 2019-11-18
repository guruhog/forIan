import React, { useContext } from 'react';
import { Table, Popup } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import { MODAL_TYPES } from 'core/providers/Applications/constants';
import { showModal } from 'core/providers/Modal/actions';

import { ButtonStyled, ButtonSupport } from '../components/style';
import AppRating from '../components/AppRating';
import AppComment from '../components/AppComment';
import styled from 'styled-components';
import AppImage from '../components/AppImage';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

const TableStyled = styled(Table)`
  i {
    cursor: pointer !important;
  }
`;

function TableView({
  applications,
  userApps,
  userRatings,
  targetGroups,
  filteredTargetGroups,
  target
}) {
  const { dispatch } = useContext(ModalContext);

  const { handleSave } = useSaveClickTrough();

  const handleOpen = async app => {
    const object = await getObjectClickTrough(app);
    handleSave({ variables: { ...object } });

    window.open(app.url, '_blank');
  };

  const displayAsGroup = () => {
    const results = filteredTargetGroups ? filteredTargetGroups : targetGroups;

    return Object.entries(results).map(([key, group], i) => {
      return group?._id ? (
        <div style={{ width: '100%', marginTop: i > 0 ? '55px' : 0 }} key={key}>
          <div
            style={{
              padding: 0,
              margin: '20px 0 20px 10px',
              textAlign: 'left'
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '32px' }}>{group.title}</span>
          </div>
          <div style={{ width: '100%' }}>{displayAsTable(Object.values(group.apps))}</div>
        </div>
      ) : (
        false
      );
    });
  };

  const displayAsTable = applications => (
    <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
      <TableStyled style={{ zIndex: 1, marginLeft: '10px' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>App Name</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
            <Table.HeaderCell textAlign="center"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {applications.length > 0 &&
            applications.map((app, i) => {
              const hasRating = userRatings.filter(rating => rating.appId === app._id);

              return (
                <Table.Row key={i}>
                  <Table.Cell width={2}>
                    <Popup
                      position="top center"
                      content="Click to open App"
                      inverted
                      trigger={<AppImage height={50} app={app} userApps={userApps} url={app.url} />}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <h4
                      style={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.87)' }}
                      onClick={() => handleOpen(app)}
                    >
                      {app.title}
                    </h4>
                  </Table.Cell>
                  <Table.Cell>
                    <AppRating app={app} hasRating={hasRating} />
                  </Table.Cell>
                  <Table.Cell>
                    <AppComment app={app} />
                  </Table.Cell>
                  <Table.Cell width={3}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <ButtonSupport
                        onClick={() =>
                          dispatch(showModal(MODAL_TYPES.SUPPORT_APPLICATION, { appId: app._id }))
                        }
                      >
                        Support
                      </ButtonSupport>
                      <ButtonStyled
                        color="blue"
                        onClick={() =>
                          dispatch(showModal(MODAL_TYPES.INFO_APPLICATION, { appId: app._id }))
                        }
                      >
                        Info
                      </ButtonStyled>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </TableStyled>
    </div>
  );

  return (
    <div style={{ marginBottom: '50px', zIndex: 1, width: '100%' }}>
      {Object.values(target.values).length > 0 ? (
        <div style={{ marginTop: '-20px', marginLeft: '-10px' }}>{displayAsGroup()}</div>
      ) : (
        <div style={{ marginTop: '40px', marginLeft: '-10px' }}>{displayAsTable(applications)}</div>
      )}
    </div>
  );
}

export default TableView;
