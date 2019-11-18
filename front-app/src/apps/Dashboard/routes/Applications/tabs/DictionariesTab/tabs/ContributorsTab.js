import React, { useState, useContext } from 'react';
import {
  useGetContributors,
  useDeleteContributor
} from 'core/providers/Dictionary/actions/contributors';
import { Dimmer, Loader, Icon, Confirm, Button } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import { showModal } from 'core/providers/Modal/actions';
import { MODAL_TYPES } from 'core/providers/Dictionary/constants';
import { LabelStyled } from './style';

function ContributorsTab() {
  const { result, loading } = useGetContributors();
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const { handleDelete } = useDeleteContributor();
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
      {result.length > 0 &&
        result.map(item => (
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
        onClick={() => dispatch(showModal(MODAL_TYPES.DICTIONARY, { mainType: 'contributor' }))}
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

export default React.memo(ContributorsTab);
