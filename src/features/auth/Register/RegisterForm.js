import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Label, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
// -----------------
import { registerUser, socialLogin } from '../authActions';
// -----------------
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
  displayName: isRequired('Name'),
  email: isRequired('Email'),
  password: isRequired('Password')
});

const RegisterForm = ({
  error,
  handleSubmit,
  invalid,
  registerUser,
  socialLogin,
  submitting
}) => {
  return (
    <div>
      <Form
        onSubmit={handleSubmit(registerUser)}
        size="large"
      >
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && <Label basic color="red">{error}</Label>}
          <Button
            color="teal"
            disabled={invalid || submitting}
            fluid
            size="large"
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  registerUser,
  socialLogin
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm));