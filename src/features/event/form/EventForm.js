import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
//import ListItem from './ListItem';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
};
class EventForm extends Component {
  state = {
    event: emptyEvent
  };

  // Lifecyle Hooks
  componentDidMount() {
    if (this.props.selectedEvent) {
      this.setState(() => ({ event: this.props.selectedEvent }));
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ', nextProps.selectedEvent)
    // console.log('thisProps: ', this.props.selectedEvent)
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState(() => ({ event: nextProps.selectedEvent || emptyEvent }));
    }
  }

  // Static Methods
  onFormSubmit = e => {
    e.preventDefault();
    const { updateCreateEvents, updateEvents } = this.props;
    const { event } = this.state;

    (event.id)
      ? updateEvents(event)
      : updateCreateEvents(event);
  }

  onInputChange = e => {
    e.persist();
    const newEvent = this.state.event;
    newEvent[e.target.name] = e.target.value;
    this.setState(({ event }) => ({ event: { ...event, newEvent }}));
  }

  render() {
    const { updateCloseForm } = this.props;
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
            onClick={updateCloseForm}
            type="button"
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;