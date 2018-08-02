import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailedPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header
          icon="image"
          content="Photos"
        />
        <Image.Group size="small">
          {photos.map(photo =>
            <LazyLoad
              height={150}
              key={photo.id}
              placeholder={<Image alt="photos" src="/assets/user.png" />}
            >
              <Image
                alt="photos"
                src={photo.url}
              />
            </LazyLoad>
          )}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedPhotos;
