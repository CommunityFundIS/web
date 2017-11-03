import React from 'react';
import ErrorPage from './ErrorPage';

export default () => ({
  chunks: ['error'],
  title: error.name,
  description: error.message,
  component: <ErrorPage error={error} />,
  status: error.status || 500,
});
