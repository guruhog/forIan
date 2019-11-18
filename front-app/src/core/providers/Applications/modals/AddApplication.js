import React, { useContext, useState } from 'react';
import ModalContext from 'core/providers/Modal/Context';
import { useForm } from 'core/utils/useForm';
import { useError } from 'core/utils/useError';
import { useAddApplication } from '../actions/application';
import ApplicationForm from 'core/components/ApplicationForm';
import { Modal, Button } from 'semantic-ui-react';
import { uploadFile } from 'core/providers/Applications/actions/application';
import { toast } from 'react-toastify';

function AddApplication() {
  const { hideModal } = useContext(ModalContext);

  const { inputValues, handleInputChange, handleDropDownChange, handleDatePickerChange } = useForm({
    title: '',
    url: '',
    provider: '',
    currentVersion: '',
    releaseDate: '',
    nextReleaseDate: '',
    description: '',
    whenToUse: ''
  });

  const { handleSubmit, error } = useAddApplication(inputValues, hideModal);
  const { formError } = useError(error);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const doSubmit = () => {
    setLoading(true);

    handleSubmit()
      .then(({ data: { insertApplication: { _id } } }) => {
        if (image !== null) {
          uploadFile(_id, image, hideModal);
        } else {
          hideModal();
          toast.info('Application added successfully!');
        }
      })
      .catch(() => setLoading(false));
  };

  const handleFileInputChange = event => {
    setImage(event.target.files[0]);
  };

  return (
    <>
      <div style={{ padding: '30px 40px 30px 40px' }}>
        <ApplicationForm
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          handleDropDownChange={handleDropDownChange}
          handleDatePickerChange={handleDatePickerChange}
          handleFileInputChange={handleFileInputChange}
          formError={formError}
        />
      </div>
      <Modal.Actions>
        <Button color="red" onClick={() => hideModal()} disabled={loading}>
          Cancel
        </Button>

        <Button color="blue" onClick={() => doSubmit()} loading={loading}>
          Save
        </Button>
      </Modal.Actions>
    </>
  );
}

export default React.memo(AddApplication);
