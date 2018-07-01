import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
// ------------------
import { deleteEvent } from '../eventsActions';
// ------------------
import LoadingStatus from '../../../app/layouts/LoadingStatus';
import EventList from '../list/EventList';
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
        <Grid.Column width={6}></Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ async, events }) => ({
  events,
  loading: async.loading
});

const mapDispatchToProps = {
  deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);