/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createEvent, updateEvent, cancelToggle } from '../eventsActions';
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

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

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
    values.venueLatLng = this.state.venueLatLng;
    const { createEvent, updateEvent, history } = this.props;

    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }
      updateEvent(values)
      history.goBack();
    }
    else {
      createEvent(values);
      history.push('/events');
    }
  }

  render() {
    const { invalid, pristine, submitting, event, cancelToggle } = this.props;
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
              <Button
                color={event.cancelled ? 'green' : 'red'}
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                floated="right"
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
};

const mapStateToProps = (state, props) => {
  const { firestore } = state;
  let event = {};

  if (firestore.ordered.events && firestore.ordered.events[0]) {
    event = firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event
  };
};

const mapDispatchToProps = {
  cancelToggle,
  createEvent,
  updateEvent
};

export default withFirestore(
  connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    enableReinitialize: true,
    form: 'eventForm',
    validate
  })(EventForm))
);