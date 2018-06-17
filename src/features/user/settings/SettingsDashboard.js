import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';
import PhotoPage from './PhotoPage';
import SettingsNav from './SettingsNav';


const SettingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect
            exact
            from="/settings"
            to="/settings/basic"
          />
          <Route
            path="/settings/basic"
            component={BasicPage}
          />
          <Route
            path="/settings/about"
            component={AboutPage}
          />
          <Route
            path="/settings/photos"
            component={PhotoPage}
          />
          <Route
            path="/settings/account"
            component={AccountPage}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default SettingsDashboard;
