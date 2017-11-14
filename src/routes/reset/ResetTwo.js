import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Form, Segment, Button, Message } from 'semantic-ui-react';
import { logError } from '../../logger';
import history from '../../history';
import Link from '../../components/Link';

export default class Reset extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  };
  static contextTypes = { fetch: PropTypes.func };
  state = { password: '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit() {
    const { userId, token } = this.props;
    const { password } = this.state;

    const response = await this.context.fetch(`/api/reset/${userId}/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
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
      history.push('/login?redirect=reset-success');
    } else {
      this.setState({ error: data.error });
    }
  }
  render() {
    const { password, error } = this.state;
    return (
      <div
        style={{
          height: '100%',
          minHeight: '100vh',
          background: '#f7f7f7',
        }}
      >
        <Grid
          textAlign="center"
          style={{ height: '100%', minHeight: '100vh', margin: 0 }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }} mobile={14}>
            <Image
              as={Link}
              to="/"
              src="/logos/transparent_logo.png"
              size="medium"
              style={{
                margin: 'auto',
                marginBottom: '1.4em',
                cursor: 'pointer',
              }}
            />
            <Form size="large" error={!!error}>
              <Message error content={error} size="tiny" />
              <Segment stacked>
                <Message content="Enter your new desired password" />

                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="New Password"
                  type="password"
                  value={password}
                  onChange={(...args) => this.handleChange(...args)}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => this.handleSubmit()}
                >
                  Reset
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
