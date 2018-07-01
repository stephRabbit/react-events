import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
// -------------------
import { loginUser, signOutUser } from '../../auth/authActions';
// -------------------
import { openModal } from '../../modals/modalActions';
import SignedInMenu from '../menus/SignedInMenu';
import SignedOutMenu from '../menus/SignedOutMenu';

class NavBar extends Component {
  handleSign = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.signOutUser();
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item
              as={Link}
              header
              to="/"
            >
              <i className="quote right icon" style={{ fontSize: '1.5rem' }}></i>
            </Menu.Item>
            {
              authenticated && (<Menu.Item
                as={NavLink}
                name="Events"
                to="/events"
              />)
            }
            {
              authenticated && (<Menu.Item
                as={NavLink}
                name="People"
                to="/people"
              />)
            }
            <Menu.Item>
              <Button
                as={Link}
                color="blue"
                content="Create Event"
                floated="right"
                to="/create"
              />
            </Menu.Item>
            {
              authenticated
                ? <SignedInMenu currentUser={auth.currentUser} signOut={this.handleSignOut} />
                : <SignedOutMenu signIn={this.handleSign} register={this.handleRegister} />
            }
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  loginUser,
  openModal,
  signOutUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));