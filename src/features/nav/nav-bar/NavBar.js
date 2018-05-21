import React, { Component } from 'react';
import {  Button, Container, Menu } from 'semantic-ui-react';

class NavBar extends Component {
  render() {
    return (
      <div>
          <Menu inverted fixed="top">
            <Container>
              <Menu.Item header>
                <i className="calendar alternate outline icon" style={{fontSize: '1.5rem'}}></i>
              </Menu.Item>
              <Menu.Item name="Events" />
              <Menu.Item>
                <Button floated="right" color="blue" content="Create Event" />
              </Menu.Item>
              <Menu.Item position="right">
                <Button basic inverted content="Login" />
                <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}} />
              </Menu.Item>
            </Container>
          </Menu>
      </div>
    );
  }
}

export default NavBar;