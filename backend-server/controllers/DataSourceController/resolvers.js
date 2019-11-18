module.exports = {
  Query: {
    getDataSources: async (_, __, { DataSource }) => {
      return await DataSource.findAll();
    }
  },
  Mutation: {
    deleteDataSource: async (_, { id }, { DataSource, Application }) => {
      const result = await DataSource.destroy({ where: { _id: id } });

      const applications = await Application.findAll({ raw: true });

      for (app of applications) {
        if (app.dataSources.find(item => item._id === id)) {
          const newDataSources = app.dataSources.filter(item => item._id !== id);
          await Application.update({ dataSources: newDataSources }, { where: { _id: app._id } });
        }
      }

      return result ? id : false;
    },
    addDataSource: async (_, { title, type }, { DataSource }) => {
      return await DataSource.create({ title, type });
    }
  }
};
