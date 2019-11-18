import React, { useContext, useState } from 'react';
// import { format, parseISO } from 'date-fns';
import moment from 'moment';
import {
  Modal,
  Grid,
  Button,
  Form,
  Message,
  Loader,
  Dimmer,
  Comment,
  Header,
  Divider,
  Label
} from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import { useForm } from 'core/utils/useForm';
import { useAddComment, useGetComments } from '../actions/comment';
import { useError } from 'core/utils/useError';
import { toast } from 'react-toastify';
import NoImage from 'assets/images/noImage.png';

const commentLimit = 5;

function AddComment() {
  const {
    hideModal,
    state: {
      props: { appId }
    }
  } = useContext(ModalContext);

  const { result, loading } = useGetComments(appId);
  const [limit, setLimit] = useState(0);

  const { inputValues, handleDropDownChange, handleInputChange } = useForm({
    content: '',
    commentType: 'comment'
  });
  const { handleSubmit, error } = useAddComment(inputValues, appId);
  const { formError } = useError(error);

  const doSubmit = () => {
    handleSubmit().then(() => {
      hideModal();
      toast.info('Comment added successfully!');
    });
  };

  return (
    <>
      <Modal.Content>
        <Grid>
          <Grid.Column computer={6} tablet={16} mobile={16}>
            <Form autoComplete="off" error>
              {formError !== false && (
                <Message
                  error
                  content={Object.values(formError).map((errorItem, i) => (
                    <React.Fragment key={`formErr${i}`}>
                      {errorItem}
                      <br />
                    </React.Fragment>
                  ))}
                  style={{ marginBottom: '30px' }}
                />
              )}

              <Form.TextArea
                label=" Text"
                placeholder="Comment Text"
                required
                name="content"
                value={inputValues.content}
                onChange={handleInputChange}
                error={formError.content ? true : false}
              />
              <Form.Group widths="equal">
                <Form.Field style={{ display: 'flex', alignItems: 'center' }}>
                  <label>Comment Type: </label>
                </Form.Field>
                <Form.Dropdown
                  selection
                  value={inputValues.commentType}
                  name="commentType"
                  onChange={handleDropDownChange}
                  options={[
                    {
                      key: 'comment',
                      text: 'General',
                      value: 'comment'
                    },
                    {
                      key: 'requestAccess',
                      text: 'Request Access',
                      value: 'requestAccess'
                    },
                    {
                      key: 'reportBug',
                      text: 'Report Bug',
                      value: 'reportBug'
                    }
                  ]}
                />
              </Form.Group>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <Button
                  color="red"
                  onClick={e => {
                    e.preventDefault();
                    hideModal();
                  }}
                >
                  Cancel
                </Button>

                <Button color="blue" onClick={() => doSubmit()}>
                  Save
                </Button>
              </div>
            </Form>
          </Grid.Column>
          <Grid.Column computer={10} tablet={16} mobile={16}>
            {loading ? (
              <Dimmer active inverted>
                <Loader>Loading</Loader>
              </Dimmer>
            ) : result.length > 0 ? (
              <>
                <Comment.Group>
                  <Header as="h3" dividing>
                    Latest Comments
                  </Header>
                  {result.slice(0, limit + commentLimit).map(comment => {
                    let label = '';
                    if (comment.type === 'requestAccess')
                      label = <Label color="green" icon="key" content="Access" />;
                    else if (comment.type === 'reportBug')
                      label = <Label color="red" icon="bug" content="Bug" />;

                    return (
                      <Comment key={comment._id} style={{ marginBottom: '15px' }}>
                        <Comment.Avatar src={NoImage} />
                        <Comment.Content>
                          <Comment.Author as="a">{comment.user.fullname}</Comment.Author>
                          <Comment.Metadata>
                            {/* <span>{format(parseISO(comment.createdAt), 'dd.MM.yyyy H:mm')}</span> */}
                            <span>{moment(comment.createdAt).format('DD.MM.YYYY HH:mm')}</span>
                          </Comment.Metadata>
                          <Comment.Text>
                            {label !== '' && <span style={{ paddingRight: '10px' }}>{label}</span>}
                            <span>{comment.content}</span>
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    );
                  })}
                </Comment.Group>

                {result.length > commentLimit && limit < result.length - 1 && (
                  <div align="center">
                    <Button color="green" onClick={() => setLimit(limit + commentLimit)}>
                      Show More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div align="center">
                <Message warning content="Application has no comments" />
              </div>
            )}
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </>
  );
}

export default React.memo(AddComment);
