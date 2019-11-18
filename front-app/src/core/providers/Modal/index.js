import React, { useContext, useReducer, useState, useEffect } from 'react';
import Context from './Context';
import get from 'lodash.get';
import styled from 'styled-components';
import { TransitionablePortal, Modal, Icon } from 'semantic-ui-react';
import { BLUE } from 'core/constants/colors';
import modalReducer from './reducer';
import { closeModal } from './actions';

const ModalHeaderStyled = styled(Modal.Header)`
  background-color: ${BLUE} !important;
  color: #fff !important;
`;

const ModalIconStyled = styled(Icon)`
  margin-right: 20px !important;
  color: #fff;
`;

const modalTypes = {};

function ModalProvider({ children }) {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const [open, setOpen] = useState(!!state.type);

  const addModalTypes = newTypes => {
    if (newTypes) {
      newTypes.forEach(newItem => {
        if (!modalTypes[newItem.type]) {
          modalTypes[newItem.type] = newItem;
        }
      });
    }
  };

  const renderModal = () => {
    const ModalContent = get(modalTypes[state.type], 'component', () => false);
    const size = get(modalTypes[state.type], 'size', 'tiny');
    const icon = get(modalTypes[state.type], 'icon', '');
    const title = get(modalTypes[state.type], 'title', '');

    return (
      <TransitionablePortal
        open={open}
        transition={{ animation: 'zoom', duration: 500 }}
        closeOnDocumentClick={false}
      >
        <Modal
          open={true}
          closeIcon
          closeOnDimmerClick={false}
          size={size}
          onClose={() => hideModal()}
          centered={false}
        >
          <ModalHeaderStyled>
            <ModalIconStyled name={icon} />
            {title}
          </ModalHeaderStyled>

          <ModalContent />
        </Modal>
      </TransitionablePortal>
    );
  };

  const hideModal = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 550);
  };

  useEffect(() => {
    setOpen(!!state.type);
  }, [state.type]);

  return (
    <Context.Provider value={{ addModalTypes, state, dispatch, hideModal }}>
      {children}
      {renderModal()}
    </Context.Provider>
  );
}

export default React.memo(ModalProvider);
