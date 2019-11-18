module.exports = (sequelize, DataTypes) => {
  const Metric = sequelize.define(
    'metrics',
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.STRING
      },
      navigator: { type: DataTypes.TEXT },
      appName: { type: DataTypes.STRING },
      url: { type: DataTypes.TEXT },
      appId: { type: DataTypes.STRING },
      pageName: { type: DataTypes.STRING },
      ipAddress: { type: DataTypes.STRING },
      type: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING, defaultValue: '?' }
    },
    {
      timestamps: false,
      indexes: [{ fields: ['appId'] }]
    }
  );

  return Metric;
};
