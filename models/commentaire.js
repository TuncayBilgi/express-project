const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Commentaire', {
        pseudo : {
            type: DataTypes.STRING,
            allowNull: false
        },
        evaluation : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // Other model options go here
    });
}