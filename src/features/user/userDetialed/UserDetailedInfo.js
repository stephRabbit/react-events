import React from 'react';
import format from 'date-fns/format';
import { Grid, Header, Icon, Item, List, Segment } from 'semantic-ui-react';

const UserDetailedInfo = ({ profile }) => {
  let createAt;
  if (profile.createAt) {
    createAt = format(profile.createAt.toDate(), 'dddd Do MMMM');
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header
              content="About Display Name"
              icon="smile"
            />
            <p>I am a: <strong>{profile.occupation || 'N/A'}</strong></p>
            <p>Originally from <strong>{profile.origin || 'N/A'}</strong></p>
            <p>Member Since: <strong>{createAt}</strong></p>
            {profile.about && <p>{profile.about}</p>}
          </Grid.Column>
          <Grid.Column width={6}>
            <Header
              icon="heart outline"
              content="Interests"
            />
            <List>
              {
                (profile.interests) ? (
                  profile.interests.map((interest, index) => (
                    <Item key={index}>
                      <Icon name="heart" />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))
                ) : <p>No interests</p>
              }
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedInfo;
