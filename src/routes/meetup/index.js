import React from 'react';
// @TODO meh to have moment here, prefer to remove it
import moment from 'moment';
import { numberToMonth } from '../../lib/date';
import { setRouteOverride } from '../../actions/routeOverride';

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
    async action({ params, graphqlRequest, store }) {
      const { slug } = params;
      const isCNAME = slug.includes('.');
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
          url: isCNAME ? event.slug : `/meetup/${slug}/${event.slug}`,
          attendingStatus: event.attendingStatus,
        };
      });

      // @TODO Verify that it is a key
      const logo =
        group.logo.indexOf('http') === -1
          ? `https://communityfund.imgix.net/${group.logo}?fit=crop&w=500&h=500`
          : group.logo;

      // Meetup override magic
      if (!process.env.BROWSER && isCNAME) {
        await store.dispatch(
          setRouteOverride({
            prepend: `/meetup/${slug}`,
          }),
        );
      }

      return {
        title: group.name,
        component: (
          <SingleGroup.default
            events={events}
            name={group.name}
            logo={logo}
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
    async action({ graphqlRequest, params, store }) {
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
            attendees{
              id
              name
              title
              image
              topics{
                name
                color
              }
            }
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

      const logo =
        event.logo.indexOf('http') === -1
          ? `https://communityfund.imgix.net/${event.logo}?fit=crop&w=500&h=500`
          : event.logo;

      const timestamp = `${moment(event.startTime).format(
        'MMMM Do YYYY, h:mm a',
      )} to ${moment(event.endTime).format('h:mm a')}`;

      // Meetup override magic
      if (!process.env.BROWSER && groupSlug.includes('.')) {
        console.log('Setting route override ', `/meetup/${groupSlug}`);
        await store.dispatch(
          setRouteOverride({
            prepend: `/meetup/${groupSlug}`,
          }),
        );
      }

      return {
        title: event.name,
        component: (
          <SingleEvent.default
            timestamp={timestamp}
            locationHuman={event.location}
            locationGPS={event.geolocation}
            id={event.id}
            invertHeader={false}
            title={event.name}
            backgroundColor={
              event.gradient
                ? event.gradient.split(',')
                : ['#FDEB71', '#F8D800']
            }
            logo={logo}
            attendees={event.attendees.map(attendee => ({
              ...attendee,
              image: attendee.image
                ? `https://communityfund.imgix.net/${attendee.image}?fit=crop&w=500&h=500`
                : null,
            }))}
            shortDescription={event.briefing}
            description={event.description}
            initialAttendingStatus={event.attendingStatus}
          />
        ),
      };
    },
  },
];
