import React from 'react';
import { Feed, Header, Segment, Sticky } from 'semantic-ui-react';
// ------------------
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities, contextRef }) => {
  return (
    <Sticky
      context={contextRef}
      offset={100}
    >
      <Header
        attached="top"
        content="Recent Activity"
      />
      <Segment attached>
        <Feed>
          {activities && activities.map(activity => <EventActivityItem activity={activity} key={activity.id} />)}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default EventActivity;
