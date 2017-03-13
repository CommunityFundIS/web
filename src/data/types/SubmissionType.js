import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const SubmissionType = new ObjectType({
  name: 'Submission',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    phone: { type: StringType },
    date: { type: StringType },
    summary: { type: StringType },
    description: { type: StringType },
    askAmount: { type: StringType },
    totalCost: { type: StringType },
  },
});

export default SubmissionType;
