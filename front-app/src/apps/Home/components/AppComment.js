import React, { useContext } from 'react';
import { Media } from './style';
import { Icon, Popup } from 'semantic-ui-react';
import { MODAL_TYPES } from 'core/providers/Applications/constants';
import { showModal } from 'core/providers/Modal/actions';
import ModalContext from 'core/providers/Modal/Context';

export default function AppComment({ app }) {
  const { dispatch } = useContext(ModalContext);

  return (
    <Media onClick={() => dispatch(showModal(MODAL_TYPES.ADD_APP_COMMENT, { appId: app._id }))}>
      <Popup
        trigger={<Icon name="comments" color="grey" />}
        content="Click to add a comment"
        position="bottom right"
        inverted
      />
      <span style={{ fontSize: '13px' }}>{app.comments}</span>
    </Media>
  );
}
