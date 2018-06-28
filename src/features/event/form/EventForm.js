/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import moment from 'moment';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createEvent, updateEvent } from '../eventsActions';
import { GOOGLE_API_URL } from '../../../app/common/config';

// Components
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
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
    hasLengthGreaterThan(4)({ message: 'Description must be at least 5 characters long' })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
});
class EventForm extends Component {
  state = {
    cityLatLng: {},
    scriptsLoaded: false,
    venueLatLng: {}
  };

  // Static Methods
  handleScriptLoad = () => this.setState(() => ({ scriptsLoaded: true }));

  handleCitySelect = citySelect => {
    geocodeByAddress(citySelect)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState(() => ({ cityLatLng: latlng }));
      })
      // Hook provide by redux-form to take what's in
      // state and pass it to our feilds
      .then(() => {
        // redux-form fn to change select field
        this.props.change('city', citySelect);
      })
  };

  handleVenueSelect = venueSelect => {
    geocodeByAddress(venueSelect)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState(() => ({ venueLatLng: latlng }));
      })
      // Hook provide by redux-form to take what's in
      // state and pass it to our feilds
      .then(() => {
        // redux-form fn to change select field
        this.props.change('venue', venueSelect);
      })
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
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
        ],
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
        <Script
          url={GOOGLE_API_URL}
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                autoComplete="true"
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
              <Header sub color="teal" content="Event Location Details" />
              <Field
                autoComplete="false"
                component={PlaceInput}
                name="city"
                onSelect={this.handleCitySelect}
                options={{ types: ['(cities)'] }}
                placeholder="City"
                type="text"
              >
              </Field>
              {this.state.scriptsLoaded &&
              <Field
                autoComplete="false"
                component={PlaceInput}
                name="venue"
                onSelect={this.handleVenueSelect}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder="Venue"
                type="text"
              >
              </Field>}
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