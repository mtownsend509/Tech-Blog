const { Model, DataTypes } = require('sequelize');

// password hashing
const bcrypt = require('bcrypt');

// db connection
const sequelize = require('../config/Connection');

class Profile extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            // TODO: add password validation, future goal
            // validate: {
            //     len: [8, 64],
            //     // this validation only allows letter passwords and is case sensitive
            //     is: /^[0-9a-f]{64}$/i,
            // },
        },
    },

    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Profile'
    }
);

module.exports = Profile;