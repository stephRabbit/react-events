import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingStatus = ({ inverted }) => {
  return (
    <Dimmer
      active={true}
      inverted={inverted}
    >
      <Loader content="Loading content..." />
    </Dimmer>
  );
};

export default LoadingStatus;
