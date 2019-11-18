import React, { useContext, useState, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';

import { useAddDataSource } from 'core/providers/Dictionary/actions/dataSources';
import { useAddTargetAudience } from 'core/providers/Dictionary/actions/targetAudience';
import { useAddContributor } from 'core/providers/Dictionary/actions/contributors';
import { useAddPhase } from 'core/providers/Dictionary/actions/phases';

import { FormFieldStyled, InputStyled, LabelStyled } from 'core/components/UI/FormAG';
import { wordToUpper, eachWordToUpper } from 'core/utils/helpers';

function DictionaryModal() {
  const {
    hideModal,
    state: { props }
  } = useContext(ModalContext);

  const [entry, setEntry] = useState('');

  const { handleSaveDataSource } = useAddDataSource();
  const { handleSaveTargetAudience } = useAddTargetAudience();
  const { handleSaveContributor } = useAddContributor();
  const { handleSavePhase } = useAddPhase();

  const handleSubmit = () => {
    const { type, mainType } = props;

    const parsedTyped = wordToUpper(entry);
    const newEntry = eachWordToUpper(entry);

    switch (mainType) {
      case 'dataSource':
        handleSaveDataSource({
          variables: { title: entry, type }
        }).then(() => hideModal());
        break;

      case 'targetAudience':
        handleSaveTargetAudience({
          variables: { title: entry, type }
        }).then(() => hideModal());
        break;

      case 'contributor':
        handleSaveContributor({
          variables: { title: newEntry, type: parsedTyped }
        }).then(() => hideModal());
        break;

      case 'phases':
        handleSavePhase({
          variables: { title: newEntry, type: parsedTyped }
        }).then(() => hideModal());
        break;

      default:
        break;
    }
  };

  const firstInputRef = useRef(false);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  return (
    <>
      <Modal.Content>
        <Form>
          <FormFieldStyled>
            <LabelStyled>Entry Name : </LabelStyled>
            <InputStyled
              placeholder="Entry Name"
              value={entry}
              onChange={e => setEntry(e.target.value)}
              ref={firstInputRef}
            />
          </FormFieldStyled>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => hideModal()}>
          Cancel
        </Button>

        <Button color="blue" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Modal.Actions>
    </>
  );
}

export default React.memo(DictionaryModal);
