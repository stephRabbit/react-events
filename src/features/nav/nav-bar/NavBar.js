import React, { Component } from 'react';
import {  Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../menus/SignedInMenu';
import SignedOutMenu from '../menus/SignedOutMenu';

class NavBar extends Component {
  state = {
    authenicated: false
  };

  handleSign = () => {
    this.setState(() => ({ authenicated: true }));
  }

  handleSignOut = () => {
    this.setState(() => ({ authenicated: false }));
    this.props.history.push('/');
  }

  render() {
    const { authenicated } = this.state;

    return (
      <div>
          <Menu inverted fixed="top">
            <Container>
              <Menu.Item
                as={Link}
                header
                to="/"
              >
                <i className="quote right icon" style={{fontSize: '1.5rem'}}></i>
              </Menu.Item>
              {
                authenicated && (<Menu.Item
                  as={NavLink}
                  name="Events"
                  to="/events"
                />)
              }
              {
                authenicated && (<Menu.Item
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
                authenicated
                  ? <SignedInMenu signOut={this.handleSignOut}  />
                  : <SignedOutMenu signIn={this.handleSign} />
              }
            </Container>
          </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);