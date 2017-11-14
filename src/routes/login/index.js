import React from 'react';
import Login from './Login';
import SemanticUI from '../../components/SemanticUI';

export default ({ query }) => {
  const { redirect } = query;

  return {
    chunks: ['login'],
    component: (
      <SemanticUI>
        <Login redirect={redirect} />
      </SemanticUI>
    ),
  };
};
