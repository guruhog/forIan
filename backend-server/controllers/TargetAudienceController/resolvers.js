module.exports = {
  Query: {
    getTargetAudience: async (_, __, { TargetAudience }) => {
      return await TargetAudience.findAll();
    }
  },
  Mutation: {
    deleteTargetAudience: async (_, { id }, { TargetAudience, Application }) => {
      const result = await TargetAudience.destroy({ where: { _id: id } });

      const applications = await Application.findAll({ raw: true });

      for (app of applications) {
        if (app.targetAudience.find(item => item._id === id)) {
          const newTargetAudience = app.targetAudience.filter(item => item._id !== id);
          await Application.update(
            { targetAudience: newTargetAudience },
            { where: { _id: app._id } }
          );
        }
      }
      return result ? id : false;
    },
    addTargetAudience: async (_, { title, type }, { TargetAudience }) => {
      return await TargetAudience.create({ title, type });
    }
  }
};
