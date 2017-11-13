/* eslint-disable jsx-a11y/label-has-for, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  Form,
  Input,
  Checkbox,
  Grid,
  Message,
  Dropdown,
  Label,
  Button,
} from 'semantic-ui-react';
import { log } from '../../logger';

import { updateUser as updateUserAction } from '../../actions/updateUser';

import HeaderMenu from '../../components/HeaderMenu';
import Person from '../../components/Person';
import ProfilePictureUpload from '../../components/ProfilePictureUpload';

import s from './Home.scss';

class Home extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
    updateUser: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired,
  };

  static defaultProps = {
    currentUser: {},
  };
  constructor(props) {
    super(props);

    const selectedTopics = props.currentUser ? props.currentUser.topics : [];

    selectedTopics.sort((a, b) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });

    this.state = {
      selectedTopics,
      isPublic: props.currentUser.isPublic,
      name: props.currentUser.name,
      title: props.currentUser.title,
      image: props.currentUser.image || null,
      showSuccess: false,
      showError: false,
    };
  }
  handleTopicsChange(data) {
    const { topics } = this.props;

    log('handleTopicsChange', data);
    this.setState({
      selectedTopics: data.value.map(
        name => topics.filter(topic => topic.name === name)[0],
      ),
    });
  }
  handleListingChange(data) {
    log('handleListingChange');
    this.setState({
      isPublic: data.checked,
    });
  }
  handleInputChange(key, data) {
    log('handleInputChange');
    this.setState({
      [key]: data.value,
    });
  }
  async handleSubmit() {
    log('handleSubmit');
    const { name, title, isPublic, image, selectedTopics } = this.state;

    try {
      await this.props.updateUser({
        name,
        title,
        isPublic,
        image,
        topics: selectedTopics.map(t => t.id),
      });

      this.setState({
        ...this.state,
        showSuccess: true,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        showError: true,
      });
    }
  }
  handleImageUpdated(image) {
    log('handleImageUpdated', image);
    this.setState({
      ...this.state,
      image,
    });
  }
  render() {
    const { topics } = this.props;
    const {
      selectedTopics,
      isPublic,
      name,
      title,
      image,
      showSuccess,
      showError,
    } = this.state;
    return (
      <Segment
        inverted
        style={{
          padding: '1em 0em',
          height: '100%',
          minHeight: '100vh',
          width: '100vw',
          backgroundImage: `url(/img/background_road.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
        vertical
      >
        <HeaderMenu />

        <Container text>
          <Header
            as="h1"
            inverted
            style={{
              fontSize: '2.6rem',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '10vh',
              textTransform: 'uppercase',
            }}
          >
            Hi, {name}!
          </Header>
          <Header
            as="p"
            inverted
            style={{
              fontSize: '1.2rem',
              fontWeight: 'normal',
              marginTop: '1em',
            }}
          >
            This is your profile
          </Header>

          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <Person
                  name={name}
                  image={
                    <div style={{ height: 212, width: '100%' }}>
                      <ProfilePictureUpload
                        defaultImage={`https://communityfund.imgix.net/${image}?w=500&h=500`}
                        onImageUploaded={key => {
                          this.handleImageUpdated(key);
                        }}
                      />
                    </div>
                  }
                  title={title}
                  topics={selectedTopics.map(
                    topic => topics.filter(t => t.name === topic.name)[0],
                  )}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Form success={showSuccess} error={showError}>
                  <Form.Field placeholder="Name">
                    <label style={{ color: 'white' }}>Name</label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e, d) => this.handleInputChange('name', d)}
                    />
                  </Form.Field>
                  <Form.Field placeholder="Title">
                    <label style={{ color: 'white' }}>Title</label>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e, d) => this.handleInputChange('title', d)}
                    />
                  </Form.Field>

                  <Form.Field placeholder="Name">
                    <label style={{ color: 'white' }}>List publicly</label>
                    <Checkbox
                      toggle
                      checked={isPublic}
                      onChange={(e, d) => this.handleListingChange(d)}
                    />
                  </Form.Field>
                  <Message
                    hidden={isPublic}
                    color="yellow"
                    size="small"
                    icon="exclamation"
                    header="Hidden listing"
                    content="If you choose not to list publicly, people in our community won't be able to find you :("
                  />
                  <Form.Field>
                    <label style={{ color: 'white' }}>Topics</label>
                  </Form.Field>
                  <Dropdown
                    placeholder="Topics"
                    fluid
                    multiple
                    search
                    selection
                    upward
                    options={topics.map(topic => ({
                      label: (
                        <Label
                          color={topic.color}
                          style={{ paddingTop: '2px' }}
                        />
                      ),
                      key: topic.name,
                      value: topic.name,
                      text: topic.name,
                      color: topic.color,
                    }))}
                    renderLabel={label => ({
                      color: label.color,
                      content: label.text,
                    })}
                    onChange={(e, d) => this.handleTopicsChange(d)}
                    value={selectedTopics.map(topic => topic.name)}
                  />
                  {selectedTopics.length === 0 && (
                    <Message
                      size="small"
                      icon="lightbulb"
                      content="You subscribe to each topic you add and the first three topics will be displayed publicly in lists."
                    />
                  )}

                  <Message
                    success
                    header="Updated"
                    content="Your profile is ready to go"
                    onDismiss={() => {
                      this.setState({ ...this.state, showSuccess: false });
                    }}
                  />

                  <Message
                    error
                    header="Error"
                    content="Something went wrong"
                    onDismiss={() => {
                      this.setState({ ...this.state, showError: false });
                    }}
                  />

                  <Button
                    type="submit"
                    primary
                    style={{ marginTop: '1em' }}
                    onClick={() => this.handleSubmit()}
                  >
                    Update
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.user,
    topics: state.topics.data,
  }),
  { updateUser: updateUserAction },
)(withStyles(s)(Home));
