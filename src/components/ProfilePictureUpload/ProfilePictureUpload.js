import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Dimmer, Loader, Progress, Icon } from 'semantic-ui-react';
import { log } from '../../logger';

export default class People extends React.Component {
  static propTypes = {
    defaultImage: PropTypes.string,
    onImageUploaded: PropTypes.func,
  };
  static defaultProps = {
    defaultImage: null,
    onImageUploaded: () => {},
  };
  static contextTypes = {
    fetch: PropTypes.func,
  };
  state = {
    file: null,
    isValid: undefined,
    uploadProgress: undefined,
    isDroppingFile: false,
    newProfileUrl: undefined,
    isLoadingImage: false,
  };
  async onDrop(files) {
    const { onImageUploaded } = this.props;

    const file = files[0];
    log('Received files: ', file);

    this.setState({
      ...this.state,
      file: files[0],
      isValid: undefined,
      uploadProgress: undefined,
      isDroppingFile: false,
      newProfileUrl: undefined,
      isLoadingImage: false,
    });

    try {
      const urlResponse = await this.context.fetch('/api/upload-url');
      const data = await urlResponse.json();

      const { url, type, key } = data;

      log('Starting upload');

      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': type,
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.floor(
            progressEvent.loaded * 100 / progressEvent.total,
          );

          log('Progress', percentCompleted);

          this.setState({
            ...this.state, // need fresh data
            uploadProgress:
              percentCompleted === 100 ? undefined : percentCompleted,
          });
        },
      });

      if (response.status === 200) {
        // success
        this.setState({
          ...this.state,
          isValid: 'success',
          newProfileUrl: key,
          isLoadingImage: true,
        });

        onImageUploaded(key);
      }
    } catch (e) {
      this.setState({
        ...this.state,
        isValid: 'error',
      });
    }
  }
  onDragEnter() {
    log('onDragEnter');

    const { isDroppingFile } = this.state;

    if (isDroppingFile) return;

    this.setState({
      ...this.state,
      isDroppingFile: true,
    });
  }
  onDragLeave() {
    log('onDragLeave');

    this.setState({
      ...this.state,
      isDroppingFile: false,
    });
  }
  handleImageLoaded() {
    log('handleFinishedImgixLoad');
    this.setState({
      ...this.state,
      isLoadingImage: false,
    });
  }
  render() {
    const {
      file,
      isDroppingFile,
      newProfileUrl,
      isLoadingImage,
      uploadProgress,
    } = this.state;
    const { defaultImage } = this.props;
    const preview = file ? file.preview : null;

    let content = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#000',
        }}
      >
        <Icon name="edit" size="big" />
      </div>
    );

    let shouldShowDimmer = false;

    if (isDroppingFile) {
      content = (
        <div
          style={{
            background: '#888',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '1.5rem',
          }}
        >
          UPLOAD
        </div>
      );
    } else if (newProfileUrl) {
      if (isLoadingImage) {
        shouldShowDimmer = true;
      }

      content = (
        <img
          // Do we want some fancy face zoom effect?
          // src={`http://communityfund.imgix.net/${newProfileUrl}?fit=facearea&facepad=3.0&w=500&h=500`}
          src={`https://communityfund.imgix.net/${newProfileUrl}?w=500&h=500`}
          alt="Some stuff"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onLoad={() => this.handleImageLoaded()}
        />
      );
    } else if (preview) {
      shouldShowDimmer = true;

      content = (
        <img
          src={preview}
          alt="Some stuff"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      );
    } else if (defaultImage) {
      content = (
        <img
          src={defaultImage}
          alt="Some stuff"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      );
    }

    return (
      <Dropzone
        onDragEnter={() => this.onDragEnter()}
        onDragLeave={() => this.onDragLeave()}
        onDrop={files => this.onDrop(files)}
        multiple={false}
        style={{
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <Dimmer.Dimmable
          as="div"
          dimmed={shouldShowDimmer}
          style={{
            height: '100%',
          }}
        >
          <Dimmer active={shouldShowDimmer}>
            {!uploadProgress && <Loader>Loading</Loader>}
            {uploadProgress && (
              <Progress
                percent={uploadProgress}
                indicating
                progress
                size="medium"
              />
            )}
          </Dimmer>

          {content}
        </Dimmer.Dimmable>
      </Dropzone>
    );
  }
}
