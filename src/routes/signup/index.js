import React from 'react';
import Signup from './Signup';
import SemanticUI from '../../components/SemanticUI';

export default ({ query }) => {
  const { redirect } = query;

  return {
    chunks: ['signup'],
    component: (
      <SemanticUI>
        <Signup redirect={redirect} />
      </SemanticUI>
    ),
  };
};
