import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        color="facebook"
        fluid
        onClick={() => socialLogin('facebook')}
        type="button"
        style={{ marginBottom: '10px' }}
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        color="google plus"
        fluid
        onClick={() => socialLogin('google')}
        type="button"
      >
        <Icon name="google plus" /> Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
