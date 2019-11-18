module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
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

      username: { type: DataTypes.STRING },
      firstname: { type: DataTypes.STRING },
      lastname: { type: DataTypes.STRING },
      fullname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING },
      department: { type: DataTypes.STRING },

      country: { type: DataTypes.STRING },
      countryCode: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      room: { type: DataTypes.STRING },
      supervisor: { type: DataTypes.STRING },
      employeeID: { type: DataTypes.STRING },
      hireDate: { type: DataTypes.STRING },

      applications: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
      ratings: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
      userFunction: { type: DataTypes.JSON, defaultValue: [] },
      userRole: { type: DataTypes.JSON, defaultValue: [] },

      settings: { type: DataTypes.JSON, defaultValue: [] }
    },
    {
      timestamps: false
    }
  );

  return User;
};
