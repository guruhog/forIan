module.exports = {
  Mutation: {
    addRating: async (
      _,
      { appId, stars, createdAt, update },
      { User, token, Rating, sequelize }
    ) => {
      if (!update) {
        await Rating.create({ userId: token._id, stars, appId, createdAt });
        const user = await User.findByPk(token._id);
        user.ratings.push(appId);
        User.update({ ratings: user.ratings }, { where: { _id: token._id } });
      } else {
        Rating.update({ stars }, { where: { appId, userId: token._id } });
      }

      const average = await Rating.findAll({
        attributes: ['appId', [sequelize.fn('AVG', sequelize.col('stars')), 'average']],
        group: ['appId'],
        where: { appId },
        raw: true
      });

      return average[0] ? parseFloat(average[0].average).toFixed(2) : 0;
    }
  }
};
