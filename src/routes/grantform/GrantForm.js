/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReCAPTCHA from 'react-google-recaptcha';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { inputChange, submitGrant } from '../../actions/grant';
import s from './GrantForm.css';

class GrantForm extends Component {
  static propTypes = {
    inputChange: PropTypes.func.isRequired,
    submitGrant: PropTypes.func.isRequired,
    date: PropTypes.object,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    askAmount: PropTypes.string,
    totalCost: PropTypes.string,
    description: PropTypes.string,
    summary: PropTypes.string,
  }
  render() {
    const {
      inputChange,
      submitGrant,
      date = null,
      name = '',
      email = '',
      phone = '',
      askAmount = '',
      totalCost = '',
      description = '',
      summary = '',
    } = this.props;

    return (
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.labelContainer}>
            <div className={s.label}>Contact</div>
          </div>

          <input
            type="text"
            value={name}
            placeholder="Name"
            className={s.input}
            onChange={({ target: { value } }) => inputChange('name', value)}
          />

          <div className={s.contactContainer}>
            <input
              type="text"
              value={email}
              placeholder="Email"
              className={`${s.input} ${s.email}`}
              onChange={({ target: { value } }) => inputChange('email', value)}
            />

            <input
              type="text"
              value={phone}
              placeholder="Phone number"
              className={`${s.input} ${s.phone}`}
              onChange={({ target: { value } }) => inputChange('phone', value)}
            />
          </div>

          <div className={s.labelContainer}>
            <div className={s.label}>About your event</div>
          </div>

          <DatePicker
            selected={date}
            placeholderText="Date"
            dateFormat="DD/MM/YYYY"
            onChange={(value) => inputChange('date', value)}
            locale="en"
            className={`${s.input} ${s.date}`}
          />

          <input
            type="text"
            value={summary}
            placeholder="Short summary"
            className={s.input}
            onChange={({ target: { value } }) => inputChange('summary', value)}
          />

          <textarea
            type="text"
            value={description}
            placeholder="Description"
            className={`${s.input} ${s.description}`}
            onChange={({ target: { value } }) => inputChange('description', value)}
          />

          <div className={s.labelContainer} >
            <div className={s.label}>Grant</div>
          </div>

          <div className={s.costContainer}>
            <input
              type="text"
              value={askAmount}
              placeholder="How much money do you need?"
              className={`${s.input} ${s.ask}`}
              onChange={({ target: { value } }) => inputChange('askAmount', value)}
            />

            <input
              type="text"
              value={totalCost}
              placeholder="How much does the event cost?"
              className={`${s.input} ${s.totalCost}`}
              onChange={({ target: { value } }) => inputChange('totalCost', value)}
            />
          </div>

          <div className={s.captchaContainer}>
            <ReCAPTCHA
              // ref="recaptcha"
              sitekey="6LdRlycTAAAAAHFDPQDPkspMIqEDnUR4xk7ouueV"
              onChange={(token) => inputChange('googleToken', token)}
              className={s.captcha}
            />
          </div>
          <div className={s.sendContainer}>
            <div className={s.send} onClick={() => submitGrant()}>Send</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state /* , props */) => ({
  ...state.grant,
}), {
  inputChange,
  submitGrant,
})(withStyles(s)(GrantForm));
