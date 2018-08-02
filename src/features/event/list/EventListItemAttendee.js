import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';

class EventListItemAttendee extends Component {
  render() {
    const { attendee } = this.props;
    return (
      <List.Item>
        <Image
          as={Link}
          circular
          size="mini"
          src={attendee.photoURL}
          to={`/profile/${attendee.id}`}
        />
      </List.Item>
    );
  }
}

export default EventListItemAttendee;