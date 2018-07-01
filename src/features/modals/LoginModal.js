import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/Login/LoginForm';
import { closeModal } from './modalActions';

const actions = { closeModal };

class LoginModal extends Component {
  render() {
    return (
      <Modal
        closeIcon="close"
        onClose={this.props.closeModal}
        open={true}
        size="mini"
      >
        <Modal.Header>
          Login to Re-vents
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(null, actions)(LoginModal);