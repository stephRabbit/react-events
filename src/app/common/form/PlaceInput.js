import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GOOGLE_API_URL } from '../config';


const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
};

class PlaceInput extends Component {
  state = {
    adress: '',
    scriptLoaded: false
  };

  handleScriptLoad = () => this.setState(() => ({ scriptsLoaded: true }));

  render() {
    const { input, width, options, onSelect, placeholder, meta: { touched, error } } = this.props;
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url={GOOGLE_API_URL}
          onLoad={this.handleScriptLoad}
        />
        {this.state.scriptsLoaded &&
        <PlacesAutocomplete
          inputProps={{ ...input, placeholder }}
          options={options}
          onSelect={onSelect}
          styles={styles}
        />}
        {touched && error && <Label basic color="red">{error}</Label>}
      </Form.Field>
    );
  }
}

export default PlaceInput;
