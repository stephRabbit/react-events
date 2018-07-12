import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button
          as={Link}
          basic
          color="teal"
          content="Edit Profile"
          fluid
          to="/settings/basic"
        />
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
