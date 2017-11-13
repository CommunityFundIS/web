/* eslint-disable import/prefer-default-export */
import { createTransport } from 'nodemailer';
import config from '../config';
import { log } from '../logger';

const sendEmail = async (recipient, subject, html) => {
  const mailOptions = {
    html,
    from: 'Community Fund <hello@communityfund.is>',
    to: recipient,
    subject,
  };

  const transport = createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
      user: config.AWS_SES.user,
      pass: config.AWS_SES.password,
    },
  });

  // send mail with defined transport object
  transport.sendMail(mailOptions, (error /* , response */) => {
    if (error) {
      log(error);
    } else {
      log('Email sent');
    }

    transport.close(); // shut down the connection pool, no more messages
  });
};

export default sendEmail;
