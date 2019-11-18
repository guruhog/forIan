module.exports = {
  Query: {
    getPhases: async (_, __, { Phase }) => {
      return await Phase.findAll();
    }
  },
  Mutation: {
    deletePhase: async (_, { id }, { Phase, Application }) => {
      const result = await Phase.destroy({ where: { _id: id } });

      const applications = await Application.findAll({ raw: true });

      for (app of applications) {
        if (app.phases.find(item => item._id === id)) {
          const newPhases = app.phases.filter(item => item._id !== id);
          await Application.update({ phases: newPhases }, { where: { _id: app._id } });
        }
      }

      return result ? id : false;
    },
    addPhase: async (_, { title, type }, { Phase }) => {
      return await Phase.create({ title, type });
    }
  }
};
