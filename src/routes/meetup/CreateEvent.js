/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Container,
  Form,
  Input,
  Header,
  TextArea,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';
import SemanticUI from '../../components/SemanticUI';
import { log, logError } from '../../logger';
import SingleEvent from './SingleEvent';
import colors from './colors';
import s from './CreateEvent.scss';

class CreateEvent extends Component {
  state = {
    title: '',
    shortDescription: '',
    description: '',
    humanLocation: '',
    gpsLocation: '',
    startTime: '',
    endTime: '',
    selectedColor: '#FDEB71,#F8D800',
    showPreview: false,
  };
  async handleSubmit() {
    const { email, password } = this.state;

    const response = await this.context.fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = {
      error: 'Something went wrong',
    };

    try {
      data = await response.json();
    } catch (e) {
      logError(e);
    }

    if (data.success) {
      log('Success!');
    } else {
      logError(data.error);
    }
  }
  handleInputChange(key, data) {
    log('handleInputChange');
    this.setState({
      [key]: data.value,
    });
  }
  handleColorClicked(color) {
    this.setState({
      selectedColor: color.toString(),
    });
  }
  render() {
    const {
      title,
      shortDescription,
      description,
      selectedColor,
      humanLocation,
      gpsLocation,
      startTime,
      endTime,
      showPreview,
    } = this.state;
    return (
      <SemanticUI>
        <Container text style={{ marginBottom: '3em' }}>
          <Header as="h1" style={{ marginTop: '2em' }}>
            Create Event
          </Header>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e, d) => this.handleInputChange('title', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Short Description</label>
              <Input
                type="text"
                value={shortDescription}
                onChange={(e, d) =>
                  this.handleInputChange('shortDescription', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Location Human</label>
              <Input
                type="text"
                value={humanLocation}
                onChange={(e, d) => this.handleInputChange('humanLocation', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <Input
                type="text"
                value={gpsLocation}
                onChange={(e, d) => this.handleInputChange('gpsLocation', d)}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field width={2}>
                <label>Start time</label>
                <Input
                  type="text"
                  value={startTime}
                  placeholder="17:00"
                  onChange={(e, d) => this.handleInputChange('startTime', d)}
                />
              </Form.Field>
              <Form.Field width={2}>
                <label>End time</label>
                <Input
                  type="text"
                  value={endTime}
                  placeholder="19:00"
                  onChange={(e, d) => this.handleInputChange('endTime', d)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Description</label>
              <TextArea
                autoHeight
                value={description}
                style={{ minHeight: 100 }}
                onChange={(e, d) => this.handleInputChange('description', d)}
              />
            </Form.Field>

            <Form.Field>
              <label>Background</label>
              <div className={s.colors}>
                {colors.map(color => (
                  <div
                    key={color.toString()}
                    className={s.color}
                    style={{
                      backgroundImage: `linear-gradient( 135deg, ${color[0]} 10%, ${color[1]} 100%)`,
                    }}
                    onClick={() => this.handleColorClicked(color)}
                  >
                    {color.toString() === selectedColor && (
                      <Icon name="check" size="big" />
                    )}
                  </div>
                ))}
              </div>
            </Form.Field>
            <Button
              size="large"
              onClick={() => this.setState({ showPreview: true })}
            >
              Preview
            </Button>
            <Button primary size="large" onClick={() => this.handleSubmit()}>
              Create event
            </Button>
          </Form>
        </Container>
        <Modal
          basic
          closeOnDocumentClick
          size="fullscreen"
          open={showPreview}
          onClose={() => this.setState({ showPreview: false })}
        >
          <Header content="Preview" />
          <Modal.Content
            style={{
              background: '#fff',
            }}
          >
            <SingleEvent
              invertHeader={false}
              title={title}
              backgroundColor={selectedColor.split(',')}
              // @TODO logo has to come from the group
              logo="/rvkjs2.png"
              attendees={[
                {
                  id: '2d130080-cc66-11e7-8744-09b6d394801c',
                  name: 'Kristjan Mikaelsson',
                  title: 'CEO of awesome corp',
                  image:
                    'https://communityfund.imgix.net/e5351d4d-f7fc-46a2-ade8-cdde3303fa97.png?fit=crop&w=500&h=500',
                  topics: [],
                },
              ]}
              shortDescription={shortDescription}
              description={description}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              inverted
              onClick={() => this.setState({ showPreview: false })}
            >
              <Icon name="remove" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </SemanticUI>
    );
  }
}

export default withStyles(s)(CreateEvent);
