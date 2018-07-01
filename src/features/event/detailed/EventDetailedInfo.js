import React, { Component } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

// Components
import EventDetailedMap from './EventDetailedMap';

class EventDetailedInfo extends Component {
  state = {
    showMap: false
  };

  componentWillUnmount() {
    this.setState(() => ({ showMap: false }));
  }

  showMapToggle = () => {
    this.setState(prevProps => ({ showMap: !prevProps.showMap }));
  };

  render() {
    const { event } = this.props;
    const { showMap } = this.state;
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(event.date, 'dddd Do MMMM')} at {format(event.date, 'HH:mm')}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                color="teal"
                content={showMap ? 'Hide Map' : 'Show Map'}
                onClick={this.showMapToggle}
                size="tiny"
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {showMap &&
        <EventDetailedMap
        lat={event.venueLatLng.lat}
        lng={event.venueLatLng.lng}
        />}
      </Segment.Group>
    );
  }
}

export default EventDetailedInfo;
