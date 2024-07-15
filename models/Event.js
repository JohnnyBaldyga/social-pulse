const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_created: {
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW,
       allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    attendees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
  
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;