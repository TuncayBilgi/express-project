const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Session', {
        pseudo : {
            type: DataTypes.STRING,
            allowNull: false
        },
        score : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },);
}