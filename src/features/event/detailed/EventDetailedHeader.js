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

const EventDetailedHeader = ({ cancelGoingToEvent, event, goingToEvent, isGoing, isHost }) => {
  let evnetDate;
  if (event.date) {
    evnetDate = event.date.toDate();
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
                <p>{format(evnetDate, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing ? (
              <Button
                onClick={() => cancelGoingToEvent(event)}
              >
                Cancel My Place
              </Button>
            ) : (
              <Button
                color="teal"
                onClick={() => goingToEvent(event)}
              >
                JOIN THIS EVENT
              </Button>
            )}
          </div>
        )}
        {isHost && (
          <Button
            as={Link}
            color="orange"
            to={`/manage/${event.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
