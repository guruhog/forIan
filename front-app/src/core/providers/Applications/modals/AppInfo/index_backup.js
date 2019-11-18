import React, { useContext } from 'react';
import {
  Grid,
  Header,
  Image,
  Segment,
  Dimmer,
  Loader,
  Modal,
  Label,
  Button
} from 'semantic-ui-react';
import { format, parseISO } from 'date-fns';

import ModalContext from 'core/providers/Modal/Context';
import { useGetApplicationDataHome } from '../../actions/application';
import NoImage from 'assets/images/noImage.png';

import DataSource from './sections/DataSource';
import TargetAudience from './sections/TargetAudience';
import Phases from './sections/Phases';
import { BLUE } from 'core/constants/colors';
import styled from 'styled-components';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

const LabelInfo = styled(Label)`
  font-size: 11px !important;
  padding: 3px 6px !important;
  border-radius: 0 !important;
`;

function AppInfo() {
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

  const { result, loading } = useGetApplicationDataHome(appId);

  if (loading)
    return (
      <Segment basic style={{ padding: '100px 0' }}>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    );

  return (
    <Modal.Content style={{ backgroundColor: '#ECECEC' }}>
      <Grid style={{ marginTop: '10px' }}>
        <Grid.Row>
          <Grid.Column width={13} style={{ paddingRight: 0 }}>
            {/* <Segment
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '100%'
              }}
            > */}
            <div style={{ flex: 1 }}>
              <Header
                style={{ fontWeight: 700, fontSize: '30px', color: BLUE, marginBottom: '20px' }}
              >
                {result.title}
              </Header>
              {/* <div>
                  <LabelInfo color="grey">Version {result.currentVersion}</LabelInfo>
                  <LabelInfo color="grey" style={{ marginLeft: '5px' }}>
                    <span style={{ marginRight: '5px' }}>Release Date</span>
                    {format(parseISO(result.releaseDate), 'dd.MM.yyyy')}
                  </LabelInfo>
                </div> */}
            </div>

            <Button color="teal" onClick={() => handleOpen(result)}>
              Launch
            </Button>
            {/* </Segment> */}
          </Grid.Column>

          {/* <Grid.Column width={3}>
            <Segment
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <Image src={result.picture ? result.picture : NoImage} size="tiny" />
            </Segment>
          </Grid.Column> */}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment style={{ marginTop: '15px' }}>
              <Header as="h3" style={{ color: BLUE }}>
                App Overview
              </Header>

              {result.description ? (
                <span dangerouslySetInnerHTML={{ __html: result.description }} />
              ) : (
                <p>No information available</p>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: '15px' }}>
          <Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as="h3" style={{ color: BLUE }}>
                  How to use this app
                </Header>
                {result.whenToUse ? (
                  <span dangerouslySetInnerHTML={{ __html: result.whenToUse }} />
                ) : (
                  <p>No information available</p>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>

        {result.dataSources.length > 0 && <DataSource data={result.dataSources} />}
        {result.targetAudience.length > 0 && <TargetAudience data={result.targetAudience} />}
        {result.phases.length > 0 && <Phases data={result.phases} />}
      </Grid>
    </Modal.Content>
  );
}
export default React.memo(AppInfo);
