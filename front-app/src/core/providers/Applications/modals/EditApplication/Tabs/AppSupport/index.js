import React, { useState, useEffect } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

import CkPanel from './CkPanel';

const supportPanelOptions = [
  // { title: 'Access', type: 'panel', slug: 'access' },
  { title: 'Access Method', type: 'dropdown', slug: 'accessMethod' },
  { title: 'How to access this app', type: 'panel', slug: 'accessDescription' },
  { title: 'Training', type: 'panel', slug: 'training' },
  { title: 'Links', type: 'panel', slug: 'links' },
  { title: 'Contacts', type: 'panel', slug: 'contacts' },
  { title: 'FAQs', type: 'panel', slug: 'faqs' }
];

function AppSupport({ setAppData, appData }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  if (loading)
    return (
      <Segment basic style={{ padding: '50px 0' }}>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    );

  return (
    <>
      {supportPanelOptions.map(
        (panel, i) =>
          panel.type === 'panel' && (
            <CkPanel panel={panel} key={i} setAppData={setAppData} appData={appData} />
          )
      )}

      {/*       
      <Button content="Add Panel" color="blue" icon="plus" labelPosition="left" />
      <Divider />
      <Grid style={{ marginTop: '30px' }}>
        <Grid.Row>
          <Grid.Column width={6}>
            {uploading !== false && (
              <Progress percent={uploading} inverted progress success>
                Uploading File
              </Progress>
            )}
            <Form>
              <Form.Group>
                <Form.Field>
                  <label>File : </label>
                  <Input
                    type="file"
                    style={{ height: '38px' }}
                    onChange={e => setFile(e.target.files[0])}
                    key={inputKey}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={() => uploadFile()} loading={!!uploading} disabled={!!uploading}>
                Upload
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={10}>
            {appData.appDetails.supportFiles.length > 0 && (
              <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">Support Files</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {appData.appDetails.supportFiles.map((item, i) => (
                    <Table.Row key={i}>
                      <Table.Cell width={2}>
                        <Icon name={`${fileIconType(item.ext)}`} size="big" />
                      </Table.Cell>
                      <Table.Cell width={13}>{item.name}</Table.Cell>
                      <Table.Cell width={1}>
                        <Icon name="delete" color="red" link onClick={() => handleDelete(i)} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
      {/* // </SegmentStyled>
    </> */}
    </>
  );
}

export default React.memo(AppSupport);
