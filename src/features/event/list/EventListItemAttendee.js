import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';

class EventListItemAttendee extends Component {
  render() {
    const { attendee } = this.props;
    return (
      <List.Item>
        <Image
          as="a"
          circular
          size="mini"
          src={attendee.photoURL}
        />
      </List.Item>
    );
  }
}

export default EventListItemAttendee;