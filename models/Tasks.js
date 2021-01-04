'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    uID: DataTypes.UUIDV4,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    due: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Tasks.associate = function(models) {
  };
  return Tasks;
};