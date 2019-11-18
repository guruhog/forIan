import React, { useContext } from 'react';
import ModalContext from 'core/providers/Modal/Context';

function ShowID() {
  const {
    state: {
      props: { appId }
    }
  } = useContext(ModalContext);

  return <div style={{ padding: '50px' }}>{appId}</div>;
}

export default React.memo(ShowID);
