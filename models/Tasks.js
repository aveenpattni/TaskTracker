'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    uID: DataTypes.UUIDV4,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    due: DataTypes.DATE,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Tasks.associate = function(models) {
    Tasks.belongsTo(models.Users, {
      foreignKey: "uID",
      onDelete: "CASCADE"
    });
  };
  return Tasks;
};