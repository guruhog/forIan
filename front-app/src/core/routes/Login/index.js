import React, { useContext, useEffect } from 'react';
import Hero from 'assets/images/hero.jpg';
import styled from 'styled-components';
import { Button, Form, Grid, Segment, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import AuthContext from 'core/providers/Auth/Context';
import { useAuth } from 'core/providers/Auth/hooks';

const Wrapper = styled.div`
  background: url(${Hero}) rgba(0, 0, 0, 0.65);
  background-size: cover;
  background-blend-mode: multiply;
  height: 100%;
  width: 100%;
`;

const SegmentHeader = styled.div`
  height: 100px;
`;

function Login({ history }) {
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      history.push('/');
    }
  }, [state, history]);

  const { inputValues, handleInputChange, handleSubmit, error } = useAuth(
    {
      username: '',
      password: ''
    },
    history
  );

  return (
    <Wrapper>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: '450px' }}>
          <Form size="large" autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked style={{ padding: '50px' }}>
              <SegmentHeader>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#343a40'
                  }}
                >
                  Application Gateway
                </div>
              </SegmentHeader>
              <Icon
                name="code branch"
                style={{
                  color: '#2185d0',
                  fontSize: '80px',
                  margin: '20px 0'
                }}
              />
              {error ? (
                <Segment inverted color="red" tertiary>
                  {error}
                </Segment>
              ) : (
                ''
              )}

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                style={{ height: '50px' }}
                value={inputValues.username}
                onChange={handleInputChange}
                autoComplete="new-user"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                style={{ height: '50px' }}
                value={inputValues.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />

              <Button
                color="blue"
                fluid
                size="large"
                style={{ height: '50px', margin: '50px 0 30px 0' }}
                type="submit"
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
}

export default withRouter(Login);
