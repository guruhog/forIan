const Joi = require('joi');

const validate = data => {
  return new Promise((resolve, reject) => {
    const { error } = Joi.validate(
      data,
      {
        content: Joi.string()
          .required()
          .trim()
          .label('Comment Text'),
        createdAt: Joi.string()
          .required()
          .label('Created At'),
        appId: Joi.string()
          .required()
          .label('App Id missing'),
        commentType: Joi.string()
          .required()
          .label('Type is missing')
      },
      { abortEarly: false }
    );

    return error ? reject(error) : resolve();
  });
};
module.exports = {
  Query: {
    getComments: async (_, { appId }, { Comment }) => {
      return await Comment.findAll({ where: { appId }, order: [['createdAt', 'DESC']] });
    }
  },
  Mutation: {
    addComment: async (_, args, { Comment, token }) => {
      const errors = await validate(args);

      if (errors) {
        return errors;
      }

      const { _id, username, fullname } = token;
      return await Comment.create({
        ...args,
        type: args.commentType,
        user: { _id, username, fullname }
      });
    }
  }
};
