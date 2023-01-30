const sequelize = require('../config/Connection');

const { Model, DataTypes } = require('sequelize');
const Blogpost = require('./Blogpost');

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Blogpost,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comments',
    }
);

module.exports = Comments