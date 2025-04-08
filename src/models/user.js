const { DataTypes } = require('sequelize');
const sequelize = require('../config/bancodedados');
const crypto = require('crypto');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            if (user.password) {
                user.password = crypto.createHash('md5').update(user.password).digest('hex');
            }
        },
        beforeUpdate: (user) => {
            if (user.changed('password')) {
                user.password = crypto.createHash('md5').update(user.password).digest('hex');
            }
        }
    }
});

User.prototype.isValidPassword = function(password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return this.password === hash;
};

module.exports = User;