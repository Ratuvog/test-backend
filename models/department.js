'use strict';

module.exports = (db, Sequelize) => {
  const Department = db.define('department', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
    },
    {
      timestamps: false,
      classMethods: {
        associate: (models) => Department.hasMany(models.employee)
      }
    }
  );
  return Department;
};