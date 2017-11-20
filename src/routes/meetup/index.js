import React from 'react';

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
    path: '/:groupId',
    async action() {
      const SingleGroup = await import('./SingleGroup');

      const events = [
        {
          day: '19',
          month: 'nov',
          title: 'Javascript Iceland - September Meetup',
          shortDescription: `It is time for our September JS meetup, the first meetup after the
        legendary JSConf Iceland 2016. In fact we will be celebrating as a
        community for a whole evening filled with great talks and great people.`,
        },
        {
          day: '3',
          month: 'jan',
          title: 'Javascript Iceland - January Meetup',
          shortDescription: `It is time for our September JS meetup, the first meetup after the
        legendary JSConf Iceland 2016. In fact we will be celebrating as a
        community for a whole evening filled with great talks and great people.`,
        },
      ];
      return {
        title: 'Single Group',
        component: (
          <SingleGroup.default
            events={events}
            name="RVK.js"
            logo="/rvkjs2.png"
            backgroundColor={['#FDEB71', '#F8D800']}
            about="A free + public hangout for JavaScript enthusiasts that happens in
              Reykjavik, Iceland, just before JSConf Iceland. No presentations,
              RSVPs or any formal schedule, just show up and talk, learn and
              hack!"
          />
        ),
      };
    },
  },
  {
    // Event
    path: '/:groupId/:eventId',
    async action() {
      const SingleEvent = await import('./SingleEvent');

      return {
        title: 'Single Event',
        component: (
          <SingleEvent.default
            invertHeader={false}
            title="Javascript Iceland - January Meetup"
            backgroundColor={['#FDEB71', '#F8D800']}
            logo="/rvkjs2.png"
            attendees={[
              {
                id: '2d130080-cc66-11e7-8744-09b6d394801c',
                name: 'Reviewer 0',
                title: 'CEO of awesome corp',
                image:
                  'https://communityfund.imgix.net/e5351d4d-f7fc-46a2-ade8-cdde3303fa97.png?fit=crop&w=500&h=500',
                topics: [],
              },
            ]}
            shortDescription="It is time for our September JS meetup, the first meetup after the
              legendary JSConf Iceland 2016. In fact we will be celebrating as a
              community for a whole evening filled with great talks and great
              people."
            description="It is time for our September JS meetup, the first meetup after
                the legendary JSConf Iceland 2016. In fact we will be
                celebrating as a community for a whole evening filled with great
                talks and great people. This event will be a bit different. We
                are very lucky to have a visit from a JavaScript/Google
                Developer Expert from Norway. His name is Maxim Salnikov and he
                will be giving a talk on the brand new Angular version. Our
                second talk of the night will be on JSConf Iceland and how
                fantastic that event was for our community. You are in for a
                ride! The venue is of limited size(Gym and Tonic hall at Kex
                Hostel) and therefore we have limited amount of tickets. You
                need to get a ticket in advance, which you can do here:
                https://ti.to/jsconf-is/2016/with/o6lgpuglzts We are a community
                and we welcome anyone to come and join us for the evening!
                Looking forward to seeing you all! ------- By purchasing a
                ticket, you will be explicitly required to agree with our stated
                Code of Conduct: http://confcodeofconduct.com/ You acknowledge
                that if you or a group you are involved with act in a manner not
                in accordance with the code of conduct, you will be expelled
                from the event with no refund.It is time for our September JS
                meetup, the first meetup after the legendary JSConf Iceland
                2016. In fact we will be celebrating as a community for a whole
                evening filled with great talks and great people. This event
                will be a bit different. We are very lucky to have a visit from
                a JavaScript/Google Developer Expert from Norway. His name is
                Maxim Salnikov and he will be giving a talk on the brand new
                Angular version. Our second talk of the night will be on JSConf
                Iceland and how fantastic that event was for our community. You
                are in for a ride! The venue is of limited size(Gym and Tonic
                hall at Kex Hostel) and therefore we have limited amount of
                tickets. You need to get a ticket in advance, which you can do
                here: https://ti.to/jsconf-is/2016/with/o6lgpuglzts We are a
                community and we welcome anyone to come and join us for the
                evening! Looking forward to seeing you all! ------- By
                purchasing a ticket, you will be explicitly required to agree
                with our stated Code of Conduct: http://confcodeofconduct.com/
                You acknowledge that if you or a group you are involved with act
                in a manner not in accordance with the code of conduct, you will
                be expelled from the event with no refund."
          />
        ),
      };
    },
  },
];
