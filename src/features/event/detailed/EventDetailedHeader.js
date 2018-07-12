import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const EventDetailedHeader = ({ event }) => {
  let date;
  if (event.date) {
    date = format(event.date, 'dddd Do MMMM');
  }
  return (
   <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          fluid
          src={`/assets/categoryImages/${event.category}.jpg`}
          style={eventImageStyle}
        />

        <Segment
          basic
          style={eventImageTextStyle}
        >
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button
          as={Link}
          color="orange"
          floated="right"
          to={`/manage/${event.id}`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
