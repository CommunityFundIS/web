/* eslint-disable import/prefer-default-export */
import { USERS_UPDATE_DATA } from '../constants';
import { logError } from '../logger';

export const fetchRandomUsers = () => async (
  dispatch,
  getState,
  { graphqlRequest },
) => {
  try {
    const { data } = await graphqlRequest(`
      {
        users(random: true) {
          id
          name
          title
          image
          topics{
            name,
            color
          }
        }
      }
    `);
    const { users } = data;

    dispatch({
      type: USERS_UPDATE_DATA,
      payload: {
        data: users.map(user => ({
          ...user,
          image: user.image
            ? `https://communityfund.imgix.net/${user.image}?w=500&h=500`
            : null,
        })),
      },
    });
  } catch (e) {
    logError('Could not fetch users', e);
  }
};
