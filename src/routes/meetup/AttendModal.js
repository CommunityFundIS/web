import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Header } from 'semantic-ui-react';
import Link from '../../components/Link';

const CFIcon = () => (
  <img
    alt="Community Fund"
    src="/img/logo_small.png"
    style={{
      width: 14,
      height: 14,
      marginBottom: -2,
      marginLeft: -10,
      marginRight: 10,
    }}
  />
);

export default class AttendModal extends React.Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleOnClose: PropTypes.func,
  };
  static defaultProps = {
    handleOnClose: () => {},
  };
  render() {
    const { eventId } = this.props;
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.handleOnClose()}
        size="tiny"
      >
        <Header icon="user" content="Attend meetup by..." />
        <Modal.Content>
          <Button
            as={Link}
            fluid
            to={`/login?attend=${eventId}`}
            content="Logging in"
            icon={<CFIcon />}
            color="blue"
            size="large"
          />
          <Button
            fluid
            as={Link}
            to={`/signup?attend=${eventId}`}
            content="Signing up"
            icon={<CFIcon />}
            color="teal"
            size="large"
            style={{ marginTop: 8 }}
          />
          {/* <Button
              as={Link}
              content="Attend with email"
              icon="mail outline"
              color="blue"
            /> */}
        </Modal.Content>
      </Modal>
    );
  }
}
