/* eslint-disable import/prefer-default-export */
import { USERS_UPDATE_DATA } from '../constants';
import { logError } from '../logger';

export const fetchUsers = (options = {}) => async (
  dispatch,
  getState,
  { graphqlRequest },
) => {
  const randomText = options.random ? 'true' : 'false';
  const countText = options.count ? `${options.count}` : '20';
  const onlyWithNameText = options.onlyWithName ? 'true' : 'false';

  try {
    const { data } = await graphqlRequest(`
      {
        users(random: ${randomText}, count: ${countText}, onlyWithName: ${onlyWithNameText}) {
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
        data: users
          .filter(user => user.image && user.name && user.name !== '')
          .map(user => ({
            ...user,
            image: user.image
              ? `https://communityfund.imgix.net/${user.image}?fit=crop&w=500&h=500`
              : null,
          })),
      },
    });
  } catch (e) {
    logError('Could not fetch users', e);
  }
};
