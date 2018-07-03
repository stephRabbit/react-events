import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  buildEvents = () => {
    const { events, updateDeleteEvent } = this.props;
    return events && events.map(event => {
      return <EventListItem
        key={event.id}
        event={event}
        updateDeleteEvent={updateDeleteEvent}
      />
    });
  }

  render() {
    return (
      <div>
        {this.buildEvents()}
      </div>
    );
  }
}

export default EventList;