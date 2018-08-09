import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
// ------------------
import { deleteEvent, getEventsForDashboard } from '../eventsActions';
// ------------------
import LoadingStatus from '../../../app/layouts/LoadingStatus';
import EventList from '../list/EventList';
import EventActivity from '../../event/activity/EventActivity';

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next)

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [
          ...this.state.loadedEvents,
          ...nextProps.events
        ]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events[events.length -1];
    console.log(lastEvent)
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };


  render() {
    const { loading } = this.props;
    const { loadedEvents, loadingInitial, moreEvents } = this.state;
    if (loadingInitial) return <LoadingStatus inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={loadedEvents}
            loading={loading}
            moreEvents={moreEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const mapDispatchToProps = {
  deleteEvent,
  getEventsForDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect([{ collection: 'events' }])(EventDashboard)
);