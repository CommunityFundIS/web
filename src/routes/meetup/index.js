import React from 'react';
import { numberToMonth } from '../../lib/date';

export default [
  {
    // Create group
    path: '/create',
    async action() {
      const CreateGroup = await import('./CreateGroup');

      return {
        title: 'Create Event',
        component: <CreateGroup.default />,
      };
    },
  },
  {
    // Create event
    path: '/:groupId/create',
    async action() {
      const CreateEvent = await import('./CreateEvent');

      return {
        title: 'Create Event',
        component: <CreateEvent.default />,
      };
    },
  },
  {
    // Group
    path: '/:slug',
    async action({ params, graphqlRequest }) {
      const { slug } = params;
      const SingleGroup = await import('./SingleGroup');

      const { data } = await graphqlRequest(`
        {
          groups(slug: "${slug}") {
            name
            slug
            logo
            description
            color
            gradient
            events {
              id
              slug
              name
              briefing
              attendingStatus
              startTime
            }
          }
        }
      `);

      const { groups } = data;

      const group = groups[0];

      if (!group) {
        return { redirect: '/meetup' };
      }

      const events = group.events.map(event => {
        const date = new Date(event.startTime);

        return {
          id: event.id,
          day: `${date.getDate()}`,
          month: numberToMonth(date.getMonth()),
          title: event.name,
          shortDescription: event.briefing,
          url: `/meetup/${slug}/${event.slug}`,
          attendingStatus: event.attendingStatus,
        };
      });

      return {
        title: group.name,
        component: (
          <SingleGroup.default
            events={events}
            name={group.name}
            logo={group.logo}
            backgroundColor={(group.gradient || '').split(',')}
            about={group.description}
          />
        ),
      };
    },
  },
  {
    // Event
    path: '/:groupSlug/:eventSlug',
    async action({ graphqlRequest, params }) {
      const { groupSlug, eventSlug } = params;
      const SingleEvent = await import('./SingleEvent');

      const { data } = await graphqlRequest(`
        {
          events(slug:"${eventSlug}" groupSlug:"${groupSlug}") {
            id
            name
            logo
            briefing
            description
            color
            gradient
            location
            attendingStatus
            geolocation
            startTime
            endTime
          }
        }
      `);

      const { events } = data;
      const event = events[0];

      if (!event) {
        return { redirect: `/meetup/${groupSlug}` };
      }

      return {
        title: event.name,
        component: (
          <SingleEvent.default
            id={event.id}
            invertHeader={false}
            title={event.name}
            backgroundColor={
              event.gradient
                ? event.gradient.split(',')
                : ['#FDEB71', '#F8D800']
            }
            logo={event.logo}
            attendees={[
              // {
              //   id: '2d130080-cc66-11e7-8744-09b6d394801c',
              //   name: 'Reviewer 0',
              //   title: 'CEO of awesome corp',
              //   image:
              //     'https://communityfund.imgix.net/e5351d4d-f7fc-46a2-ade8-cdde3303fa97.png?fit=crop&w=500&h=500',
              //   topics: [],
              // },
            ]}
            shortDescription={event.briefing}
            description={event.description}
            initialAttendingStatus={event.attendingStatus}
          />
        ),
      };
    },
  },
];
