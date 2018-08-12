import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
// ------------------
import { cancelGoingToEvent, goingToEvent } from '../../user/userActions';
import { addEventComment } from '../../event/eventsActions';
// ------------------
import { createDataTree, objectToArray } from '../../../app/common/util/helpers';
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
    const { addEventComment, auth, cancelGoingToEvent, event, eventChat, goingToEvent } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.id;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
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
          <EventDetailedChat
            addEventComment={addEventComment}
            eventChat={chatTree}
            eventId={event.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapActions = {
  addEventComment,
  cancelGoingToEvent,
  goingToEvent
};

const mapStateToProps = (state, ownProps) => {
  const { firestore, firebase } = state;
  // Return empty {} if no events
  let event = {};

  // Check for eventId and if store has events
  if (firestore.ordered.events && firestore.ordered.events[0]) {
    event = firestore.ordered.events[0];
  }

  return {
    auth: firebase.auth,
    event,
    eventChat: (
      !isEmpty(firebase.data.event_chat) &&
      objectToArray(firebase.data.event_chat[ownProps.match.params.id])
    )
  };
};

export default compose(
  withFirestore,
  connect(mapStateToProps, mapActions),
  firebaseConnect(props => ([`event_chat/${props.match.params.id}`]))
)(EventDetailedPage);
