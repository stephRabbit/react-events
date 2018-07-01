import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ signIn, register }) => {
  return (
    <Menu.Item position="right">
      <Button
        basic
        content="Login"
        onClick={signIn}
        inverted
      />
      <Button
        basic
        content="Register"
        inverted
        onClick={register}
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
