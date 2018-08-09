import React, { Component } from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll  from 'react-infinite-scroller';
class EventList extends Component {
  buildEvents = () => {
    const { events } = this.props;
    return events && events.map(event => {
      return <EventListItem
        key={event.id}
        event={event}
      />
    });
  }

  render() {
    const { events, getNextEvents, loading, moreEvents } = this.props;
    return (
      <div>
        {events && events.length &&
          <InfiniteScroll
            hasMore={!loading && moreEvents}
            initialLoad={false}
            loadMore={getNextEvents}
            pageStart={0}
          >
            {this.buildEvents()}
          </InfiniteScroll>
        }
      </div>
    );
  }
}

export default EventList;