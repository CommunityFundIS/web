import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLEnumType as EnumType,
  GraphQLList as List,
} from 'graphql';

import VoteType from './VoteType';

const ResultType = new EnumType({
  name: 'Status',
  values: {
    accepted: { value: 'accepted' },
    rejected: { value: 'rejected' },
    pending: { value: 'pending' },
  },
});

const SubmissionStatusType = new ObjectType({
  name: 'SubmissionStatus',
  fields: {
    result: { type: new NonNull(ResultType) },
    votes: { type: new List(VoteType) },
  },
});

export default SubmissionStatusType;
