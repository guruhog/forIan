import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { config } from 'core/constants/service';
import { toast } from 'react-toastify';
import { fileIconType } from 'core/utils/helpers';
import clone from 'lodash.clonedeep';

import { Segment, Input, Header, Button, Form, Grid, Table, Icon } from 'semantic-ui-react';

function CkPanel({ panel, appData, setAppData }) {
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(123);
  const [file, setFile] = useState(null);

  const uploadFile = () => {
    if (file === null) return;

    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    setUploading(0.1);

    axios
      .post(config.url.UPLOAD_API, { fileExtension })
      .then(({ data: { url, filename } }) => {
        //upload file
        axios
          .put(url, file, {
            onUploadProgress: event => {
              const progress = parseInt((event.loaded / event.total) * 100);
              if (progress > 0.1) {
                setUploading(progress);
              }
            }
          })
          .then(() => {
            let files = [];
            if (appData.support[panel.slug] && appData.support[panel.slug].files) {
              files = [...appData.support[panel.slug].files];
            }

            files.push({ name: file.name, filename, extension: fileExtension });

            setAppData({
              ...clone(appData),
              support: {
                ...clone(appData.support),
                [panel.slug]: {
                  ...clone(appData.support[panel.slug]),
                  files
                }
              }
            });

            setFile(null);
            setUploading(false);
            setInputKey(Math.random().toString(10));
          })
          .catch(() => {
            toast.error(`File(s) Upload Failed!`);
            setUploading(false);
          });
      })
      .catch(() => {
        toast.error(`File(s) Upload Failed!`);
        setUploading(false);
      });
  };

  const handleDelete = index => {
    const files = [...appData.support[panel.slug].files];
    files.splice(index, 1);

    setAppData({
      ...clone(appData),
      support: {
        ...clone(appData.support),
        [panel.slug]: {
          ...clone(appData.support[panel.slug]),
          files
        }
      }
    });
  };

  const handleCkChange = content => {
    const support = {
      ...clone(appData.support),
      [panel.slug]: {
        ...appData.support[panel.slug],
        content,
        title: panel.title
      }
    };

    setAppData({ ...clone(appData), support });
  };

  const editorContent = appData.support[panel.slug]
    ? appData.support[panel.slug].content
      ? appData.support[panel.slug].content
      : ''
    : '';

  return (
    <Segment style={{ marginTop: '30px' }} color="blue">
      <Header>{panel.title}</Header>
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        config={{
          toolbar: [
            'heading',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ]
        }}
        onChange={(_, editor) => {
          handleCkChange(editor.getData());
        }}
      />
      <Grid columns="2" style={{ marginTop: '30px' }}>
        <Grid.Column style={{ padding: 0 }}>
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label>File : </label>
                <Input
                  type="file"
                  style={{ height: '38px' }}
                  onChange={e => setFile(e.target.files[0])}
                  key={inputKey}
                />
              </Form.Field>
              <Form.Field>
                <br />
                <Button onClick={() => uploadFile()} loading={!!uploading} disabled={!!uploading}>
                  Upload
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column>
          {appData.support[panel.slug]?.files?.length > 0 && (
            <Table compact>
              <Table.Body>
                {appData.support[panel.slug].files.map((file, i) => (
                  <Table.Row key={i}>
                    <Table.Cell width={1}>
                      <Icon size="big" name={fileIconType(file.extension)} />
                    </Table.Cell>
                    <Table.Cell>{file.name}</Table.Cell>
                    <Table.Cell width={1}>
                      <Icon
                        name="close"
                        color="red"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(i)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default React.memo(CkPanel);
