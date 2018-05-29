import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import cuid from 'cuid';
// Components
import EventList from '../list/EventList';
import EventForm from '../form/EventForm';

const eventsObject = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: eventsObject,
    isOpen: false
  };

  handleformOpen = () => this.setState(() => ({
    isOpen: true,
    selectedEvent: null
  }));

  handleformClose = () => this.setState(() => ({ isOpen: false }));

  handleCreateEvents = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    newEvent = [...this.state.events, newEvent]
    this.setState(() => ({
      events: newEvent,
      isOpen: false,
      selectedEvent: null
    }));
  };

  handleUpdateEvent = updateEvent => {
    this.setState(() => ({
      events: this.state.events.map(event => {
        return (event.id === updateEvent.id)
          ? { ...updateEvent } // equivalent to Object.assign({}, updateEvent)
          : event;
      }),
      isOpen: false,
      selectedEvent: null
    }));
  }

  handleOpenEvent = eventToOpen => () => {
    this.setState(() => ({
      isOpen: true,
      selectedEvent: eventToOpen
    }));
  };

  handleDeleteEvent = eventId => () => {
    const filterEvent = this.state.events.filter(event => event.id !== eventId);
    this.setState(() => ({
      events: filterEvent
    }));
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            updateOpenEvent={this.handleOpenEvent}
            updateDeleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column
          width={6}
        >
          <Button
            content="Create Event"
            onClick={this.handleformOpen}
            positive
          />
          {
            isOpen &&
            <EventForm
              selectedEvent={selectedEvent}
              updateCloseForm={this.handleformClose}
              updateCreateEvents={this.handleCreateEvents}
              updateEvents={this.handleUpdateEvent}
            />
          }
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;