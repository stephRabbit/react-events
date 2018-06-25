import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventsActions';
import cuid from 'cuid';
class EventForm extends Component {
  state = {
    event: { ...this.props.event } // Object.assign({}, this.props.event)
  };

  // Static Methods
  onFormSubmit = e => {
    e.preventDefault();
    const { createEvent, updateEvent, history } = this.props;
    const { event } = this.state;

    if (event.id) {
      updateEvent(event)
      history.goBack();
    }
    else {
      const newEvent = {
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        ...event
      };
      createEvent(newEvent);
      history.push('/events');
    }
  }

  onInputChange = e => {
    e.persist();
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState(({ event }) => ({ event: { ...event, newEvent }}));
  }

  render() {
    const { history } = this.props;
    const { event } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              onChange={this.onInputChange}
              placeholder="Event Title"
              value={event.title}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              onChange={this.onInputChange}
              placeholder="Event Date"
              type="date"
              value={event.date}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.onInputChange}
              placeholder="City event is taking place"
              value={event.city}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              onChange={this.onInputChange}
              placeholder="Enter the Venue of the event"
              value={event.venue}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              onChange={this.onInputChange}
              placeholder="Enter the name of person hosting"
              value={event.hostedBy}
            />
          </Form.Field>
          <Button
            positive
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={history.goBack}
            type="button"
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
};

const mapStateToProps = (state, props) => {
  const eventId = props.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);