/* eslint-disable jsx-a11y/label-has-for, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Container, Input, Form, Checkbox, Label } from 'semantic-ui-react';
import { log } from '../../logger';

import s from './Apply.scss';

class Home extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape(),
  };

  static defaultProps = {
    currentUser: {},
  };
  state = {
    meetupName: '',
    firstEvent: false,
    ask: '',
    totalCost: '',
    turnout: '',
  };
  handleInputChange(key, data) {
    log('handleInputChange');
    this.setState({
      [key]: data.value,
    });
  }
  handleCheckboxChange(data) {
    log('handleCheckboxChange');
    this.setState({
      firstEvent: data.checked,
    });
  }

  render() {
    const { currentUser } = this.props;
    log(currentUser);
    const { meetupName, firstEvent, ask, totalCost, turnout } = this.state;
    return (
      <Container text>
        <Container text>
          Hi there. Filling out the application should only take you about 15
          minutes. You can always reach out to us directly if you have any
          questions or you are hitting a wall.
        </Container>
        <div>===Facts===</div>
        <Form>
          <Form.Field>
            <label>Name</label>
            <Input
              type="text"
              value={meetupName}
              onChange={(e, d) => this.handleInputChange('meetupName', d)}
            />
          </Form.Field>
          <Form.Field>
            <label>First time event?</label>
            <Checkbox
              toggle
              checked={firstEvent}
              onChange={(e, d) => this.handleCheckboxChange(d)}
            />
          </Form.Field>
          <Form.Field>
            <label>How much money do you need from us?</label>
            <Input
              type="number"
              value={ask}
              label="ISK"
              onChange={(e, d) => this.handleInputChange('ask', d)}
            >
              <Label basic>ISK</Label>
              <input />
            </Input>
          </Form.Field>
          <Form.Field>
            <label>Event total cost</label>
            <Input
              type="number"
              value={totalCost}
              label="ISK"
              onChange={(e, d) => this.handleInputChange('totalCost', d)}
            >
              <Label basic>ISK</Label>
              <input />
            </Input>
          </Form.Field>
          <Form.Field>
            <label>How many people will realistically show up?</label>
            <Input
              type="number"
              value={turnout}
              icon="users"
              iconPosition="left"
              onChange={(e, d) => this.handleInputChange('turnout', d)}
            />
          </Form.Field>
        </Form>

        <div> ===About the event===</div>
        <div> short summary</div>
        <div> description</div>
        <div> topics/who attends your meetup</div>
        <div> date</div>
        <div> ===Contact</div>
        <div> name</div>
        <div> email</div>
        <div> phone</div>
        <div> reikningsupplýsingar</div>
      </Container>
    );
  }
}

export default connect(state => ({
  currentUser: state.user,
}))(withStyles(s)(Home));
