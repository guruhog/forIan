module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "rating",
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.STRING
      },
      stars: { type: DataTypes.INTEGER },
      userId: { type: DataTypes.UUID },
      appId: { type: DataTypes.UUID }
    },
    {
      timestamps: false,
      indexes: [{ fields: ["appId"] }]
    }
  );

  return Rating;
};
