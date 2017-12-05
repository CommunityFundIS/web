import React from 'react';
import Signup from './Signup';
import SemanticUI from '../../components/SemanticUI';

export default async ({ query }) => {
  const { redirect, attend } = query;

  return {
    chunks: ['signup'],
    component: (
      <SemanticUI>
        <Signup redirect={redirect} andAttend={attend} />
      </SemanticUI>
    ),
  };
};
