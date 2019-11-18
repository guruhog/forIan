import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default function Spinner(props) {
  return (
    <Dimmer active {...props}>
      <Loader>Loading</Loader>
    </Dimmer>
  );
}
