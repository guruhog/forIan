module.exports = (sequelize, DataTypes) => {
  const Support = sequelize.define(
    'support',
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      access: { type: DataTypes.JSON },
      accessMethods: { type: DataTypes.JSON },
      accessDescription: { type: DataTypes.JSON },
      training: { type: DataTypes.JSON },
      links: { type: DataTypes.JSON },
      contacts: { type: DataTypes.JSON },
      faqs: { type: DataTypes.JSON },
      appId: { type: DataTypes.STRING }
    },
    {
      indexes: [{ fields: ['appId'] }]
    }
  );

  return Support;
};
