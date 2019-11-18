import React, { useContext, useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Grid,
  Image,
  Menu,
  Form,
  Label,
  Icon,
  Dropdown,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import ModalContext from 'core/providers/Modal/Context';
import AuthContext from 'core/providers/Auth/Context';
import NoImage from 'assets/images/noImage.png';
import { useGetCurrentUser, useSaveUserProfile } from 'core/providers/User/actions';

function ProfileModal() {
  const { hideModal } = useContext(ModalContext);
  const [userFunction, setUserFunction] = useState({ _id: 0, title: 'Select' });
  const [userRole, setUserRole] = useState({ _id: 0, title: 'Select' });

  const {
    state: { fullname, _id }
  } = useContext(AuthContext);

  const { result, loading } = useGetCurrentUser(_id);
  const { handleSubmit } = useSaveUserProfile(_id);

  const handleProfileSubmit = () => {
    handleSubmit({
      variables: { userId: _id, userFunction, userRole }
    })
      .then(() => hideModal())
      .catch(() => {});
  };

  useEffect(() => {
    if (result && result.user) {
      if (result.user.userFunction) setUserFunction(result.user.userFunction);
      if (result.user.userRole) setUserRole(result.user.userRole);
    }
  }, [result]);

  if (loading)
    return (
      <Segment basic style={{ padding: '100px 0' }}>
        <Dimmer inverted active>
          <Loader />
        </Dimmer>
      </Segment>
    );

  if (result.length === 0) return false;

  return (
    <>
      <Modal.Content>
        <Grid style={{ marginTop: '10px' }}>
          <Grid.Row>
            <Grid.Column
              width={7}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Image circular src={NoImage} size="small" />
              <div style={{ marginTop: '30px', fontWeight: 500, fontSize: '18px' }}>{fullname}</div>
            </Grid.Column>
            <Grid.Column width={9}>
              <Form>
                <Form.Group inline>
                  <label style={{ width: '80px' }}>Function :</label>
                  <Form.Field>
                    <Dropdown
                      scrolling
                      item
                      button
                      className="icon"
                      labeled
                      text={userFunction?.title}
                    >
                      <Dropdown.Menu style={{ zIndex: 101 }}>
                        {result.targetAudience.length > 0 &&
                          result.targetAudience
                            .filter(item => item.type === 'targetFunctions')
                            .map(item => (
                              <Dropdown.Item
                                onClick={() => setUserFunction({ ...item })}
                                key={item._id}
                              >
                                {item.title}
                              </Dropdown.Item>
                            ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Field>
                </Form.Group>

                <Form.Group inline>
                  <label style={{ width: '80px' }}>Role :</label>
                  <Form.Field>
                    <Dropdown scrolling item button className="icon" labeled text={userRole.title}>
                      <Dropdown.Menu style={{ zIndex: 101 }}>
                        {result.targetAudience.length > 0 &&
                          result.targetAudience
                            .filter(item => item.type === 'targetRoles')
                            .map(item => (
                              <Dropdown.Item
                                onClick={() => setUserRole({ ...item })}
                                key={item._id}
                              >
                                {item.title}
                              </Dropdown.Item>
                            ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Field>
                </Form.Group>
              </Form>
              <Form disabled style={{ marginTop: '40px' }}>
                <Form.Group inline>
                  <label style={{ width: '100px' }}>Email: </label>
                  {result.user.email}
                </Form.Group>
                <Form.Group inline>
                  <label style={{ width: '100px' }}>Phone: </label>
                  {result.user.phone}
                </Form.Group>
                <Form.Group inline>
                  <label style={{ width: '100px' }}>Country: </label>
                  {result.user.country}
                </Form.Group>
              </Form>

              <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <Menu compact>
                  <Menu.Item>
                    <Icon name="microsoft" />
                    Apps
                    <Label color="blue" floating>
                      {result.apps}
                    </Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="star" />
                    Reviews
                    <Label color="blue" floating>
                      {result.ratings}
                    </Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon name="comment" />
                    Comments
                    <Label color="blue" floating>
                      {result.comments}
                    </Label>
                  </Menu.Item>
                </Menu>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => hideModal()}>
          Cancel
        </Button>

        <Button color="blue" onClick={() => handleProfileSubmit()}>
          Save
        </Button>
      </Modal.Actions>
    </>
  );
}

export default React.memo(ProfileModal);
