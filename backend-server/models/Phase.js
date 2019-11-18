module.exports = (sequelize, DataTypes) => {
  const Phase = sequelize.define(
    'phase',
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      title: { type: DataTypes.STRING },
      type: { type: DataTypes.STRING }
    },
    {
      timestamps: false
    }
  );

  return Phase;
};
