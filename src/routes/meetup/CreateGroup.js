/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import slugify from 'slugify';
import {
  Container,
  Form,
  Header,
  TextArea,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';
import SemanticUI from '../../components/SemanticUI';
import ProfilePictureUpload from '../../components/ProfilePictureUpload';
import SingleGroup from './SingleGroup';
import { log, logError } from '../../logger';
import s from './CreateGroup.scss';
import colors from './colors';
import { numberToMonth } from '../../lib/date';

class CreateGroup extends Component {
  state = {
    name: '',
    slug: '',
    about: '',
    image: '',
    organizers: [],
    organizersOptions: [
      { key: 'kristjan', text: 'Kristjan Ingi Mikaelsson' },
      { key: 'addi', text: 'Arnar Vigfusson' },
      { key: 'anna', text: 'Anna Sigurlaug' },
    ],
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
    if (key === 'name') {
      this.setState({
        ...this.state,
        name: data.value,
        slug: slugify(data.value, {
          lower: true,
        }),
      });
    } else {
      this.setState({
        ...this.state,
        [key]: data.value,
      });
    }
  }
  handleColorClicked(color) {
    this.setState({
      ...this.state,
      selectedColor: color.toString(),
    });
  }
  handleImageUpdated(image) {
    log('handleImageUpdated', image);
    this.setState({
      ...this.state,
      image,
    });
  }
  render() {
    const {
      name,
      about,
      image,
      organizers,
      selectedColor,
      organizersOptions,
      showPreview,
      slug,
    } = this.state;
    return (
      <SemanticUI>
        <Container text style={{ marginBottom: '3em' }}>
          <Header as="h1" style={{ marginTop: '2em' }}>
            Create Group
          </Header>
          <Form>
            <Form.Group>
              <Form.Input
                type="text"
                value={name}
                label="Name"
                onChange={(e, d) => this.handleInputChange('name', d)}
              />
              <Form.Input
                type="text"
                value={slug}
                label="Slug"
                onChange={(e, d) => this.handleInputChange('slug', d)}
              />
            </Form.Group>
            <Form.Field>
              <TextArea
                autoHeight
                value={about}
                name="About"
                style={{ minHeight: 100 }}
                onChange={(e, d) => this.handleInputChange('about', d)}
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

            <Form.Field>
              <label>Group picture</label>
              <div
                style={{
                  width: 200,
                  height: 200,
                  backgroundImage: `linear-gradient( 135deg, ${selectedColor.split(
                    ',',
                  )[0]} 10%, ${selectedColor.split(',')[1]} 100%)`,
                }}
              >
                <ProfilePictureUpload
                  defaultImage={
                    image ? `https://communityfund.imgix.net/${image}` : null
                  }
                  onImageUploaded={key => {
                    this.handleImageUpdated(key);
                  }}
                />
              </div>
            </Form.Field>
            {/* <Form.Field>
              <Dropdown
                selection
                multiple
                search
                placeholder="Operators"
                options={organizersOptions}
                // value={}
                // placeholder="Add Users"
                // onChange={this.handleChange}
                // onSearchChange={this.handleSearchChange}
                // disabled={isFetching}
                // loading={isFetching}
              />
            </Form.Field> */}

            <Button
              size="large"
              onClick={() => this.setState({ showPreview: true })}
            >
              Preview
            </Button>
            <Button primary size="large" onClick={() => this.handleSubmit()}>
              Create group
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
            <SingleGroup
              backgroundColor={selectedColor.split(',')}
              name={name}
              about={about}
              logo={image ? `https://communityfund.imgix.net/${image}` : null}
              events={[
                {
                  day: new Date().getDate(),
                  month: numberToMonth(new Date().getMonth()),
                  title: 'Our First awesome event',
                  shortDescription: `NOT VISIBLE ON GROUP PROFILE! We are super excited to announce the first meetup of ${name}. Come and join us for a evening of fantasting talks and discussion.`,
                },
              ]}
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

export default withStyles(s)(CreateGroup);
