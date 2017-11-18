import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const Group = new ObjectType({
  name: 'Group',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    slug: { type: StringType },
    logo: { type: StringType },
    description: { type: StringType },
  },
});

export default Group;
