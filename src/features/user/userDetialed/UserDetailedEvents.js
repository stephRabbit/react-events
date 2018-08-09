import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } },
];

const UserDetailedEvents = ({ changeTab, events, eventsLoading }) => {
  return (
    <Grid.Column width={12}>
      <Segment
        attached
        loading={eventsLoading}
      >
        <Header icon='calendar' content='Events' />
        <Tab
          panes={panes}
          menu={{secondary: true, pointing: true}}
          onTabChange={(e,data) => changeTab(e, data)}
        />
        <br />
        <Card.Group itemsPerRow={5}>
          {events && events.map(event => (
              <Card
                as={Link}
                key={event.id}
                to={`/event/${event.id}`}
              >
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign='center'>{event.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    {format(event.date && event.date.toDate(), 'dddd Do MMMM')}
                    {format(event.date && event.date.toDate(), 'h:mm A')}
                  </Card.Meta>
                </Card.Content>
              </Card>
            )
          )}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
