import React, { useContext } from 'react';
import { Grid, Segment, Dimmer, Loader, Modal, Header, Button } from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';

import { useGetApplicationSupport } from 'core/providers/Applications/actions/application';

import SupportPanel from './SupportPanel';
import { BLUE } from 'core/constants/colors';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

function SupportApplication() {
  const { handleSave } = useSaveClickTrough();

  const handleOpen = async app => {
    const object = await getObjectClickTrough(app);
    handleSave({ variables: { ...object } });

    window.open(app.url, '_blank');
  };

  const {
    state: {
      props: { appId }
    }
  } = useContext(ModalContext);

  const { result, loading } = useGetApplicationSupport(appId);

  if (loading)
    return (
      <Segment basic style={{ padding: '100px 0' }}>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    );

  if (result.app.length === 0) return false;

  return (
    <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
      <Grid style={{ marginTop: '10px' }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Header
                style={{ fontWeight: 700, fontSize: '26px', color: BLUE, margin: 0, padding: 0 }}
              >
                {result.app.title}
              </Header>
              <div>
                <Button color="teal" onClick={() => handleOpen(result)}>
                  Launch
                </Button>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        {result.support.accessDescription && (
          <Grid.Row>
            <Grid.Column style={{ marginTop: '15px' }}>
              <SupportPanel data={result.support.accessDescription} icon="lock" />
            </Grid.Column>
          </Grid.Row>
        )}

        {result.support.training && (
          <Grid.Row>
            <Grid.Column style={{ marginTop: '15px' }}>
              <Grid.Column>
                <SupportPanel data={result.support.training} icon="book" />
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        )}

        {result.support.links && (
          <Grid.Row>
            <Grid.Column style={{ marginTop: '15px' }}>
              <Grid.Column>
                <SupportPanel data={result.support.links} icon="linkify" />
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        )}

        {result.support.contacts && (
          <Grid.Row>
            <Grid.Column style={{ marginTop: '15px' }}>
              <Grid.Column>
                <SupportPanel data={result.support.contacts} icon="user" />
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        )}

        {result.support.faqs && (
          <Grid.Row>
            <Grid.Column style={{ marginTop: '15px' }}>
              <Grid.Column>
                <SupportPanel data={result.support.faqs} icon="question circle" />
              </Grid.Column>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Modal.Content>
  );
}

export default React.memo(SupportApplication);
