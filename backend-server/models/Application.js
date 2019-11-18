module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'applications',
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
      title: { type: DataTypes.STRING, unique: true },
      url: { type: DataTypes.TEXT },
      provider: { type: DataTypes.STRING },
      picture: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT, defaultValue: '' },
      whenToUse: { type: DataTypes.TEXT, defaultValue: '' },
      currentVersion: { type: DataTypes.STRING },
      releaseDate: { type: DataTypes.STRING },
      nextReleaseDate: { type: DataTypes.STRING },
      dataSources: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      targetAudience: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      phases: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      contributors: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: false
    }
  );

  return Application;
};
