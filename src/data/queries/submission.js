import { GraphQLID as ID, GraphQLNonNull as NonNull } from 'graphql';
import SubmissionType from '../types/SubmissionType';
import { Submission } from '../models';

const submission = {
  type: SubmissionType,
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve: (_, { id }) =>
    Submission.findOne({
      where: {
        id,
      },
    }),
};

export default submission;
