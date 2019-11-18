module.exports = {
  Query: {
    getUsersCount: async (_, __, { User }) => {
      return await User.count();
    },
    getUsers: async (_, __, { User }) => {
      return await User.findAll();
    },
    getCurrentUser: async (
      _,
      { userId },
      { User, TargetAudience, Application, Rating, Comment }
    ) => {
      const user = await User.findByPk(userId);
      const targetAudience = await TargetAudience.findAll();

      let apps = 0;

      //count application
      if (user.userRole || user.userFunction) {
        const applications = await Application.findAll({});

        apps = applications.filter(app =>
          app.targetAudience.find(
            target => target._id === user.userRole._id || target._id === user.userFunction._id
          )
        ).length;
      }

      //count user ratings
      const ratings = await Rating.findAndCountAll({ where: { userId } });
      const comments = await Comment.findAndCountAll({ where: { user: { _id: userId } } });

      return { user, targetAudience, apps, ratings: ratings.count, comments: comments.count };
    }
  },

  Mutation: {
    updateUser: async (_, { appId, action }, { User, token }) => {
      const user = await User.findByPk(token._id);

      const index = user.applications.findIndex(app => app._id === appId);

      if (index === -1) {
        user.applications.push({ _id: appId, favorite: action, isRated: false });
      } else {
        user.applications[index].favorite = action;
      }

      return await User.update({ applications: user.applications }, { where: { _id: token._id } });
    },

    saveUserProfile: async (_, { userId, userFunction, userRole }, { User }) => {
      return await User.update({ userFunction, userRole }, { where: { _id: userId } });
    }
  }
};
