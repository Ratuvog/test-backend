'use strict';

module.exports = (db, DataType) => {
  const Employee = db.define('employee', {
      id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataType.STRING, allowNull: false },
      lastName: { type: DataType.STRING, allowNull: false }
    },
    {
      timestamps: false,
      classMethods: {
        associate: (models) => Employee.belongsTo(models.department)
      }
    }
  );
  return Employee;
};