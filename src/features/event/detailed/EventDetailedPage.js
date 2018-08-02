import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
// ------------------
import { cancelGoingToEvent, goingToEvent } from '../../user/userActions';
// ------------------
import { objectToArray } from '../../../app/common/util/helpers';
// ------------------
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailSidebar from './EventDetailSidebar';

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);

  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { auth, cancelGoingToEvent, event, goingToEvent } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.id;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapActions = {
  cancelGoingToEvent,
  goingToEvent
};

const mapStateToProps = (state) => {
  const { firestore, firebase } = state;
  // Return empty {} if no events
  let event = {};

  // Check for eventId and if store has events
  if (firestore.ordered.events && firestore.ordered.events[0]) {
    event = firestore.ordered.events[0];
  }

  return {
    auth: firebase.auth,
    event
  };
};

export default withFirestore(connect(mapStateToProps, mapActions)(EventDetailedPage));
