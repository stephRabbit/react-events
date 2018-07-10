import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Image, Segment, Header, Divider, Grid, Button, Card, Icon } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
// ---------------------
import { deletePhoto, setMainPhoto, uploadProfileImage } from '../userActions';
// ---------------------
import 'cropperjs/dist/cropper.css';

class PhotoPage extends Component {
  state = {
    cropResult: null,
    files: [],
    fileName: '',
    image: {}
  };

  cancelCrop = () => {
    this.setState(() => ({
      files: [],
      image: {}
    }));
  };

  cropImage = () => {
    const cropper = this.refs.cropper;
    if (typeof cropper.getCroppedCanvas() === 'undefined') return;

    cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState(() => ({
        cropResult: imageUrl,
        image: blob
      }));
    }, 'image/jpeg');
  };

  // Wrapper method so new func is not created for each photo
  // {() => this.deletePhoto(photo)}
  handlePhotoDelete = photo => async () => {
    try {
      await this.props.deletePhoto(photo);
    }
    catch (err) {
      toastr.error('Oops', err.message);
    }
  };

  handleSetMainPhoto = photo => async () => {
    try {
      await this.props.setMainPhoto(photo);
    }
    catch (err) {
      toastr.error('Oops', err.message);
    }
  };

  onDrop = files => {
    this.setState(() => ({
      files,
      fileName: files[0].name
    }));
  };

  uploadImage = async () => {
    const { image, fileName } = this.state;
    try {
      await this.props.uploadProfileImage(image, fileName);
      this.cancelCrop();
      toastr.success('Success!', 'Photo has been uploaded');
    }
    catch (err) {
      toastr.error('Oops', err.message)
    }
  };

  render() {
    const { loading, photos, profile } = this.props;
    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter(photo => photo.url !== profile.photoURL);
    }
    return (
      <Segment>
        <Header
          content="Your Photos"
          dividing
          size="large"
        />
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
        >
          <div style={{ padding: '2rem .5rem .5rem', textAlign: 'center' }}>
            <Icon
              name="upload"
              size="huge"
            />
            <Header
              content="Drop image here or click to add"
            />
          </div>
        </Dropzone>
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {
              this.state.files[0] &&
              <Cropper
                aspectRatio={1}
                crop={this.cropImage}
                cropBoxMovable={true}
                cropBoxResizable={true}
                dragMode="move"
                guides={false}
                ref="cropper"
                scalable={true}
                style={{ height: 200, width: '100%' }}
                src={this.state.files[0].preview}
                viewMode={0}
              />
            }
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {
              this.state.files[0] && (
                <div>
                  <Image
                    style={{ minHeight: '100px', minWidth: '100px' }}
                    src={this.state.cropResult}
                  />
                  <Button.Group>
                    <Button
                      icon="check"
                      onClick={this.uploadImage}
                      positive
                      style={{ width: '100px' }}
                    />
                    <Button
                      icon="close"
                      onClick={this.cancelCrop}
                      style={{ width: '100px' }}
                    />
                  </Button.Group>
                </div>
              )}
          </Grid.Column>
        </Grid>
        <Divider />
        <Header sub color="teal" content="All Photos" />
        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || '/assets/user.png'} />
            <Button positive>Main Photo</Button>
          </Card>
          {
            photos && filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image
                  src={photo.url}
                />
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    loading={loading}
                    onClick={this.handleSetMainPhoto(photo)}
                  >
                    Main
                  </Button>
                  <Button
                    basic
                    color="red"
                    disabled={loading}
                    icon="trash"
                    onClick={this.handlePhotoDelete(photo)}
                  />
                </div>
              </Card>
            ))
          }
        </Card.Group>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  loading: state.async.loading,
  photos: state.firestore.ordered.photos,
  profile: state.firebase.profile
});

const mapDispatchToProps = {
  deletePhoto,
  setMainPhoto,
  uploadProfileImage
};

const query = ({ auth }) => ([
  {
    collection: 'users',
    doc: auth.uid,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'photos'
  }
]);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(auth => query(auth))
)(PhotoPage);
