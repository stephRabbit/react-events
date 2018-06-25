import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { deleteEvent } from '../eventsActions';

// Components
import EventList from '../list/EventList';
class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  }

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            updateDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}></Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events
});

const mapDispatchToProps = {
  deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);