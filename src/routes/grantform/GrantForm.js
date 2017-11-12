/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReCAPTCHA from 'react-google-recaptcha';
import DatePickerStyles from 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { inputChange, submitGrant } from '../../actions/grant';
import Footer from '../../components/Footer';
import Link from '../../components/Link';
import s from './GrantForm.scss';

const InputWithError = ({
  type,
  value,
  placeholder,
  className,
  errorMessage,
  onChange,
}) => (
  <div className={className}>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={classNames(s.input, errorMessage ? s.inputError : null)}
      onChange={onChange}
    />
    {errorMessage && <div className={s.inputErrorMessage}>{errorMessage}</div>}
  </div>
);

InputWithError.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

InputWithError.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  className: null,
  errorMessage: null,
  onChange: () => {},
};

const TextareaWithError = ({
  type,
  value,
  placeholder,
  className,
  errorMessage,
  onChange,
}) => (
  <div>
    <textarea
      type={type}
      value={value}
      placeholder={placeholder}
      className={classNames(
        s.input,
        className,
        errorMessage ? s.inputError : null,
      )}
      onChange={onChange}
    />
    {errorMessage && <div className={s.inputErrorMessage}>{errorMessage}</div>}
  </div>
);
TextareaWithError.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

TextareaWithError.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  className: null,
  errorMessage: null,
  onChange: () => {},
};

const DatepickerWithError = ({
  value,
  placeholder,
  dateFormat,
  locale,
  className,
  errorMessage,
  onChange,
}) => (
  <div className={className}>
    <DatePicker
      selected={value}
      placeholderText={placeholder}
      dateFormat={dateFormat}
      onChange={onChange}
      locale={locale}
      className={classNames(s.input, errorMessage ? s.inputError : null)}
    />
    {errorMessage && <div className={s.inputErrorMessage}>{errorMessage}</div>}
  </div>
);

DatepickerWithError.propTypes = {
  value: PropTypes.shape(),
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

DatepickerWithError.defaultProps = {
  value: null,
  placeholder: 'Date',
  dateFormat: 'DD/MM/YYYY',
  locale: 'en',
  className: null,
  errorMessage: null,
  onChange: () => {},
};
class GrantForm extends Component {
  static propTypes = {
    inputChange: PropTypes.func.isRequired,
    submitGrant: PropTypes.func.isRequired,
    date: PropTypes.shape(),
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    askAmount: PropTypes.string,
    totalCost: PropTypes.string,
    description: PropTypes.string,
    summary: PropTypes.string,
    errors: PropTypes.shape(),
  };
  static defaultProps = {
    date: null,
    name: '',
    email: '',
    phone: '',
    askAmount: '',
    totalCost: '',
    description: '',
    summary: '',
    errors: {},
  };
  render() {
    const {
      inputChange,
      submitGrant,
      date,
      name,
      email,
      phone,
      askAmount,
      totalCost,
      description,
      summary,
      errors,
    } = this.props;

    return (
      <div className={s.container}>
        <h1 className={s.heading}>Grant Application</h1>
        <div className={s.content}>
          <Link to="/guidelines" target="_blank">
            Check out the guidelines before you apply!
          </Link>
          <div className={s.labelContainer}>
            <div className={s.label}>Contact</div>
          </div>

          <InputWithError
            type="text"
            value={name}
            placeholder="Name"
            onChange={({ target: { value } }) => inputChange('name', value)}
            errorMessage={errors.name}
          />

          <div className={s.contactContainer}>
            <InputWithError
              type="text"
              value={email}
              placeholder="Email"
              className={s.email}
              onChange={({ target: { value } }) => inputChange('email', value)}
              errorMessage={errors.email}
            />

            <InputWithError
              type="text"
              value={phone}
              placeholder="Phone number"
              className={s.phone}
              onChange={({ target: { value } }) => inputChange('phone', value)}
              errorMessage={errors.phone}
            />
          </div>

          <div className={s.labelContainer}>
            <div className={s.label}>About your event</div>
          </div>

          <DatepickerWithError
            value={date}
            dateFormat="DD/MM/YYYY"
            onChange={value => inputChange('date', value)}
            className={s.date}
            errorMessage={errors.date}
          />

          <InputWithError
            type="text"
            value={summary}
            placeholder="Short summary"
            onChange={({ target: { value } }) => inputChange('summary', value)}
            errorMessage={errors.summary}
          />

          <TextareaWithError
            type="text"
            value={description}
            placeholder="Description"
            className={s.description}
            onChange={({ target: { value } }) =>
              inputChange('description', value)}
            errorMessage={errors.description}
          />

          <div className={s.labelContainer}>
            <div className={s.label}>Grant</div>
          </div>

          <div className={s.costContainer}>
            <InputWithError
              type="text"
              value={askAmount}
              placeholder="How much money do you need?"
              className={s.ask}
              onChange={({ target: { value } }) =>
                inputChange('askAmount', value)}
              errorMessage={errors.askAmount}
            />

            <InputWithError
              type="text"
              value={totalCost}
              placeholder="How much does the event cost?"
              className={s.totalCost}
              onChange={({ target: { value } }) =>
                inputChange('totalCost', value)}
              errorMessage={errors.totalCost}
            />
          </div>

          <div className={s.captchaContainer}>
            <ReCAPTCHA
              // ref="recaptcha"
              sitekey="6LdRlycTAAAAAHFDPQDPkspMIqEDnUR4xk7ouueV"
              onChange={token => inputChange('googleToken', token)}
              className={s.captcha}
            />
          </div>

          <div className={s.sendContainer}>
            <div
              className={s.send}
              onClick={() => submitGrant()}
              role="button"
              onKeyPress={({ key }) => key === 'Enter' && submitGrant()}
              tabIndex={0}
            >
              Send
            </div>
          </div>
          {errors.form && (
            <div className={s.formErrorMessage}>
              {errors.form.map(error => <p key={error}>{error}</p>)}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state /* , props */) => ({
    ...state.grant.values,
    errors: state.grant.errors,
  }),
  {
    inputChange,
    submitGrant,
  },
)(withStyles(s, DatePickerStyles)(GrantForm));
