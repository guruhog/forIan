import React, { useContext, useState } from 'react';
import {
  useGetDataSources,
  useDeleteDataSource
} from 'core/providers/Dictionary/actions/dataSources';
import { Dimmer, Loader, Tab, Button, Icon, Confirm } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import { showModal } from 'core/providers/Modal/actions';
import { MODAL_TYPES } from 'core/providers/Dictionary/constants';
import { LabelStyled, Wrapper } from './style';

function DataSourcesTab() {
  const { result, loading } = useGetDataSources();

  const { dispatch } = useContext(ModalContext);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const { handleDelete } = useDeleteDataSource();

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );

  const renderItem = type => (
    <Wrapper>
      {result.length > 0 &&
        result
          .filter(item => item.type === type)
          .map(item => (
            <LabelStyled key={item._id}>
              {item.title}
              <Icon
                name="close"
                color="red"
                onClick={() => setConfirm({ open: true, id: item._id })}
              />
            </LabelStyled>
          ))}
      <br />
      <Button
        primary
        icon
        style={{ marginTop: '20px' }}
        onClick={() =>
          dispatch(showModal(MODAL_TYPES.DICTIONARY, { mainType: 'dataSource', type }))
        }
      >
        <Icon name="plus circle" /> Add
      </Button>
    </Wrapper>
  );

  const handleConfirmation = () => {
    handleDelete({ variables: { id: confirm.id } }).then(() => setConfirm({ open: false }));
  };

  const panes = [
    {
      menuItem: {
        key: 'dataLevel',
        icon: 'sort amount up',
        content: 'Data Level'
      },
      render: () => renderItem('dataLevel')
    },
    {
      menuItem: {
        key: 'dataType',
        icon: 'hdd',
        content: 'Data Type'
      },
      render: () => renderItem('dataType')
    },
    {
      menuItem: {
        key: 'systemIn',
        icon: 'sign-in',
        content: 'System In'
      },
      render: () => renderItem('systemIn')
    },
    {
      menuItem: {
        key: 'systemOut',
        icon: 'sign-out',
        content: 'System Out'
      },
      render: () => renderItem('systemOut')
    }
  ];

  return (
    <>
      <Tab panes={panes} />
      <Confirm
        open={confirm.open}
        confirmButton="Yes"
        onCancel={() => setConfirm({ open: false })}
        onConfirm={handleConfirmation}
        size="tiny"
      />
    </>
  );
}

export default React.memo(DataSourcesTab);
