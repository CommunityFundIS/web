import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.scss';

class Login extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.lead}>Log in</h1>
          <form method="post" action="/login/username" className={s.form}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="username">
                USERNAME:
                <input
                  className={s.input}
                  id="username"
                  type="text"
                  name="username"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                PASSWORD:
                <input
                  className={s.input}
                  id="password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className={s.breaker} />
            <div className={s.buttonGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
              {/* <Link className={s.forgot} to="/forgot">Forgot password?</Link> */}
            </div>
          </form>
        </div>
        {/* <div className={s.signupContainer}>
          <p className={s.noAccount}>Don{"'"}t have an account yet?</p>
          <Link className={s.signupLink} to="/signup">Sign up for free</Link>
        </div> */}
      </div>
    );
  }
}

export default withStyles(s)(Login);
