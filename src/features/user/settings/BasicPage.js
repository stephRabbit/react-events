import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
// --------------------
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';

class BasicPage extends Component {
  render() {
    const { handleSubmit, pristine, submitting, updateProfile } = this.props;
    return (
      <Segment>
        <Header
          content="Basics"
          dividing
          size="large"
        />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            component={TextInput}
            width={8}
            name="displayName"
            type="text"
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender</label>
            <Field
              component={RadioInput}
              label="Male"
              name="gender"
              type="radio"
              value="male"
            />
            <Field
              component={RadioInput}
              label="Female"
              name="gender"
              type="radio"
              value="female"
            />
          </Form.Group>
          <Field
            component={DateInput}
            dateFormat="YYYY-MM-DD"
            dropdownMode="select"
            maxDate={moment().subtract(18, 'years')}
            name="dateOfBirth"
            placeholder="Date of Birth"
            showMonthDropdown={true}
            showYearDropdown={true}
            width={8}
          />
          <Field
            name="city"
            placeholder="Home Town"
            options={{ types: ['(cities)'] }}
            label="Female"
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: 'userProfile'
})(BasicPage);
