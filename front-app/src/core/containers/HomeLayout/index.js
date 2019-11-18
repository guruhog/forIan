import React, { useState, useContext } from 'react';
import Topbar from '../Topbar';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import { ChromePicker } from 'react-color';
import { Icon, Transition, Segment, Button, Form, Checkbox } from 'semantic-ui-react';

import AuthContext from 'core/providers/Auth/Context';
import { setBackground } from 'core/providers/Auth/actions';
import { backgroundOptions } from 'core/providers/Auth/constants';

const ContainerStyled = styled.div`
  ${props =>
    props.background.gradient
      ? `background-image: linear-gradient(to right, rgb(${props.background.rgba}, .55), rgb(${props.background.rgba}, .85));`
      : `background-color: ${props.background.hex}`}
  min-height: 100%;
`;

function HomeLayout({ children }) {
  const [open, setOpen] = useState(false);

  const {
    state: { background },
    dispatch
  } = useContext(AuthContext);

  return (
    <ContainerStyled background={background}>
      <div
        style={{
          position: 'fixed',
          top: '100px',
          left: '50px',
          background: '#fff',
          width: '50px',
          height: '50px',
          borderRadius: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '4.5px',
          cursor: 'pointer',
          zIndex: 1,
          boxShadow: '3px 3px 8px 0 rgba(0,0,0, 0.15)',
          border: '1px solid rgba(34,36,38,.15)'
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icon name="tint" size="large" />
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '5px',
          position: 'fixed',
          bottom: '15px',
          right: '5px',
          fontWeight: 600,
          border: '1px solid #ccc',
          zIndex: 1
        }}
      >
        Powered by TBO <Icon name="rocket" />
      </div>

      {/* <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '25px',
          backgroundColor: '#fff',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '10px',
          borderTop: '1px solid #ccc',
          fontSize: '12px'
        }}
      >
        <span>Powered by TBO</span>
        <Icon name="rocket" style={{ marginLeft: '10px', marginBottom: '7px' }} />
      </div> */}

      <Transition visible={open} animation="scale" duration={300} onHide={() => setOpen(false)}>
        <div
          style={{
            position: 'fixed',
            top: '160px',
            left: '50px',
            zIndex: 1,
            textAlign: 'right'
          }}
        >
          <Segment>
            <ChromePicker
              style={{ position: 'fixed', top: '160px', left: '50px' }}
              disableAlpha={true}
              onChangeComplete={({ rgb, hex }) => {
                dispatch(
                  setBackground({ ...background, hex, rgba: `${rgb.r}, ${rgb.g},${rgb.b}` })
                );
              }}
              color={background.hex}
            />
            <Form style={{ marginTop: '20px' }}>
              <Form.Group>
                <Form.Field>
                  <Checkbox
                    label="Gradient"
                    checked={background.gradient}
                    onClick={() => {
                      dispatch(setBackground({ ...background, gradient: !background.gradient }));
                    }}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Checkbox
                    label="Particles"
                    checked={background.particles}
                    onClick={() => {
                      dispatch(setBackground({ ...background, particles: !background.particles }));
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            <Button onClick={() => dispatch(setBackground(backgroundOptions))}>Reset</Button>
          </Segment>
        </div>
      </Transition>
      <div
        onClick={() => {
          if (open) {
            setOpen(false);
          }
        }}
      >
        <Particles
          style={{ position: 'fixed' }}
          params={{
            particles: {
              number: { value: background.particles ? 120 : 0 },
              size: { value: 3 },
              move: { enable: false }
            },
            interactivity: {
              events: { onhover: { enable: true } }
            }
          }}
        />
      </div>
      <Topbar />

      {children}
    </ContainerStyled>
  );
}

export default HomeLayout;
