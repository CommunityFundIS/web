import React from 'react';
import Login from './Login';
import SemanticUI from '../../components/SemanticUI';

export default async ({ query, graphqlRequest }) => {
  const { redirect, attend } = query;

  let forwardTo;

  // Query can be ?attend=eventId, we need to resolve it here to url
  if (attend) {
    const { data } = await graphqlRequest(`
      {
        events(id:"${attend}") {
          slug
          group{
            slug
          }
        }
      }
    `);

    const { events } = data;
    const event = events[0];

    const eventSlug = event.slug;
    const groupSlug = event.group.slug;

    forwardTo = `/meetup/${groupSlug}/${eventSlug}`;
  }

  return {
    chunks: ['login'],
    component: (
      <SemanticUI>
        <Login redirect={redirect} andAttend={attend} forwardTo={forwardTo} />
      </SemanticUI>
    ),
  };
};
