import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "employees",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

export default Employee;
