const someData = [
  {
    title: 'Mihai Birsan',
    email: 'mihai.birsan@novartis.com'
  },
  { title: 'Ian Hamriding', email: 'ian.hamriding@novartis.com' },
  { title: 'test', email: 'test@novartis.com' },
  { title: 'Rajyalakshmi Nimmagadda', email: 'rajyalakshmi.nimmagadda@novartis.com' },
  { title: 'David Andre Robert Barrat', email: 'david_andre.barrat@novartis.com' },
  { title: 'Adriana Castro Reyes', email: 'adriana.castro_reyes@novartis.com' },
  { title: 'Timothy Koch', email: 'timothy.koch@novartis.com' },
  { title: 'Rajesh Vadde', email: 'raj.vadde@novartis.com' },
  { title: 'Punith Kumar Bannadi', email: 'punith.bannadi@novartis.com' }
];

module.exports = {
  Query: {
    getContributors: async (_, __, { Contributor }) => {
      return await Contributor.findAll();
    }
  },
  Mutation: {
    deleteContributor: async (_, { id }, { Contributor }) => {
      const result = await Contributor.destroy({ where: { _id: id } });
      return result ? id : false;
    },
    addContributor: async (_, { title, type }, { Contributor }) => {
      return await Contributor.create({ title, type });
    },
    searchContributors: (_, { search }) => {
      let result = [];

      if (search.trim() !== '') {
        result = someData.filter(user =>
          user.title.toLowerCase().includes(search.toLocaleLowerCase())
        );
      }

      return result;
    }
  }
};
