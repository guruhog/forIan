import React, { useContext } from 'react';
import {
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Modal,
  Label,
  Button,
  Rating
} from 'semantic-ui-react';
import { format, parseISO } from 'date-fns';

import ModalContext from 'core/providers/Modal/Context';
import { useGetApplicationDataHome } from '../../actions/application';

import DataSource from './sections/DataSource';
import TargetAudience from './sections/TargetAudience';
import Phases from './sections/Phases';
import Contributors from './sections/Contributors';
import { BLUE } from 'core/constants/colors';
import styled from 'styled-components';

import { useSaveClickTrough } from 'core/providers/Applications/actions/application';
import { getObjectClickTrough } from 'core/utils/helpers';

const LabelInfo = styled(Label)`
  font-size: 11px !important;
  padding: 6px 8px !important;
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
        <Grid.Row style={{ margin: 0, padding: 0 }}>
          <Grid.Column width={16}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Header
                  style={{ fontWeight: 700, fontSize: '26px', color: BLUE, margin: 0, padding: 0 }}
                >
                  {result.title}
                </Header>
                <Rating
                  maxRating={5}
                  size="large"
                  defaultRating={result.rating}
                  icon="star"
                  disabled
                  style={{ marginBottom: '6px', marginLeft: '5px' }}
                />
              </div>
              <div>
                <Button color="teal" onClick={() => handleOpen(result)}>
                  Launch
                </Button>
              </div>
            </div>
          </Grid.Column>
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
                  How To Use This App
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
        {result.contributors.length > 0 && <Contributors data={result.contributors} />}
        <Grid.Row>
          <Grid.Column style={{ marginTop: '15px' }}>
            <Grid.Column>
              <Segment>
                <Header as="h3" style={{ color: BLUE }}>
                  Other Information
                </Header>
                <div>
                  <LabelInfo color="grey">Version {result.currentVersion}</LabelInfo>
                  <LabelInfo color="grey" style={{ marginLeft: '5px' }}>
                    <span style={{ marginRight: '5px' }}>Release Date</span>
                    {format(parseISO(result.releaseDate), 'dd.MM.yyyy')}
                  </LabelInfo>
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  );
}
export default React.memo(AppInfo);
