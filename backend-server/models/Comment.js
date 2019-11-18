module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      createdAt: {
        type: DataTypes.STRING
      },

      content: { type: DataTypes.TEXT },
      user: { type: DataTypes.JSONB },
      appId: { type: DataTypes.UUID },
      type: { type: DataTypes.STRING, defaultValue: 'comment' }
    },
    {
      timestamps: false,
      indexes: [{ fields: ['appId'] }]
    }
  );

  return Comment;
};
