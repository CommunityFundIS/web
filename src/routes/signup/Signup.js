import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Grid, Image, Form, Segment, Button, Message } from 'semantic-ui-react';
import Link from '../../components/Link';
import { logError } from '../../logger';

import s from './Signup.scss';

class Reset extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func,
  };
  state = {
    email: '',
    showSuccess: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  async handleSubmit() {
    const { email } = this.state;

    const response = await this.context.fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
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
      this.setState({ showSuccess: true });
    } else {
      this.setState({ showSuccess: false, error: data.error });
    }
  }
  render() {
    const { email, error, showSuccess } = this.state;
    return (
      <div className={s.root}>
        <Grid
          textAlign="center"
          style={{ height: '100%', minHeight: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image
              src="/logos/transparent_logo.png"
              size="medium"
              style={{ margin: 'auto', marginBottom: '1.4em' }}
            />
            {showSuccess && (
              <Message
                success
                header="Sign up successful"
                content={`Check your inbox(${email}) for further instructions`}
              />
            )}
            <Form size="large" error={!!error}>
              <Message error content={error} size="tiny" />
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={(...args) => this.handleChange(...args)}
                  value={email}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => this.handleSubmit()}
                >
                  Sign up
                </Button>
              </Segment>
            </Form>
            <Message>
              Have an account? <Link to="/login">Log in</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Reset);
