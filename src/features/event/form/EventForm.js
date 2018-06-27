import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import moment from 'moment';
import { createEvent, updateEvent } from '../eventsActions';

// Components
import DateInput from '../../../app/common/form/DateInput';
import TextArea from '../../../app/common/form/TextArea';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'Tilte is required' }),
  category: isRequired({ message: 'Category is required' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description must be at least 5 characters long'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
});
class EventForm extends Component {
  // Static Methods
  onFormSubmit = values => {
    console.log(values);
    values.date = moment(values.date).format();
    const { createEvent, updateEvent, history } = this.props;

    if (this.props.initialValues.id) {
      updateEvent(values)
      history.goBack();
    }
    else {
      const newEvent = {
        id: cuid(),
        hostedBy: 'YoMamma!',
        hostPhotoURL: '/assets/user.png',
        ...values
      };
      createEvent(newEvent);
      history.push('/events');
    }
  }

  render() {
    const { invalid, pristine, submitting } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details"/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                autoComplete
                component={TextInput}
                name="title"
                placeholder="Add your event name"
                type="text"
              >
              </Field>
              <Field
                component={SelectInput}
                name="category"
                options={category}
                placeholder="Add a category"
                type="select"
              >
              </Field>
              <Field
                component={TextArea}
                name="description"
                placeholder="Add a description"
                rows="3"
              >
              </Field>
              <Header sub color="teal" content="Event Location Details"/>
              <Field
                autoComplete
                component={TextInput}
                name="city"
                placeholder="City"
                type="text"
              >
              </Field>
              <Field
                autoComplete
                component={TextInput}
                name="venue"
                placeholder="Venue"
                type="text"
              >
              </Field>
              <Field
                autoComplete="off"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                name="date"
                placeholder="Date &amp; Time of Event"
                time="HH:mm"
                showTimeSelect
              >
              </Field>
              <Button
                disabled={invalid || pristine || submitting}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={this.props.history.goBack}
                type="button"
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
};

const mapStateToProps = (state, props) => {
  const eventId = props.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  enableReinitialize: true,
  form: 'eventForm',
  validate
})(EventForm));