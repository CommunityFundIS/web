const people = [
  {
    id: '1',
    name: 'Rachel Salmon',
    image: '/img/people/rachel.png',
    title: 'Designer at Kolibri',
    topics: ['design', 'art', 'interfaces'],
  },
  {
    id: '2',
    name: 'Kristján Ingi',
    image: '/img/team/kristjanmik.jpg',
    title: 'JS Iceland, JSConf Iceland',
    topics: ['development', 'product', 'ux'],
  },
  {
    id: '3',
    name: 'Vignir Örn',
    image: '/img/people/vignir.jpg',
    title: 'Producer, CCP',
    topics: ['product', 'interfaces', 'user research'],
  },
  {
    id: '4',
    name: 'Berglind Ósk Bergsdóttir',
    image: '/img/people/berglind.jpg',
    title: 'Software developer at Kolibri',
    topics: ['development', 'design', 'testing'],
  },
  {
    id: '5',
    name: 'Axel Máni',
    image: '/img/people/axel.jpg',
    title: 'Software developer at Dohop',
    topics: ['development', 'design', 'ux'],
  },
  {
    id: '6',
    name: 'Jonathan Gerlach',
    image: '/img/people/jonathan.jpg',
    title: 'Digital Product Designer at Kolibri',
    topics: ['design', 'art', 'ux'],
  },
  {
    id: '7',
    name: 'Kristjan Broder Lund',
    image: '/img/people/lund.jpg',
    title: 'Software developer at NOVOMATIC Lottery Solutions',
    topics: ['product', 'testing', 'development'],
  },

  {
    id: '8',
    name: 'Hugi Hlynsson',
    image: '/img/people/hugi.jpg',
    title: 'Making user interfaces at Kolibri',
    topics: ['design', 'product', 'development'],
  },
  {
    id: '9',
    name: 'Ragnar Þór Valgeirsson',
    image: '/img/people/raggi.jpg',
    title: 'Developer at Aranja',
    topics: ['development', 'data science', 'interfaces'],
  },
  {
    id: '10',
    name: 'Ásgeir Vísir',
    image: '/img/people/visir.jpg',
    title: 'UI/UX designer at Watchbox',
    topics: ['design', 'ux', 'art'],
  },
  {
    id: '11',
    name: 'Jóhann Þorvaldur Bergþórsson',
    image: '/img/people/joi2.png',
    title: 'CTO',
    topics: ['development', 'product', 'design'],
  },
  {
    id: '12',
    name: 'Valur Thor Gunnarsson',
    image: '/img/people/valur.jpg',
    title: 'Founder Product Tank Reykjavik',
    topics: ['product', 'design', 'development'],
  },
];

const topicsMap = {
  'data science': {
    name: 'data science',
    color: 'red',
  },
  product: {
    name: 'product',
    color: 'orange',
  },
  ux: {
    name: 'ux',
    color: 'yellow',
  },
  'user research': {
    name: 'user research',
    color: 'olive',
  },
  testing: {
    name: 'testing',
    color: 'green',
  },
  design: {
    name: 'design',
    color: 'teal',
  },
  development: {
    name: 'development',
    color: 'blue',
  },
  art: {
    name: 'art',
    color: 'violet',
  },
  interfaces: {
    name: 'interfaces',
    color: 'purple',
  },
  agile: {
    name: 'agile',
    color: 'pink',
  },
  production: {
    name: 'agile',
    color: 'teal',
  },
};

export default people.map(person => {
  const topics = person.topics.map((name, index) => ({
    name,
    color: (topicsMap[name] || {}).color,
    index,
  }));

  topics.sort((a, b) => {
    if (a.name.length > b.name.length) return 1;
    if (a.name.length < b.name.length) return -1;
    return 0;
  });

  return {
    ...person,
    topics,
  };
});
