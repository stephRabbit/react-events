import React from 'react';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({ profile, signOut }) => {
  return (
      <Menu.Item position="right">
        <Image avatar spaced="right" src={profile.photoURL || '/assets/user.png'} />
        <Dropdown pointing="top left" text={profile.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Create Event" icon="plus" />
            <Dropdown.Item text="My Events" icon="calendar" />
            <Dropdown.Item text="My Network" icon="users" />
            <Dropdown.Item text="My Profile" icon="user" />
            <Dropdown.Item
              as={Link}
              icon="settings"
              text="Settings"
              to="/settings"
            />
            <Dropdown.Item
              icon="power"
              onClick={signOut}
              text="Sign Out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
  );
};

export default SignedInMenu;
