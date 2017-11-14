import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Form, Segment, Button, Message } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from '../../components/Link';

import { logError } from '../../logger';

export default class Reset extends React.Component {
  static propTypes = { redirect: PropTypes.string };
  static defaultProps = { redirect: null };
  static contextTypes = { fetch: PropTypes.func };
  state = {
    email: '',
    error: null,
    showSuccess: false,
    googleToken: null,
    isSending: false,
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleCaptcha(googleToken) {
    this.setState(
      {
        ...this.state,
        googleToken,
      },
      () => {
        this.handleSubmit();
      },
    );
  }
  async handleSubmit() {
    const { email, googleToken } = this.state;

    if (!googleToken) {
      this.setState({
        ...this.state,
        isSending: true,
      });

      this.captcha.execute();
      return false;
    }

    const response = await this.context.fetch('/api/reset', {
      method: 'POST',
      body: JSON.stringify({
        email,
        googleToken,
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
      this.setState({
        showSuccess: true,
        error: null,
        isSending: false,
      });
    } else {
      this.setState({
        error: data.error,
        isSending: false,
      });
    }

    return true;
  }
  render() {
    const { redirect } = this.props;
    const { email, error, showSuccess, isSending } = this.state;
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
            {redirect === 'error' && (
              <Message
                error
                header="Something went wrong"
                content="You could try to reset your password again"
              />
            )}
            {redirect === 'invalid' && (
              <Message
                error
                header="Invalid or expired link"
                content="You could try to reset your password again"
              />
            )}
            {showSuccess && (
              <Message
                success
                header="Reset successful"
                content={`Please check ${email} for instructions`}
              />
            )}
            {!showSuccess && (
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
                    loading={isSending}
                  >
                    Reset
                  </Button>
                </Segment>

                <ReCAPTCHA
                  size="invisible"
                  ref={el => {
                    this.captcha = el;
                  }}
                  sitekey="6Lf5rzgUAAAAANpKissQOHUuFwuEFvaOxtiqCBAq"
                  onChange={e => this.handleCaptcha(e)}
                />
              </Form>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
