const { DataTypes } = require('sequelize');
//tabla que en un futuro podamos llegar a usar//importar el modelo en db.js si se requiere de su uso//
module.exports = (sequelize) => {
  sequelize.define('ShoppingCart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
    },
    }, {
        timestamps: false, 
      });
};