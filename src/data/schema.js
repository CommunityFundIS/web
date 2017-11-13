/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import submission from './queries/submission';
import submissionStatus from './queries/submissionStatus';
import topics from './queries/topics';
import createSubmission from './mutations/createSubmission';
import castVote from './mutations/castVote';
import updateUser from './mutations/updateUser';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      submission,
      submissionStatus,
      topics,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      createSubmission,
      castVote,
      updateUser,
    },
  }),
});

export default schema;
