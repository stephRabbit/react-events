import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Label, Segment } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
// ----------------
import { loginUser, socialLogin } from '../authActions';
// ----------------
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

const LoginForm = ({ error, handleSubmit, loginUser, socialLogin }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(loginUser)}>
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
        {error && <Label basic color="red">{error}</Label>}
        <Button
          color="teal"
          fluid
          size="large"
        >
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const mapDispatchToProps = {
  loginUser,
  socialLogin
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'loginForm'
})(LoginForm));