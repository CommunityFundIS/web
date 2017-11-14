import React from 'react';
import Signup from './Signup';
import SemanticUI from '../../components/SemanticUI';

export default () => ({
  chunks: ['signup'],
  component: (
    <SemanticUI>
      <Signup />
    </SemanticUI>
  ),
});
