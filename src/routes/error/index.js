import React from 'react';
import ErrorPage from './ErrorPage';

export default () => ({
  chunks: ['error'],
  title: 'Error',
  component: <ErrorPage />,
});
