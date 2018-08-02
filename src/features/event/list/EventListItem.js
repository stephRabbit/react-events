import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';
// -----------------
import { objectToArray } from '../../../app/common/util/helpers';
// -----------------
import EventListItemAttendee from './EventListItemAttendee';

class EventListItem extends Component {
  render() {
    const { event } = this.props;
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
                <Item.Header
                  as={Link}
                  to={`/event/${event.id}`}
                >
                  {event.title}
                </Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled &&
                <Label
                  color="red"
                  content="This event has been cancelled"
                  ribbon="right"
                  style={{top:'-40px'}}
                />}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />{format(event.date.toDate(), 'dddd Do MMMM')} at {format(event.date.toDate(), 'HH:mm')} |
            <Icon name="marker" />{event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {
              event.attendees &&
              objectToArray(event.attendees).map(
                (attendee) => <EventListItemAttendee key={attendee.id} attendee={attendee} />
              )
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
