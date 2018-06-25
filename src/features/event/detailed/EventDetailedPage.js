import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailSidebar from './EventDetailSidebar';

const EventDetailedPage = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = (state, props) => {
  const eventId = props.match.params.id;

  // Return empty {} if no events
  let event = {};

  // Check for eventId and if store has events
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

export default connect(mapStateToProps, null)(EventDetailedPage);
