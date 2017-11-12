import React from 'react';
import Login from './Login';
import SemanticUI from '../../components/SemanticUI';

export default () => ({
  chunks: ['login'],
  component: (
    <SemanticUI>
      <Login />
    </SemanticUI>
  ),
});
