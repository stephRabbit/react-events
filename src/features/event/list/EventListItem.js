import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';
// -----------------
import EventListItemAttendee from './EventListItemAttendee';

class EventListItem extends Component {
  render() {
    const { event, updateDeleteEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                circular
                size="tiny"
                src={event.hostPhotoURL}
              />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />{format(event.date, 'dddd Do MMMM')} at {format(event.date, 'HH:mm')} |
            <Icon name="marker" />{event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {
              event.attendees &&
              event.attendees.map(attendee => <EventListItemAttendee key={attendee.id} attendee={attendee} />)
            }
          </List>
        </Segment>
        <Segment clearing>
          <span>
            {
              event.description
                ? event.description
                : 'N/A'
            }
          </span>
          <div className="btn-block">
            <Button
              as="a"
              color="red"
              content="Delete"
              floated="right"
              onClick={updateDeleteEvent(event.id)}
            />
            <Button
              as={Link}
              color="teal"
              content="View"
              floated="right"
              to={`/event/${event.id}`}
            />
          </div>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
