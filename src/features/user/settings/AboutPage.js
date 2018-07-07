import React from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const AboutPage = ({ handleSubmit, initialValues, pristine, submitting, updateProfile }) => {
  return (
    <Segment>
      <Header
        content="About Me"
        dividing
        size="large"
      />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <Field
            component={RadioInput}
            label="Single"
            name="status"
            type="radio"
            value="single"
          />
          <Field
            component={RadioInput}
            label="Relationship"
            name="status"
            type="radio"
            value="relationship"
          />
          <Field
            component={RadioInput}
            label="Married"
            name="status"
            type="radio"
            value="married"
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <Field
          component={TextArea}
          name="about"
          placeholder="About Me"
        />
        <Field
          component={SelectInput}
          multiple={true}
          name="interests"
          options={interests}
          placeholder="Select your interests"
          value="interests"
        />
        <Field
          component={TextInput}
          name="occupation"
          placeholder="Occupation"
          type="text"
          width={8}
        />
        <Field
          component={PlaceInput}
          name="origin"
          options={{ types: ['(regions)'] }}
          placeholder="Country of Origin"
          width={8}
        />
        <Divider />
        <Button
          content="Update Profile"
          disabled={pristine || submitting}
          positive
          size="large"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: 'userProfile'
})(AboutPage);
