module.exports = {
  Query: {
    getSupport: async (_, { appId }, { Support }) => {
      return await Support.findOne({ where: { appId } });
    }
  },
  Mutation: {}
};
