import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
// ------------------
import LoadingStatus from '../../../app/layouts/LoadingStatus';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedInfo from './UserDetailedInfo';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
// -------------------
import { userDetailedQuery } from '../userQueries';
class UserDetailedPage extends Component {
  render() {
    const { auth, match, photos, profile, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(req => req === true);

    if (loading) return <LoadingStatus inverted={true} />

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedInfo profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 && (<UserDetailedPhotos photos={photos} />)}
        <UserDetailedEvents />
      </Grid>
    );
  }
}

const mapStateToProps = ({ auth, firebase, firestore }, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === auth.uid) {
    profile = firebase.profile
  }
  else {
    profile = !isEmpty(firestore.ordered.profile) && firestore.ordered.profile[0]
    userUid = ownProps.match.params.id;
  }

  return {
    auth: firebase.auth,
    photos: firestore.ordered.photos,
    profile,
    requesting: firestore.status.requesting,
    userUid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
