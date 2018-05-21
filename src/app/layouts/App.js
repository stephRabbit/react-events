import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
// Components
import NavBar from '../../features/nav/nav-bar/NavBar';
import Dashboard from '../../features/event/dashboard/EventDashboard';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <Dashboard />

        </Container>
      </div>
    );
  }
}

export default App;
