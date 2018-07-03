import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
// ------------------
import { deleteEvent } from '../eventsActions';
// ------------------
import LoadingStatus from '../../../app/layouts/LoadingStatus';
import EventList from '../list/EventList';
import EventActivity from '../../event/activity/EventActivity';

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingStatus inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            updateDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ async, firestore }) => ({
  events: firestore.ordered.events,
  loading: async.loading
});

const mapDispatchToProps = {
  deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect([{ collection: 'events' }])(EventDashboard)
);