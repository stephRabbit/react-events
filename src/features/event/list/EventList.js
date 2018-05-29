import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  buildEvents() {
    const { events, updateOpenEvent, updateDeleteEvent } = this.props;
    return events.map(event => {
      return <EventListItem
        key={event.id}
        event={event}
        updateOpenEvent={updateOpenEvent}
        updateDeleteEvent={updateDeleteEvent}
      />
    });
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