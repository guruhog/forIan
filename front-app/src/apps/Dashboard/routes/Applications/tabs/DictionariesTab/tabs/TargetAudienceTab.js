import React, { useState, useContext } from 'react';
import {
  useGetTargetAudience,
  useDeleteTargetAudience
} from 'core/providers/Dictionary/actions/targetAudience';
import { Dimmer, Loader, Tab, Button, Icon, Confirm } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import { showModal } from 'core/providers/Modal/actions';
import { MODAL_TYPES } from 'core/providers/Dictionary/constants';
import { LabelStyled, Wrapper } from './style';

function TargetAudienceTab() {
  const { result, loading } = useGetTargetAudience();
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const { handleDelete } = useDeleteTargetAudience();
  const { dispatch } = useContext(ModalContext);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );

  const handleConfirmation = () => {
    handleDelete({ variables: { id: confirm.id } }).then(() => setConfirm({ open: false }));
  };

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
          dispatch(showModal(MODAL_TYPES.DICTIONARY, { mainType: 'targetAudience', type }))
        }
      >
        <Icon name="plus circle" /> Add
      </Button>
    </Wrapper>
  );

  const panes = [
    {
      menuItem: {
        key: 'targetFunctions',
        icon: 'user circle outline',
        content: 'Target Functions'
      },
      render: () => renderItem('targetFunctions')
    },
    {
      menuItem: { key: 'targetRoles', icon: 'user md', content: 'Target Roles' },
      render: () => renderItem('targetRoles')
    },
    {
      menuItem: {
        key: 'targetFranchises',
        icon: 'factory',
        content: 'Target Franchises'
      },
      render: () => renderItem('targetFranchises')
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

export default React.memo(TargetAudienceTab);
