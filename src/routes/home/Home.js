/* eslint-disable jsx-a11y/label-has-for */

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

import HeaderMenu from '../../components/HeaderMenu';
import Person from '../../components/Person';
import ProfilePictureUpload from '../../components/ProfilePictureUpload';

import s from './Home.scss';
import topics from '../../data/topics';

class Home extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
  };

  static defaultProps = {
    currentUser: {},
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedTopics: [],
      listed: false,
      name: props.currentUser.name,
      title: 'Some title for user',
    };
  }
  handleTopicsChange(data) {
    this.setState({
      selectedTopics: data.value,
    });
  }
  handleListingChange(data) {
    this.setState({
      listed: data.checked,
    });
  }
  handleInputChange(key, data) {
    this.setState({
      [key]: data.value,
    });
  }
  render() {
    const { currentUser } = this.props;
    const { selectedTopics, listed, name, title } = this.state;

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
                  id={currentUser.id}
                  name={name}
                  image={
                    <div style={{ height: 212, width: '100%' }}>
                      <ProfilePictureUpload defaultImage={currentUser.image} />
                    </div>
                  }
                  title={title}
                  topics={selectedTopics.map(
                    topic => topics.filter(t => t.name === topic)[0],
                  )}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Form>
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

                  <Form.Field>
                    <label style={{ color: 'white' }}>Profile image</label>
                  </Form.Field>

                  <Form.Field placeholder="Name">
                    <label style={{ color: 'white' }}>
                      List on People page
                    </label>
                    <Checkbox
                      toggle
                      checked={listed}
                      onChange={(e, d) => this.handleListingChange(d)}
                    />
                  </Form.Field>
                  <Message
                    hidden={listed}
                    color="yellow"
                    size="small"
                    icon="exclamation"
                    header="Hidden listing"
                    content="If you choose not to list on the people page, folks in our community won't be able to find you :("
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
                    value={selectedTopics}
                  />
                  {selectedTopics.length === 0 && (
                    <Message
                      size="small"
                      icon="lightbulb"
                      content="You subscribe to each topic you add and the first three topics will be displayed publicly in lists."
                    />
                  )}

                  <Button type="submit" primary style={{ marginTop: '1em' }}>
                    Submit
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
  }),
  {},
)(withStyles(s)(Home));
