import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../authActions';

// Components
import TextInput from '../../../app/common/form/TextInput';

const LoginForm = ({ loginUser, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(loginUser)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

const mapDispatchToProps = {
  loginUser
};

export default connect(null, mapDispatchToProps)(reduxForm({
  enableReinitialize: true,
  form: 'loginForm'
})(LoginForm));