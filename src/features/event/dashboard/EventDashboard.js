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

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
]
class EventDashboard extends Component {
  state = {
    contextRef: {},
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();

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
    let next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { activities, loading } = this.props;
    const { contextRef, loadedEvents, loadingInitial, moreEvents } = this.state;
    if (loadingInitial) return <LoadingStatus inverted={true} />
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <EventList
              events={loadedEvents}
              loading={loading}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity activities={activities} contextRef={contextRef}/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.firestore.ordered.activity,
  events: state.events,
  loading: state.async.loading
});

const mapDispatchToProps = {
  deleteEvent,
  getEventsForDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect(query)(EventDashboard)
);