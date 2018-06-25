import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
// Components
import NavBar from '../../features/nav/nav-bar/NavBar';
import EventDashboard from '../../features/event/dashboard/EventDashboard';
import EventDetailedPage from '../../features/event/detailed/EventDetailedPage';
import EventForm from '../../features/event/form/EventForm';
import HomePage from '../../features/home/HomePage';
import PeopleDashboard from '../../features/user/peopleDashboard/PeopleDashboard';
import SettingDashboard from '../../features/user/settings/SettingsDashboard';
import UserDetialedPage from '../../features/user/userDetialed/UserDetialedPage';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            component={HomePage}
            exact
            path="/"
          />
        </Switch>
        {/* { Match routes with anyting after the slash } */}
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route
                    component={EventDashboard}
                    path="/events"
                  />
                  <Route
                    component={EventDetailedPage}
                    path="/event/:id"
                  />
                  <Route
                    component={EventForm}
                    path="/manage/:id"
                  />
                  <Route
                    component={PeopleDashboard}
                    path="/people"
                  />
                  <Route
                    component={UserDetialedPage}
                    path="/profile/:id"
                  />
                  <Route
                    component={SettingDashboard}
                    path="/settings"
                  />
                  <Route
                    component={EventForm}
                    path="/create"
                  />
                  <Route
                    component={TestComponent}
                    path="/test"
                  />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
