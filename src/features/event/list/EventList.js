import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  buildEvents() {
    const { events } = this.props;
    return events.map(event => <EventListItem key={event.id} event={event} />);
  }

  render() {
    return (
      <div>
        <h1>Current Events</h1>
        {this.buildEvents()}
      </div>
    );
  }
}

export default EventList;