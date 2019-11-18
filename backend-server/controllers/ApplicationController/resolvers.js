const Joi = require('joi');

const validate = data => {
  return new Promise((resolve, reject) => {
    const { error } = Joi.validate(
      data,
      {
        title: Joi.string()
          .required()
          .label('Application Title'),
        url: Joi.string()
          .required()
          .label('Application URL'),
        provider: Joi.string()
          .allow('')
          .optional()
          .label('Provider'),
        currentVersion: Joi.string()
          .required()
          .label('Current Version'),
        releaseDate: Joi.string()
          .required()
          .label('Current Release'),
        nextReleaseDate: Joi.string()
          .allow('')
          .optional()
          .label('Next Release'),
        description: Joi.string()
          .allow('')
          .optional()
          .label('Description'),
        whenToUse: Joi.string()
          .allow('')
          .optional()
          .label('When To Use')
      },
      { abortEarly: false }
    );

    return error ? reject(error) : resolve();
  });
};

module.exports = {
  Application: {
    comments: async ({ _id }, _, { Comment }) => {
      return await Comment.count({ where: { appId: _id } });
    },

    rating: async ({ _id }, _, { Rating, sequelize }) => {
      const average = await Rating.findAll({
        attributes: ['appId', [sequelize.fn('AVG', sequelize.col('stars')), 'average']],
        group: ['appId'],
        where: { appId: _id },
        raw: true
      });

      return average[0] ? parseFloat(average[0].average).toFixed(2) : 0;
    }
  },
  Query: {
    getApplicationsDashBoard: async (_, __, { Application }) => {
      return await Application.findAll({
        where: { archived: false },
        order: [['title', 'ASC']]
      });
    },

    getApplicationsHome: async (_, __, { Application, User, token, Rating }) => {
      const applications = await Application.findAll({ where: { visible: true, archived: false } });
      const user = await User.findByPk(token._id);

      let userRatings = [];
      if (user.ratings.length > 0) {
        userRatings = await Rating.findAll({
          where: { appId: user.ratings, userId: token._id }
        });
      }

      return { applications, user, userRatings };
    },

    getApplication: async (_, { appId }, { Application }) => {
      const application = await Application.findByPk(appId);
      return application;
    }
  },
  Mutation: {
    insertApplication: async (_, { inputData }, { Application }) => {
      const errors = await validate(inputData);

      if (errors) {
        return errors;
      }

      return await Application.create(inputData);
    },

    updateApplication: async (
      _,
      {
        appId,
        inputDataSources,
        inputTargetAudience,
        inputApplication,
        inputPhase,
        inputSupport,
        inputContributors
      },
      { Application, Support }
    ) => {
      const errors = await validate(inputApplication);

      if (errors) {
        return errors;
      }

      const [__, application] = await Application.update(
        {
          dataSources: inputDataSources,
          targetAudience: inputTargetAudience,
          phases: inputPhase,
          contributors: inputContributors,
          ...inputApplication
        },
        { where: { _id: appId }, returning: true, plain: true }
      );

      const supportQuery = await Support.findOne({ where: { appId }, returning: true });

      if (!supportQuery) {
        support = await Support.create({ appId, ...inputSupport });
      } else {
        [_, support] = await Support.update(
          { ...inputSupport },
          {
            where: { appId },
            returning: true,
            plain: true
          }
        );
      }

      return application;
    },

    updateAppWithImage: async (_, { appId, imageUrl }, { Application }) => {
      return await Application.update({ picture: imageUrl }, { where: { _id: appId } });
    },

    showHideApp: async (_, { appId, visible }, { Application }) => {
      const [__, application] = await Application.update(
        { visible },
        { where: { _id: appId }, returning: true, plain: true }
      );

      return application;
    },

    deleteApplication: async (_, { appId }, { Application }) => {
      const [__, application] = await Application.update(
        { archived: true },
        { where: { _id: appId }, returning: true, plain: true }
      );

      return application;
    },

    saveClickTrough: async (_, input, { Metrics }) => {
      const object = { ...input, pageName: 'Home Page', type: 'clickThrough' };
      await Metrics.create(object);
      return true;
    }
  }
};
