import React, { useState, useContext } from 'react';
import { useGetPhases, useDeletePhase } from 'core/providers/Dictionary/actions/phases';
import { Dimmer, Loader, Icon, Confirm, Button } from 'semantic-ui-react';
import { LabelStyled } from './style';
import ModalContext from 'core/providers/Modal/Context';
import { showModal } from 'core/providers/Modal/actions';
import { MODAL_TYPES } from 'core/providers/Dictionary/constants';

function PhasesTab() {
  const { data, loading } = useGetPhases();
  const { handleDelete } = useDeletePhase();
  const [confirm, setConfirm] = useState({ open: false, id: null });
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

  return (
    <>
      {data &&
        data.getPhases &&
        data.getPhases.map(item => (
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
        onClick={() => dispatch(showModal(MODAL_TYPES.DICTIONARY, { mainType: 'phases' }))}
      >
        <Icon name="plus circle" /> Add
      </Button>
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

export default React.memo(PhasesTab);
