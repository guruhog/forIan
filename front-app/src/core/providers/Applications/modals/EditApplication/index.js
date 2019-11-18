import React, { useContext, useState } from 'react';
import { Modal, Button, Dimmer, Loader, Segment } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import EditAppMenu from './EditAppMenu';
import styled from 'styled-components';

/** Tabs */
import AppContributors from './Tabs/AppContributors';
import InfoPanel from './Tabs/InfoPanel';
import AppSupport from './Tabs/AppSupport';

import ApplicationForm from 'core/components/ApplicationForm';
import { useError } from 'core/utils/useError';
import { uploadFile } from 'core/providers/Applications/actions/application';
import { toast } from 'react-toastify';

import {
  useGetApplicationDataDashboard,
  useUpdateApplication
} from 'core/providers/Applications/actions/application';

const Wrapper = styled(Modal.Content)`
  max-width: 935px;
  margin: 30px auto !important;
  padding: 0 !important;
`;

function EditApplication() {
  const {
    hideModal,
    state: {
      props: { appId }
    }
  } = useContext(ModalContext);

  const [activeMenu, setActiveMenu] = useState(0);

  const {
    appData,
    setAppData,
    onChangeDataSources,
    onChangeTargetAudience,
    handleInputChange,
    handleDropDownChange,
    handleDatePickerChange
  } = useGetApplicationDataDashboard(appId);

  const { saveApplication, error } = useUpdateApplication(appData, appId);
  const { formError } = useError(error);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const doSubmit = () => {
    setLoading(true);

    saveApplication()
      .then(() => {
        if (image !== null) {
          uploadFile(appId, image, hideModal, 'updated');
        } else {
          hideModal();
          toast.info('Application updated successfully!');
        }
      })
      .catch(() => setLoading(false));
  };

  const handleFileInputChange = event => {
    setImage(event.target.files[0]);
  };

  if (Object.keys(appData.appDetails).length === 0) {
    return (
      <Segment basic style={{ padding: '50px 0' }}>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    );
  }

  return (
    <>
      <EditAppMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <Wrapper>
        {(() => {
          switch (activeMenu) {
            case 0:
              return (
                <Segment color="blue">
                  <ApplicationForm
                    hideModal={hideModal}
                    inputValues={appData.appDetails}
                    handleInputChange={handleInputChange}
                    handleDropDownChange={handleDropDownChange}
                    handleDatePickerChange={handleDatePickerChange}
                    handleFileInputChange={handleFileInputChange}
                    formError={formError}
                  />
                </Segment>
              );

            case 1:
              return <AppContributors appData={appData} setAppData={setAppData} />;

            // case 2:
            //   return (
            //     <AppDataSources onChange={onChangeDataSources} dataSource={appData.dataSources} />
            //   );

            // case 3:
            //   return (
            //     <AppTargetAudience
            //       onChange={onChangeTargetAudience}
            //       targetAudience={appData.targetAudience}
            //     />
            //   );

            case 2:
              return (
                <InfoPanel
                  setAppData={setAppData}
                  appData={appData}
                  handleInputChange={handleInputChange}
                  onChangeDataSources={onChangeDataSources}
                  onChangeTargetAudience={onChangeTargetAudience}
                />
              );

            default:
              return (
                <AppSupport
                  setAppData={setAppData}
                  appData={appData}
                  handleInputChange={handleInputChange}
                />
              );
          }
        })()}
      </Wrapper>

      <Modal.Actions>
        <Button color="red" onClick={() => hideModal()} disabled={loading}>
          Cancel
        </Button>

        <Button color="blue" loading={loading} onClick={() => doSubmit()}>
          Save
        </Button>
      </Modal.Actions>
    </>
  );
}

export default React.memo(EditApplication);
