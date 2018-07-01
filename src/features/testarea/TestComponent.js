import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { decrementCount, incrementCount, decrementAsync, incrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';
import { GOOGLE_API_URL } from '../../app/common/config';


class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: '',
    scriptsLoaded: false
  };


  handleScriptLoad = () => {
    // If scripts are loaded set state to true
    this.setState(() => ({ scriptsLoaded: true }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  };

  onChange = address => this.setState(() => ({ address }));

  render() {
    const {
      data,
      // decrementCount,
      // incrementCount,
      incrementAsync,
      decrementAsync,
      loading,
      openModal
    } = this.props;

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };
    return (
      <div>
        <Script
          url={GOOGLE_API_URL}
          onLoad={this.handleScriptLoad}
        />
        <h1>
          Test Area: {data}
        </h1>
        <Button
          content="Plus"
          color="purple"
          loading={loading}
          onClick={incrementAsync}
        />
        <Button
          content="Minus"
          color="purple"
          loading={loading}
          onClick={decrementAsync}
        />
        <Button
          content="Open Modal"
          color="pink"
          onClick={() => openModal('TestModal', { fakeData: 123 })}
        />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {
            // Render component once scripts are loaded
            this.state.scriptsLoaded && <PlacesAutocomplete inputProps={inputProps} />
          }
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading,
  modal: state.modals
});

const mapDispatchToProps = {
  decrementCount,
  incrementCount,
  decrementAsync,
  incrementAsync,
  openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
